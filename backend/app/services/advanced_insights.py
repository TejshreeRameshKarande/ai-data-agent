import pandas as pd

import numpy as np

from scipy.stats import zscore

from sklearn.linear_model import LinearRegression

# =====================================================
# GENERATE ADVANCED INSIGHTS
# =====================================================

def generate_advanced_insights(df):

    insights = []

    forecast_data = {}

    correlation_data = {}

    summary_data = {

        "cleanliness": "Good",

        "anomaly_count": 0,

        "trend_count": 0,

        "strong_relations": 0,

    }

    # =================================================
    # NUMERIC COLUMNS
    # =================================================

    numeric_cols = df.select_dtypes(

        include=np.number

    ).columns

    # =================================================
    # NO NUMERIC DATA
    # =================================================

    if len(numeric_cols) == 0:

        return {

            "insights": [

                "No numeric columns available for advanced analysis."

            ],

            "forecast_data": {},

            "correlation_data": {},

            "summary_data": summary_data

        }

    # =================================================
    # ANOMALY DETECTION
    # =================================================

    insights.append(
        "🚨 Anomaly Detection:"
    )

    anomaly_counter = 0

    for col in numeric_cols:

        try:

            z_scores = np.abs(

                zscore(df[col].dropna())

            )

            anomalies = (z_scores > 3).sum()

            if anomalies > 0:

                anomaly_counter += anomalies

                insights.append(

                    f"• {col} has {anomalies} potential anomalies."

                )

            else:

                insights.append(

                    f"• {col} has no major anomalies."

                )

        except:

            pass

    summary_data["anomaly_count"] = int(
        anomaly_counter
    )

    # =================================================
    # TREND DETECTION
    # =================================================

    insights.append(
        "\n📈 Trend Detection:"
    )

    trend_counter = 0

    for col in numeric_cols:

        try:

            first_value = df[col].iloc[0]

            last_value = df[col].iloc[-1]

            if last_value > first_value:

                trend_counter += 1

                insights.append(

                    f"• {col} shows an increasing trend."

                )

            elif last_value < first_value:

                trend_counter += 1

                insights.append(

                    f"• {col} shows a decreasing trend."

                )

            else:

                insights.append(

                    f"• {col} appears stable."

                )

        except:

            pass

    summary_data["trend_count"] = int(
        trend_counter
    )

    # =================================================
    # CORRELATION INSIGHTS
    # =================================================

    insights.append(
        "\n🔗 Correlation Insights:"
    )

    relation_counter = 0

    try:

        correlation_matrix = df[
            numeric_cols
        ].corr()

        for col in numeric_cols:

            correlations = correlation_matrix[col].drop(col)

            top_corr = correlations.abs().idxmax()

            corr_value = correlations[top_corr]

            if abs(corr_value) > 0.7:

                relation_counter += 1

            insights.append(

                f"• {col} is strongly related to {top_corr} ({corr_value:.2f})."

            )

    except:

        pass

    summary_data["strong_relations"] = int(
        relation_counter
    )

    # =================================================
    # PREDICTIONS + FORECAST DATA
    # =================================================

    insights.append(
        "\n🔮 Predictions:"
    )

    for col in numeric_cols:

        try:

            y = df[col].dropna().values

            X = np.arange(len(y)).reshape(-1, 1)

            model = LinearRegression()

            model.fit(X, y)

            next_value = model.predict(

                [[len(y)]]

            )[0]

            insights.append(

                f"• Predicted next value for {col}: {next_value:.2f}"

            )

            # =============================================
            # FORECAST GRAPH DATA
            # =============================================

            graph_points = []

            for i, value in enumerate(y):

                graph_points.append({

                    "index": int(i),

                    "actual": float(value),

                    "predicted": None

                })

            graph_points.append({

                "index": int(len(y)),

                "actual": None,

                "predicted": float(next_value)

            })

            forecast_data[col] = graph_points

        except:

            pass

    # =================================================
    # SMART RECOMMENDATIONS
    # =================================================

    insights.append(
        "\n💡 Recommendations:"
    )

    for col in numeric_cols:

        try:

            mean_value = df[col].mean()

            if mean_value > 1000:

                insights.append(

                    f"• {col} has high average values. Consider deeper business optimization."

                )

            else:

                insights.append(

                    f"• {col} appears stable with moderate values."

                )

        except:

            pass

    # =================================================
    # CORRELATION MATRIX
    # =================================================

    try:

        correlation_matrix = df[
            numeric_cols
        ].corr()

        correlation_data = (

            correlation_matrix
            .round(2)
            .to_dict()

        )

    except:

        correlation_data = {}

    # =================================================
    # SUMMARY CLEANLINESS
    # =================================================

    if anomaly_counter == 0:

        summary_data["cleanliness"] = "Excellent"

    elif anomaly_counter < 5:

        summary_data["cleanliness"] = "Good"

    else:

        summary_data["cleanliness"] = "Moderate"

    # =================================================
    # RETURN
    # =================================================

    return {

        "insights": insights,

        "forecast_data": forecast_data,

        "correlation_data": correlation_data,

        "summary_data": summary_data

    }