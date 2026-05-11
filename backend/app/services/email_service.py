import os

import smtplib

from dotenv import load_dotenv

from email.message import EmailMessage

# =====================================================
# LOAD ENV
# =====================================================

load_dotenv()

EMAIL_USER = os.getenv(
    "EMAIL_USER"
)

EMAIL_PASSWORD = os.getenv(
    "EMAIL_PASSWORD"
)

# =====================================================
# SEND EMAIL
# =====================================================

def send_report_email(

    receiver_email,

    pdf_path

):

    msg = EmailMessage()

    msg["Subject"] = (
        "AI Analytics Report 🚀"
    )

    msg["From"] = EMAIL_USER

    msg["To"] = receiver_email

    msg.set_content(
        "Your AI generated report is attached."
    )

    # =================================================
    # ATTACH PDF
    # =================================================

    with open(pdf_path, "rb") as f:

        file_data = f.read()

        file_name = pdf_path.split("/")[-1]

    msg.add_attachment(

        file_data,

        maintype="application",

        subtype="pdf",

        filename=file_name

    )

    # =================================================
    # SEND
    # =================================================

    with smtplib.SMTP_SSL(

        "smtp.gmail.com",

        465

    ) as smtp:

        smtp.login(

            EMAIL_USER,

            EMAIL_PASSWORD

        )

        smtp.send_message(msg)

    print(
        "EMAIL SENT SUCCESSFULLY 🚀"
    )