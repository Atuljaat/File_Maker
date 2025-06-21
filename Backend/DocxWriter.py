from docx import Document
from docx.shared import RGBColor
from Data import extract_text_from_pdf , clean_Response
from getCode import response
import time
import re
import io

async def write_to_docx(filename: str, file_bytes: bytes , language:str) -> io.BytesIO:
    doc = Document()

    text = extract_text_from_pdf(file_bytes)

    questions = re.split(r'(?<!\d)(?=\d{1,2}\.\s)', text)
    questions = [q.strip() for q in questions if q.strip()]

    for index, line in enumerate(questions):
        start_time = time.time()

        heading = doc.add_heading(line, level=2)
        for run in heading.runs:
            run.font.color.rgb = RGBColor(0, 0, 0)

        APIRESPONSE = response(line, language).text
        print(f"APIRESPONSE = {APIRESPONSE}")
        cleanedResponse = clean_Response(APIRESPONSE,language)
        print(f"language : {language} " )
        # print(f"APIRESPONSE = {APIResponse}")
        print(f"cleanedREs = {cleanedResponse}")
        if cleanedResponse is not None:
            code = cleanedResponse[0]
            output = cleanedResponse[1]
        else:
            code = ""
            output = ""
        
        # Writting Code
        code_heading = doc.add_heading('Code:', level=3)
        for run in code_heading.runs:
            run.font.color.rgb = RGBColor(0, 0, 0)
        code_para = doc.add_paragraph(code)
        code_para.paragraph_format.space_after = 0
        code_para.paragraph_format.line_spacing = 1

        
        endtime = time.time()
        print(f"Time taken for question {index + 1}: {endtime - start_time:.2f} seconds")

    # Save the doc to memory
    output_stream = io.BytesIO()
    doc.save(output_stream)
    output_stream.seek(0)

    return output_stream  # This is the in-memory .docx file

