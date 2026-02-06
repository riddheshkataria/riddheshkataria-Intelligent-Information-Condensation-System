# utils/document_classifier.py

JOB_POSITION_KEYWORDS = {
    "management": ["meeting", "minutes", "management", "team"],
    "engineering": ["specification", "drawing", "design", "engineering"],
    "hr": ["employee", "policy", "training", "leave", "recruitment"],
    "procurement": ["invoice", "purchase", "vendor", "contract", "quotation"],
    "operations": ["schedule", "roster", "operational", "service", "timetable"],
    "maintenance": ["job card", "maintenance", "inspection", "repair"],
    "safety": ["incident", "accident", "safety", "hazard", "emergency", "audit"],
    "regulatory": ["compliance", "regulation", "ministry", "legal"],
    "finance": ["budget", "expense", "financial", "payment", "accounting"],
}

def detect_job_positions(text: str) -> list:
    """
    Detects job positions/categories relevant to the input text based on keyword presence.

    Args:
        text (str): Input text to classify.

    Returns:
        list: List of matched job position categories; defaults to ['general'] if none matched.
    """
    text_lower = text.lower()
    matched_positions = [
        position
        for position, keywords in JOB_POSITION_KEYWORDS.items()
        if any(keyword in text_lower for keyword in keywords)
    ]
    return matched_positions if matched_positions else ["general"]

def extract_tags(text: str, entities: list) -> list:
    """
    Extract tags from NER entities and predefined keywords found in the text.

    Args:
        text (str): Input text.
        entities (list): Extracted NER entities (dictionaries with 'entity_group' and 'word').

    Returns:
        list: Unique tags extracted in lowercase.
    """
    tags = set()

    # Include tags from ORG, LOC, MISC entity groups detected by NER
    for ent in entities:
        if ent.get('entity_group') in ('ORG', 'LOC', 'MISC'):
            tags.add(ent['word'].lower())

    # Add tags from a list of important keywords if present in text
    keywords = [
        "metro expansion",
        "csr",
        "public engagement",
        "eco-friendly",
        "meeting summary",
    ]
    text_lower = text.lower()

    for kw in keywords:
        if kw in text_lower:
            tags.add(kw)

    return list(tags)
