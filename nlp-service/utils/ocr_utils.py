# ocr_utils.py
# Module for extracting text from PDFs using PyMuPDF and Tesseract OCR

from PIL import Image
import fitz  # PyMuPDF
import pytesseract

# Path to Tesseract executable (update if installed elsewhere)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def extract_text_from_pdf(file_bytes, ocr_lang="eng+mal"):
    """
    Extract text from a PDF file using PyMuPDF to render pages and Tesseract OCR.

    Args:
        file_bytes (bytes): Raw bytes of the PDF file.
        ocr_lang (str): Language(s) used by Tesseract OCR.

    Returns:
        str: Extracted text from all pages in the PDF.
    """
    text = ""
    try:
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            for page in doc:
                pix = page.get_pixmap()
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                page_text = pytesseract.image_to_string(img, lang=ocr_lang)
                text += page_text + "\n"
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        raise
    return text.strip()
