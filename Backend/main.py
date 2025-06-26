from fastapi import FastAPI , File , UploadFile , Form
from DocxWriter import write_to_docx
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import os
from sendMail import send_email

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://file-maker-college.vercel.app",
    "http://localhost:5173","*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def get_hello () :
    return {"response" : "Hello world"}

FileRoute = str(os.getenv('FILE_ROUTE'))
if not FileRoute:
    raise ValueError("FILE_ROUTE environment variable is not set.")

@app.post(FileRoute)
async def processFile (filename:str = Form(...) ,file:UploadFile = File(...),language:str = Form(...) , codeFontSize: int = Form(...) , questionFontSize: int = Form(...) , email:str = Form(...)): 
    content = await file.read()
    modifiedFile = await write_to_docx(content,codeFontSize,questionFontSize,language)
    send_email(email, filename , message='Your requested file is ready', file=modifiedFile)
    return StreamingResponse(
        modifiedFile ,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename={filename}.docx"}
    )

