# summarizer.py
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline, Pipeline
import logging

_summarizer_pipeline: Pipeline = None
logger = logging.getLogger(__name__)

def generate_summary(
    text: str,
    token: str,
    lang: str = "en",   # english only
    max_length: int = 240,
    min_length: int = 20
) -> str:
    """
    Generate a short summary of the text using IndicBARTSS.

    Args:
        text (str): Input text to summarize.
        token (str): Hugging Face auth token.
        lang (str): Target summary language ("en" for English).
        max_length (int): Max tokens in summary.
        min_length (int): Min tokens in summary.

    Returns:
        str: Summary text.
    """
    global _summarizer_pipeline

    if _summarizer_pipeline is None:
        try:
            model_name = "ai4bharat/IndicBARTSS"
            tokenizer = AutoTokenizer.from_pretrained(
                model_name,
                token=token,
                use_fast=False   # 👈 SentencePiece (slow tokenizer)
            )
            model = AutoModelForSeq2SeqLM.from_pretrained(
                model_name,
                use_auth_token=token
            )
            _summarizer_pipeline = pipeline(
                "summarization",
                model=model,
                tokenizer=tokenizer
            )
        except Exception as e:
            logger.error(f"Failed to load IndicBARTSS: {e}")
            raise RuntimeError(f"Failed to load IndicBARTSS: {e}")

    try:
        if not text or len(text.split()) < min_length:
            return "Text too short for summarization."

        # Add IndicBARTSS language tag
        lang_tag = f"</s> <2{lang}>"
        text_with_prefix = f"{text} {lang_tag}"

        summary = _summarizer_pipeline(
            text_with_prefix,
            max_new_tokens=max_length,
            min_length=min_length,
            do_sample=False,
        )
        return summary[0].get("summary_text", "Could not generate summary.")
    except Exception as e:
        logger.error(f"Error during summarization: {e}")
        return "An error occurred while generating the summary."
