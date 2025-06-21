from getAPI import getAPIkey
from google import genai
from google.genai.types import GenerateContentResponse

def response (question:str,language:str) -> GenerateContentResponse : 
    apiKey = getAPIkey()
    client = genai.Client(api_key=apiKey)
    response = client.models.generate_content(
    model="gemini-2.0-flash", 
    contents=f"Write a {language} program " + question + " Do not include any comments. After the code, in the same code block, simulate one terminal test run showing input and output as it would appear when running the program. Do not add any extra explanation or formatting outside the code block ")
    return response

