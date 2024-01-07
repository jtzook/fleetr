import datetime


def get_friendly_timestamp() -> str:
    """
    Get the current date and time in a friendly format.

    Returns:
        str: A formatted date and time string, e.g., "January 1st, 2021 12:00:00 AM".
    """
    return datetime.datetime.now().strftime("%B %d, %Y %I:%M:%S %p")
