import logging
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os

from utils.ocr_utils import extract_text_from_pdf
from utils.ner_wrapper import run_ner
from utils.summarizer import generate_summary
from utils.document_classifier import detect_job_positions, extract_tags
from utils.extraction_utils import extract_full_names_with_kb, extract_dates_regex, extract_tags_from_text

# Load environment variables
load_dotenv()
HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACE_TOKEN")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="NLP Microservice")

document_person_map = {}

def convert_to_json_serializable(obj):
    """Recursively converts numpy floats/lists/dicts to native Python types for JSON serialization."""
    if isinstance(obj, np.float32):
        return float(obj)
    if isinstance(obj, list):
        return [convert_to_json_serializable(i) for i in obj]
    if isinstance(obj, dict):
        return {k: convert_to_json_serializable(v) for k, v in obj.items()}
    return obj

@app.post("/process")
async def process_document(file: UploadFile = File(...), ocr_lang: str = "eng"):
    if not HUGGINGFACE_TOKEN:
        raise HTTPException(500, detail="Backend Hugging Face API token is not configured.")

    file_bytes = await file.read()
    content_type = (file.content_type or "").lower()
    filename_lower = file.filename.lower()

    logger.info(f"Processing file {file.filename} ({content_type})")

    text = None
    if "pdf" in content_type or filename_lower.endswith(".pdf"):
        text = extract_text_from_pdf(file_bytes, ocr_lang)

    if not text:
        raise HTTPException(422, detail="No text extracted from file.")

    entities = run_ner(text)
    names = extract_full_names_with_kb(text, entities)
    important_dates = extract_dates_regex(text)
    tags = extract_tags_from_text(text)
    categories = detect_job_positions(text)
    summary = generate_summary(text, token=HUGGINGFACE_TOKEN)

    if names:
        document_person_map[file.filename] = names

    logger.info(f"Extracted info: names={names}, dates={important_dates}, categories={categories}")

    return JSONResponse({
        "filename": file.filename,
        "summary": summary,
        "entities": convert_to_json_serializable(entities),
        "categories": categories,
        "tags": tags,
        "important_dates": important_dates,
        "names": names,
        "extracted_text_preview": text[:1000]
    })

@app.get("/documents/{person_name}")
async def get_documents_by_person(person_name: str):
    documents = [fn for fn, people in document_person_map.items() if person_name in people]
    if not documents:
        raise HTTPException(404, detail=f"No documents found for person: {person_name}")
    return {"person_name": person_name, "documents": documents}
