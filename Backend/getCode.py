from getAPI import getAPIkey
from google import genai

def response (question=None,language=None) : 
    apiKey = getAPIkey()
    client = genai.Client(api_key=apiKey)
    response = client.models.generate_content(
    model="gemini-2.0-flash", contents="hi how are you" )
    return response
