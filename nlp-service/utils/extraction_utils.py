import re
from difflib import get_close_matches

# Example known people list - expand or load dynamically
KNOWN_PEOPLE = [
    "Mr. Nitin George",
    "Ms. Aishwarya Das",
    "Dr Rajesh Menon",
    # Add other known persons here
]

def extract_full_names_with_kb(text: str, ner_entities: list) -> list:
    """
    Extract full person names from known names KB and NER entities.
    Matches known full names on raw text before tokenization.

    Args:
        text (str): Input text.
        ner_entities (list): NER output entities.

    Returns:
        List of unique person names found.
    """
    persons = {ent['word'] for ent in ner_entities if ent.get('entity_group') in ('PER', 'PERSON')}
    text_lower = text.lower()

    # Match full known names in raw text (case insensitive)
    for name in KNOWN_PEOPLE:
        if name.lower() in text_lower:
            persons.add(name)

    return list(persons)

def extract_full_names_with_titles(text: str) -> list:
    """
    Extract full names with titles (Mr., Ms., Dr., etc.) using regex on raw text.

    Args:
        text (str): Input text.

    Returns:
        List of found full names with titles.
    """
    pattern = r'\b(Mr|Ms|Mrs|Dr|Prof)\.?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*'
    matches = re.findall(pattern, text)
    return matches

def extract_dates_regex(text: str) -> list:
    """
    Extract dates from text using regex patterns.

    Args:
        text (str): Input text.

    Returns:
        List of unique dates found.
    """
    date_patterns = [
        r'\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[.,]?\s?\d{0,4}\b',
        r'\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s\d{1,2}[.,]?\s?\d{0,4}\b',
        r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b',
    ]
    dates = set()
    for pattern in date_patterns:
        found = re.findall(pattern, text, flags=re.IGNORECASE)
        for d in found:
            dates.add(d.strip())
    return list(dates)

def extract_tags_from_text(text: str, extra_keywords: list = None) -> list:
    """
    Extract tags/keywords from text based on keywords.

    Args:
        text (str): Input text.
        extra_keywords (list, optional): Additional keywords.

    Returns:
        List of unique tags found.
    """
    base_keywords = [
        "recruitment", "training", "employee", "survey", "e-learning", 
        "meeting", "hr", "finance", "operations"
    ]
    if extra_keywords:
        base_keywords += extra_keywords

    text_lower = text.lower()
    tags = {kw for kw in base_keywords if kw in text_lower}
    return list(tags)
