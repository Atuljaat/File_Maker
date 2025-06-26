import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

USERNAME = os.getenv("USERNAME")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def send_email(to, filename, message, file=None):
    print(f"Sending email from: {EMAIL_ADDRESS} to: {to}")  # DEBUG
    
    if not EMAIL_ADDRESS or not EMAIL_PASSWORD or not USERNAME:
        raise ValueError("EMAIL_ADDRESS , EMAIL_PASSWORD , USERNAME must be set in environment variables")

    msg = EmailMessage()
    msg["Subject"] = "Your requested file"
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to
    msg.set_content(message)

    if file is not None:
        file.name = f"{filename}.docx"
        file.seek(0)
        msg.add_attachment(
            file.read(),
            maintype="application",
            subtype="vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=file.name,
        )

    try:
        with smtplib.SMTP("hackclub.app", 587, timeout=30) as smtp:
            smtp.set_debuglevel(1)
            smtp.ehlo()
            smtp.starttls()
            smtp.ehlo()
            print(f"Attempting login with username: {EMAIL_ADDRESS}")
            smtp.login(USERNAME, EMAIL_PASSWORD)
            smtp.send_message(msg)

        print("✅ Email sent successfully.")
    except Exception as e:
        print(f"❌ Error: {e}")
