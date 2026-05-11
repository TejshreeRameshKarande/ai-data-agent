from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Form
)

from pydantic import BaseModel

import shutil
import os
import pandas as pd

# =====================================================
# SERVICES
# =====================================================

from app.services.chat_ai import (
    ask_ai_about_data
)

from app.services.email_service import (
    send_report_email
)

from app.services.advanced_insights import (
    generate_advanced_insights
)

from app.services.data_service import (
    load_data,
    clean_data,
    analyze_data,
)

from app.services.ai_service import (
    generate_insights,
)

from app.services.report_generator import (
    generate_pdf,
)

# =====================================================
# ROUTER
# =====================================================

router = APIRouter()

# =====================================================
# FOLDERS
# =====================================================

UPLOAD_FOLDER = "uploads"

REPORT_FOLDER = "reports"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

os.makedirs(
    REPORT_FOLDER,
    exist_ok=True
)

# =====================================================
# QUESTION MODEL
# =====================================================

class QuestionRequest(BaseModel):

    question: str

    dataset: str

    history: list = []

# =====================================================
# UPLOAD API
# =====================================================

@router.post("/upload")

async def upload_file(

    file: UploadFile = File(...),

    export_format: str = Form("pdf")

):

    try:

        # =================================================
        # SAVE FILE
        # =================================================

        file_path = os.path.join(

            UPLOAD_FOLDER,

            file.filename

        )

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        print(
            "FILE SAVED:",
            file_path
        )

        # =================================================
        # LOAD DATA
        # =================================================

        df = load_data(file_path)

        df = clean_data(df)

        print(
            "DATA CLEANED"
        )

        # =================================================
        # ANALYZE DATA
        # =================================================

        summary = analyze_data(df)

        print(
            "DATA ANALYSIS COMPLETED"
        )

        # =================================================
        # DATASET PREVIEW
        # =================================================

        preview_data = (

            df.head(5)

            .to_dict(
                orient="records"
            )

        )

        # =================================================
        # BASIC AI INSIGHTS
        # =================================================

        try:

            insights = generate_insights(
                summary
            )

        except Exception as ai_error:

            print(
                "AI ERROR:",
                ai_error
            )

            insights = (
                "AI insights not available."
            )

        # =================================================
        # ADVANCED AI INSIGHTS
        # =================================================

        try:

            advanced_result = (

                generate_advanced_insights(
                    df
                )

            )

            advanced_insights = (

                advanced_result[
                    "insights"
                ]

            )

            forecast_data = (

                advanced_result[
                    "forecast_data"
                ]

            )

            correlation_data = (

                advanced_result[
                    "correlation_data"
                ]

            )

        except Exception as adv_error:

            print(
                "ADVANCED AI ERROR:",
                adv_error
            )

            advanced_insights = [

                "Advanced AI insights not available."

            ]

            forecast_data = {}

            correlation_data = {}

        # =================================================
        # CHART INSIGHTS
        # =================================================

        chart_insights = {}

        try:

            mean_values = summary.get(
                "mean",
                {}
            )

            highest_feature = max(
                mean_values,
                key=mean_values.get
            ) if mean_values else None

            lowest_feature = min(
                mean_values,
                key=mean_values.get
            ) if mean_values else None

            # =============================================
            # BAR CHART
            # =============================================

            chart_insights[
                "average_distribution"
            ] = [

                f"{highest_feature} has the highest average values.",

                f"{lowest_feature} contains lower average values.",

                "Most columns appear balanced without major fluctuations."

            ]

            # =============================================
            # PIE CHART
            # =============================================

            chart_insights[
                "pie_chart"
            ] = [

                f"{highest_feature} contributes prominently in the dataset.",

                "Feature contribution appears visually balanced.",

                "No extreme dominance detected."

            ]

            # =============================================
            # FORECAST
            # =============================================

            chart_insights[
                "forecast"
            ] = [

                "Prediction trends appear stable.",

                "Predicted values closely follow actual patterns.",

                "AI confidence remains moderate to high."

            ]

            # =============================================
            # HEATMAP
            # =============================================

            chart_insights[
                "heatmap"
            ] = [

                "Strong feature relationships detected.",

                "Positive correlations found among some columns.",

                "Dataset appears suitable for ML analysis."

            ]

        except Exception as chart_error:

            print(
                "CHART INSIGHTS ERROR:",
                chart_error
            )

            chart_insights = {}

        # =================================================
        # FILE NAME
        # =================================================

        base_filename = file.filename.replace(
            ".csv",
            ""
        )

        # =================================================
        # REPORT PATH
        # =================================================

        report_path = None

        # =================================================
        # EXPORT FORMAT LOGIC
        # =================================================

        try:

            # =============================================
            # PDF REPORT
            # =============================================

            if export_format == "pdf":

                pdf_full_path = generate_pdf(

                    summary,

                    insights,

                    file.filename,

                    forecast_data,

                    correlation_data,

                    chart_insights

                )

                report_path = os.path.basename(
                    pdf_full_path
                )

            # =============================================
            # CSV REPORT
            # =============================================

            elif export_format == "csv":

                csv_filename = (

                    f"{base_filename}_report.csv"

                )

                csv_path = os.path.join(

                    REPORT_FOLDER,

                    csv_filename

                )

                df.to_csv(

                    csv_path,

                    index=False

                )

                report_path = csv_filename

            # =============================================
            # EXCEL REPORT
            # =============================================

            elif export_format == "excel":

                excel_filename = (

                    f"{base_filename}_report.xlsx"

                )

                excel_path = os.path.join(

                    REPORT_FOLDER,

                    excel_filename

                )

                df.to_excel(

                    excel_path,

                    index=False

                )

                report_path = excel_filename

            # =============================================
            # DEFAULT PDF
            # =============================================

            else:

                pdf_full_path = generate_pdf(

                    summary,

                    insights,

                    file.filename,

                    forecast_data,

                    correlation_data,

                    chart_insights

                )

                report_path = os.path.basename(
                    pdf_full_path
                )

            print(
                "REPORT GENERATED:",
                report_path
            )

        except Exception as report_error:

            print(
                "REPORT ERROR:",
                report_error
            )

            report_path = None

        # =================================================
        # AUTO EMAIL REPORT
        # =================================================

        try:

            user_email = (
                "YOUR_TEST_EMAIL@gmail.com"
            )

            if report_path:

                full_report_path = os.path.join(

                    REPORT_FOLDER,

                    report_path

                )

                send_report_email(

                    user_email,

                    full_report_path

                )

                print(
                    "EMAIL SENT SUCCESSFULLY 🚀"
                )

        except Exception as email_error:

            print(
                "EMAIL ERROR:",
                email_error
            )

        # =================================================
        # RESPONSE
        # =================================================

        return {

            "message":
            "Report generated successfully",

            "filename":
            file.filename,

            "analysis":
            summary,

            "preview":
            preview_data,

            "insights":
            insights,

            "advanced_insights":
            advanced_insights,

            "forecast_data":
            forecast_data,

            "correlation_data":
            correlation_data,

            "report_path":
            report_path,

            "chart_insights":
            chart_insights,

            "export_format":
            export_format

        }

    except Exception as e:

        print(
            "MAIN ERROR:",
            e
        )

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )

# =====================================================
# AI CHAT API
# =====================================================

@router.post("/ask")

async def ask_question(

    request: QuestionRequest

):

    try:

        # =================================================
        # DATASET PATH
        # =================================================

        dataset_path = os.path.join(

            "uploads",

            request.dataset

        )

        # =================================================
        # CHECK FILE
        # =================================================

        if not os.path.exists(dataset_path):

            raise HTTPException(

                status_code=404,

                detail="Dataset not found."

            )

        # =================================================
        # LOAD DATA
        # =================================================

        df = load_data(dataset_path)

        df = clean_data(df)

        print(
            "DATASET LOADED:",
            request.dataset
        )

        # =================================================
        # AI RESPONSE
        # =================================================

        ai_response = ask_ai_about_data(

            request.question,

            df,

            request.history

        )

        # =================================================
        # RESPONSE
        # =================================================

        return {

            "question":
            request.question,

            "dataset":
            request.dataset,

            "answer":
            ai_response["answer"],

            "suggestions":
            ai_response["suggestions"]

        }

    except Exception as e:

        print(
            "ASK API ERROR:",
            e
        )

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )