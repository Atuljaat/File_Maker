import pdfplumber
import io
from typing import List
import re
from PIL import Image, ImageDraw, ImageFont
import platform
import os

def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(io.BytesIO(pdf_path)) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text() + '\n'
    return text

import re

def clean_Response(api_response, language):
    """
    Separates code and output from API response string.
    
    Args:
        api_response (str): The API response containing code blocks and output
        language (str): Programming language (for debugging)
    
    Returns:
        list: [code, output] where code is at index 0 and output is at index 1
    """
    match language.lower():
        case 'python':
            if not api_response or not api_response.strip():
                print("DEBUG: Empty or whitespace-only response")
                return ["", ""]
        
            lines = api_response.strip().split('\n')
            print(f"DEBUG: Split into {len(lines)} lines")
            
            code_lines = []
            output_lines = []
            inside_code_block = False
            found_code_block = False
            
            for i, line in enumerate(lines):
                print(f"DEBUG: Line {i}: {repr(line)}")
                
                # Check for code block start (more flexible)
                if line.strip().startswith('```') and (language.lower() in line.lower() or 'python' in line.lower()):
                    inside_code_block = True
                    found_code_block = True
                    print(f"DEBUG: Found code block start at line {i}")
                    continue
                elif line.strip() == '```' and inside_code_block:
                    inside_code_block = False
                    print(f"DEBUG: Found code block end at line {i}")
                    continue
                elif inside_code_block:
                    code_lines.append(line)
                    print(f"DEBUG: Added code line: {repr(line)}")
                elif line.strip() and not inside_code_block and found_code_block:
                    # This is output (non-empty lines outside code blocks, after we've seen code)
                    output_lines.append(line.strip())
                    print(f"DEBUG: Added output line: {repr(line.strip())}")
            
            code = '\n'.join(code_lines)
            output = '\n'.join(output_lines)
            
            print(f"DEBUG: Final code length: {len(code)}")
            print(f"DEBUG: Final output length: {len(output)}")
            
            return [code, output]

def terminal_image(output_text, font_size=18, padding=20,
                            text_color="#FFFFFF", bg_color="#0C0C0C"):
    
    if platform.system() == "Windows":
        font_candidates = [
            "C:/Windows/Fonts/consola.ttf",        # Consolas
            "C:/Windows/Fonts/CascadiaMono.ttf"     # Cascadia Mono (modern terminal)
        ]
    else:
        font_candidates = [
            "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",  # Linux
            "/Library/Fonts/Menlo.ttc"                              # macOS
        ]

    font = None
    for path in font_candidates:
        if os.path.exists(path):
            font = ImageFont.truetype(path, font_size)
            break

    if font is None:
        font = ImageFont.load_default()
        print("⚠️ Using default font, terminal style may not be perfect.")

    lines = output_text.split('\n')
    max_width = max([font.getlength(line) for line in lines])
    line_height = font_size + 6
    img_width = int(max_width + 2 * padding)
    img_height = int(len(lines) * line_height + 2 * padding)

    img = Image.new("RGB", (img_width, img_height), color=bg_color)
    draw = ImageDraw.Draw(img)

    for i, line in enumerate(lines):
        draw.text((padding, padding + i * line_height), line, font=font, fill=text_color)

    return img

def clean_Ouput (text) :
    cleaned = re.sub(r"```(?:text)?\s*", "", text)
    cleaned = re.sub(r"\s*```", "", cleaned)
    return cleaned.strip()