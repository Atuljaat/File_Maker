from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def getAPIkey () :
    return GEMINI_API_KEY

