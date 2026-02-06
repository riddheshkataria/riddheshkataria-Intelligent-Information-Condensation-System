import os
from transformers import pipeline
import logging

logger = logging.getLogger(__name__)
_ner_pipeline = None

def run_ner(text: str) -> list:
    global _ner_pipeline

    if _ner_pipeline is None:
        try:
            token = os.getenv("HUGGINGFACE_TOKEN")
            if not token:
                raise RuntimeError("Hugging Face token not found in environment variables.")
            _ner_pipeline = pipeline(
                task="token-classification",
                model="ai4bharat/IndicNER",
                grouped_entities=True,
                token=token  # Important: Pass new token here!
            )
        except Exception as e:
            logger.error(f"Failed to load NER model: {e}")
            raise RuntimeError(f"Failed to load NER model: {e}") from e

    if not text:
        return []

    try:
        entities = _ner_pipeline(text)
        return entities
    except Exception as e:
        logger.error(f"Error during NER processing: {e}")
        return []
