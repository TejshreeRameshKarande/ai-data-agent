import pandas as pd


# 📥 Load Data (with encoding fix)
def load_data(file_path):
    try:
        df = pd.read_csv(file_path, encoding="utf-8")
    except Exception:
        df = pd.read_csv(file_path, encoding="latin1")
    return df


# 🧹 Clean Data
def clean_data(df):
    # remove duplicates
    df = df.drop_duplicates()

    # fill missing values safely
    df = df.fillna(0)

    return df


# 📊 Analyze Data (safe + professional)
def analyze_data(df):
    # select only numeric columns
    numeric_df = df.select_dtypes(include=["number"])

    summary = {
        "columns": list(df.columns),
        "shape": df.shape,
        "mean": numeric_df.mean().to_dict() if not numeric_df.empty else {},
        "max": numeric_df.max().to_dict() if not numeric_df.empty else {},
        "min": numeric_df.min().to_dict() if not numeric_df.empty else {}
    }

    return summary