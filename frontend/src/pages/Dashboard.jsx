import { useEffect, useState } from "react";

import { getAccentTheme } from "../utils/theme";

import Sidebar from "../components/Sidebar";

function Dashboard() {

  // =====================================================
  // STATES
  // =====================================================

  const [history, setHistory] =
    useState([]);

  const [totalAnomalies, setTotalAnomalies] =
    useState(0);

  const [forecastModels, setForecastModels] =
    useState(0);

  // =====================================================
  // ACTIVE THEME
  // =====================================================

  const activeAccent =
    getAccentTheme();

  // =====================================================
  // LOAD HISTORY
  // =====================================================

  useEffect(() => {

    // ===================================================
    // CURRENT USER
    // ===================================================

    const currentUser = JSON.parse(

      localStorage.getItem("user")

    );

    // ===================================================
    // USER HISTORY KEY
    // ===================================================

    const historyKey =

      `history_${currentUser?.id}`;

    // ===================================================
    // LOAD USER HISTORY
    // ===================================================

    const storedHistory =
      JSON.parse(
        localStorage.getItem(historyKey)
      ) || [];

    setHistory(storedHistory);

    // ===================================================
    // ANOMALY COUNT
    // ===================================================

    let anomalyCounter = 0;

    // ===================================================
    // FORECAST MODELS
    // ===================================================

    let forecastCounter = 0;

    storedHistory.forEach((item) => {

      // =================================================
      // ADVANCED INSIGHTS
      // =================================================

      if (item.advanced_insights) {

        item.advanced_insights.forEach(

          (insight) => {

            if (

              insight
                .toLowerCase()
                .includes("anomal")

            ) {

              anomalyCounter++;

            }

          }

        );

      }

      // =================================================
      // FORECAST DATA
      // =================================================

      if (item.forecast_data) {

        forecastCounter += Object.keys(

          item.forecast_data

        ).length;

      }

    });

    setTotalAnomalies(
      anomalyCounter
    );

    setForecastModels(
      forecastCounter
    );

  }, []);

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="
      flex
      min-h-screen
      bg-[var(--main-bg)]
      text-white
    ">

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <Sidebar />

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="
        flex-1
        p-10
        overflow-auto
      ">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="
          flex
          flex-col
          lg:flex-row
          justify-between
          lg:items-center
          gap-6
          mb-12
        ">

          <div>

            <h1 className={`
              text-6xl
              font-bold
              mb-4
              ${activeAccent.text}
            `}>

              AI Analytics Platform

            </h1>

            <p className="
              text-slate-400
              text-xl
            ">

              Overall system overview and analytics

            </p>

          </div>

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            px-6
            py-4
            rounded-2xl
          ">

            🚀 System Running

          </div>

        </div>

        {/* ================================================= */}
        {/* KPI CARDS */}
        {/* ================================================= */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          xl:grid-cols-6
          gap-8
          mb-12
        ">

          {/* TOTAL UPLOADS */}

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <p className="
              text-slate-400
              text-lg
            ">

              Total Uploads

            </p>

            <h1 className="
              text-5xl
              font-bold
              text-blue-400
              mt-4
            ">

              {history.length}

            </h1>

          </div>

          {/* REPORTS */}

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <p className="
              text-slate-400
              text-lg
            ">

              Reports Generated

            </p>

            <h1 className="
              text-5xl
              font-bold
              text-purple-400
              mt-4
            ">

              {history.length}

            </h1>

          </div>

          {/* AI REQUESTS */}

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <p className="
              text-slate-400
              text-lg
            ">

              AI Requests

            </p>

            <h1 className="
              text-5xl
              font-bold
              text-green-400
              mt-4
            ">

              {history.length * 3}

            </h1>

          </div>

          {/* ANOMALIES */}

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <p className="
              text-slate-400
              text-lg
            ">

              Anomalies Found

            </p>

            <h1 className="
              text-5xl
              font-bold
              text-red-400
              mt-4
            ">

              {totalAnomalies}

            </h1>

          </div>

          {/* FORECAST MODELS */}

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <p className="
              text-slate-400
              text-lg
            ">

              Forecast Models

            </p>

            <h1 className={`
              text-5xl
              font-bold
              mt-4
              ${activeAccent.text}
            `}>

              {forecastModels}

            </h1>

          </div>

          {/* STATUS */}

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <p className="
              text-slate-400
              text-lg
            ">

              System Status

            </p>

            <h1 className="
              text-4xl
              font-bold
              text-green-400
              mt-6
            ">

              Online

            </h1>

          </div>

        </div>

        {/* ================================================= */}
        {/* MAIN GRID */}
        {/* ================================================= */}

        <div className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-8
        ">

          {/* ================================================= */}
          {/* RECENT UPLOADS */}
          {/* ================================================= */}

          <div className="
            xl:col-span-2
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <h2 className="
              text-3xl
              font-bold
              mb-8
            ">

              📁 Recent Uploads

            </h2>

            <div className="
              space-y-5
            ">

              {history.length === 0 ? (

                <div className="
                  bg-opacity-80
                  bg-[var(--card-bg)]
                  border
                  border-slate-700
                  p-6
                  rounded-2xl
                ">

                  No uploads yet

                </div>

              ) : (

                history
                  .slice()
                  .reverse()
                  .map((item, index) => {

                    // =====================================
                    // CLEAN REPORT PATH
                    // =====================================

                    const cleanedPath =

                      item.report_path?.replace(
                        "reports/",
                        ""
                      );

                    // =====================================
                    // FINAL URL
                    // =====================================

                    const finalPath =

                      `http://127.0.0.1:8000/reports/${cleanedPath}`;

                    return (

                      <div
                        key={index}

                        className="
                          bg-opacity-80
                          bg-[var(--card-bg)]
                          border
                          border-slate-700
                          p-6
                          rounded-2xl
                          flex
                          justify-between
                          items-center
                        "
                      >

                        {/* LEFT */}

                        <div>

                          <h3 className="
                            text-xl
                            font-bold
                          ">

                            {item.filename}

                          </h3>

                          <p className="
                            text-slate-400
                            mt-2
                          ">

                            AI analysis completed

                          </p>

                        </div>

                        {/* BUTTON */}

                        <a
                          href={finalPath}

                          target="_blank"

                          rel="noreferrer"

                          className={`
                            ${activeAccent.button}
                            px-5
                            py-3
                            rounded-xl
                            font-bold
                          `}
                        >

                          View Report

                        </a>

                      </div>

                    );

                  })

              )}

            </div>

          </div>

          {/* ================================================= */}
          {/* ACTIVITY */}
          {/* ================================================= */}

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <h2 className="
              text-3xl
              font-bold
              mb-8
            ">

              🕘 Activity Feed

            </h2>

            <div className="
              space-y-5
            ">

              <div className="
                bg-opacity-80
                bg-[var(--card-bg)]
                border
                border-slate-700
                p-5
                rounded-2xl
              ">

                🤖 AI Engine Active

              </div>

              <div className="
                bg-opacity-80
                bg-[var(--card-bg)]
                border
                border-slate-700
                p-5
                rounded-2xl
              ">

                📄 Reports Enabled

              </div>

              <div className="
                bg-opacity-80
                bg-[var(--card-bg)]
                border
                border-slate-700
                p-5
                rounded-2xl
              ">

                ⚡ FastAPI Connected

              </div>

              <div className="
                bg-opacity-80
                bg-[var(--card-bg)]
                border
                border-slate-700
                p-5
                rounded-2xl
              ">

                📊 Analytics Ready

              </div>

              <div className="
                bg-opacity-80
                bg-[var(--card-bg)]
                border
                border-slate-700
                p-5
                rounded-2xl
              ">

                🔐 Secure Upload Active

              </div>

              <div className="
                bg-opacity-80
                bg-[var(--card-bg)]
                border
                border-slate-700
                p-5
                rounded-2xl
              ">

                📈 ML Forecast Engine Running

              </div>

              <div className="
                bg-opacity-80
                bg-[var(--card-bg)]
                border
                border-slate-700
                p-5
                rounded-2xl
              ">

                🚨 Anomaly Detection Enabled

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}

export default Dashboard;