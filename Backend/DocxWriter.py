from docx import Document
from docx.shared import RGBColor
from getData import extract_text_from_pdf
from getCode import response
import time
import re
import io

async def write_to_docx(filename: str, file_bytes: bytes) -> io.BytesIO:
    doc = Document()

    # Extract text from PDF
    text = extract_text_from_pdf(file_bytes)

    # Split into questions
    questions = re.split(r'(?<!\d)(?=\d{1,2}\.\s)', text)
    questions = [q.strip() for q in questions if q.strip()]

    for index, line in enumerate(questions):
        start_time = time.time()

        # Write Question
        heading = doc.add_heading(line, level=2)
        for run in heading.runs:
            run.font.color.rgb = RGBColor(0, 0, 0)

        # Generate code with your response function
        APIresponse = response(line)
        code: str = APIresponse.text or ""

        # Write Code
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
