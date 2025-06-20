from fastapi import FastAPI , File , UploadFile , Form
from DocxWriter import write_to_docx
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def get_hello () :
    return {"response" : "Hello world"}

@app.post("/processFile")
async def processFile (filename:str = Form(...) ,file:UploadFile = File(...)) :
    content = await file.read()
    modifiedFile = await write_to_docx(filename,content)
    return StreamingResponse(
        modifiedFile ,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename={filename}.docx"}
    )