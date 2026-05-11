import pandas as pd

from app.services.report_generator import generate_pdf


# =====================================================
# ANALYZE DATASET
# =====================================================

def analyze_dataset(df):

    summary = {

        "columns": list(df.columns),

        "shape": df.shape,

        "mean": df.select_dtypes(include="number")
        .mean()
        .round(2)
        .to_dict(),

        "max": df.select_dtypes(include="number")
        .max()
        .round(2)
        .to_dict(),

        "min": df.select_dtypes(include="number")
        .min()
        .round(2)
        .to_dict(),

    }

    return summary


# =====================================================
# GENERATE AI INSIGHTS
# =====================================================

def generate_insights(summary):

    insights = []

    insights.append(
        f"Dataset contains {summary['shape'][0]} rows and {summary['shape'][1]} columns."
    )

    if summary["mean"]:

        for column, value in summary["mean"].items():

            insights.append(
                f"Average value of {column} is {value}."
            )

    insights.append(
        "AI analysis completed successfully with statistical insights."
    )

    return "\n".join(insights)


# =====================================================
# COMPLETE REPORT PROCESS
# =====================================================

def process_report(file_path, filename):

    # READ CSV

    df = pd.read_csv(file_path)

    # ANALYSIS

    summary = analyze_dataset(df)

    # AI INSIGHTS

    insights = generate_insights(summary)

    # PDF

    pdf_path = generate_pdf(
        summary,
        insights,
        filename
    )

    # RETURN

    return {

        "filename": filename,

        "analysis": summary,

        "insights": insights,

        "report_path": pdf_path.replace("\\", "/")

    }