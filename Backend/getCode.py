from getAPI import getAPIkey
from google import genai
from google.genai.types import GenerateContentResponse

def giveContent (question:str,language:str) -> str :
    match language.lower():
        case 'python':
            return f"""Write a {language} program {question}. Define the logic inside a function and call it by passing parameters manually. Do not include any comments. After the code, in the same code block, simulate one terminal run showing only the function call and the exact printed output as it would appear in a real terminal. Do not include any extra explanation or formatting outside the code block."""
        case 'java':
            return f"""Write a Java program {question}. 
            Define the logic inside a method and call it from the main method inside a public class. 
            Use Scanner to take input from the user instead of passing arguments. 
            Do not include any comments. 
            After the code, in the same code block, simulate a single terminal run by showing exactly what the user types and what the program outputs, just as it would appear in a real terminal. 
            Avoid any extra explanation or formatting outside the code block."""
        case 'c':
            return f"""Write a C program {question}. 
            Define the logic inside a function and call it from the main function by passing arguments manually. 
            Do not use scanf or user input. 
            Do not include any comments. 
            After the code, in the same code block, simulate a single terminal run by showing the output exactly as it would appear when the program is executed. 
            Avoid any extra explanation or formatting outside the code block."""
    return "Unsupported language."


def response (question:str,language:str) -> GenerateContentResponse : 
    apiKey = getAPIkey()
    client = genai.Client(api_key=apiKey)
    response = client.models.generate_content(
    model="gemini-2.0-flash", 
    contents = giveContent(question,language),
    )
    return response

