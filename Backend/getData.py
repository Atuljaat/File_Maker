import pdfplumber
import io

def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(io.BytesIO(pdf_path)) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text() + '\n'
    return text

