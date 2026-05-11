import { useEffect, useState } from "react";

import { getAccentTheme } from "../utils/theme";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Trash2,
  RefreshCcw,
  FileText,
  BarChart3,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

import toast from "react-hot-toast";

function Reports() {

  // =====================================================
  // ACTIVE THEME
  // =====================================================

  const activeAccent =
    getAccentTheme();

  // =====================================================
  // STATES
  // =====================================================

  const [history, setHistory] =
    useState([]);

  const navigate =
    useNavigate();

  // =====================================================
  // CURRENT USER
  // =====================================================

  const currentUser = JSON.parse(

    localStorage.getItem("user")

  );

  // =====================================================
  // USER HISTORY KEY
  // =====================================================

  const historyKey =
    `history_${currentUser?.id}`;

  // =====================================================
  // LOAD HISTORY
  // =====================================================

  const loadHistory = () => {

    try {

      const storedHistory =

        JSON.parse(
          localStorage.getItem(historyKey)
        ) || [];

      setHistory(storedHistory);

    }

    catch (error) {

      console.error(error);

      toast.error(
        "Failed to load reports"
      );

    }

  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadHistory();

  }, []);

  // =====================================================
  // OPEN PDF REPORT
  // =====================================================

  const openReport = (reportPath) => {

  if (!reportPath) {

    toast.error(
      "Report not available"
    );

    return;

  }

  // REMOVE EXTRA reports/
  const cleanedPath =

    reportPath.replace(
      "reports/",
      ""
    );

  // FINAL URL
  const finalPath =

    `http://127.0.0.1:8000/reports/${cleanedPath}`;

  console.log(
    "FINAL REPORT URL:",
    finalPath
  );

  // OPEN FILE
  window.open(
    finalPath,
    "_blank"
  );

};

  // =====================================================
  // DELETE REPORT
  // =====================================================

  const deleteReport = (filename) => {

    const updatedHistory = history.filter(
      (item) =>
        item.filename !== filename
    );

    localStorage.setItem(

      historyKey,

      JSON.stringify(updatedHistory)

    );

    setHistory(updatedHistory);

    toast.success(
      "Report deleted successfully"
    );

  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="
      flex
      min-h-screen
      bg-[var(--main-bg)]
      text-white
      overflow-hidden
      relative
    ">

      {/* ================================================= */}
      {/* BACKGROUND EFFECTS */}
      {/* ================================================= */}

      <div className="
        absolute
        top-0
        left-0
        w-full
        h-full
        overflow-hidden
        pointer-events-none
      ">

        <div className="
          absolute
          top-20
          left-20
          w-72
          h-72
          bg-cyan-500/10
          blur-3xl
          rounded-full
        " />

        <div className="
          absolute
          bottom-20
          right-20
          w-96
          h-96
          bg-purple-500/10
          blur-3xl
          rounded-full
        " />

      </div>

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <Sidebar />

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="
        flex-1
        overflow-y-auto
        p-10
        relative
        z-10
      ">

        {/* ================================================= */}
        {/* TOP BAR */}
        {/* ================================================= */}

        <div className="
          flex
          flex-col
          xl:flex-row
          justify-between
          xl:items-center
          gap-8
          mb-12
        ">

          {/* LEFT */}

          <div>

            <h1 className={`
              text-6xl
              font-bold
              mb-4
              ${activeAccent.text}
            `}>

              📊 AI Reports Dashboard

            </h1>

            <p className="
              text-slate-400
              text-xl
            ">

              Open live AI analytics dashboards and generated PDF reports

            </p>

          </div>

          {/* RIGHT */}

          <div className="
            flex
            flex-wrap
            items-center
            gap-5
          ">

            {/* REFRESH */}

            <button

              onClick={loadHistory}

              className={`
                ${activeAccent.button}
                px-6
                py-4
                rounded-2xl
                flex
                items-center
                gap-3
                font-bold
                transition-all
                duration-300
                hover:scale-105
              `}
            >

              <RefreshCcw size={20} />

              Refresh

            </button>

            {/* BACK */}

            <button

              onClick={() => navigate(-1)}

              className="
                bg-[var(--card-bg)]/80
                backdrop-blur-xl
                border
                border-slate-700
                hover:border-slate-500
                px-6
                py-4
                rounded-2xl
                flex
                items-center
                gap-3
                transition-all
                duration-300
              "
            >

              <ArrowLeft size={20} />

              Back

            </button>

            {/* TOTAL */}

            <div className="
              bg-[var(--card-bg)]/80
              backdrop-blur-xl
              border
              border-slate-700/50
              rounded-2xl
              px-6
              py-4
            ">

              <p className="
                text-slate-400
                text-sm
              ">

                Total Reports

              </p>

              <h2 className={`
                text-3xl
                font-bold
                ${activeAccent.text}
              `}>

                {history.length}

              </h2>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* EMPTY STATE */}
        {/* ================================================= */}

        {history.length === 0 ? (

          <div className="
            bg-[var(--card-bg)]/80
            backdrop-blur-xl
            border
            border-slate-700/50
            rounded-3xl
            p-16
            text-center
          ">

            <div className="
              text-7xl
              mb-6
            ">

              📁

            </div>

            <h2 className="
              text-4xl
              font-bold
              mb-4
            ">

              No Reports Available

            </h2>

            <p className="
              text-slate-400
              text-lg
              mb-10
            ">

              Upload datasets first to generate reports

            </p>

            <Link to="/upload">

              <button className={`
                ${activeAccent.button}
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition-all
                duration-300
                hover:scale-105
              `}>

                Upload Dataset

              </button>

            </Link>

          </div>

        ) : (

          <>

            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <div className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-8
              mb-12
            ">

              <div className="
                bg-[var(--card-bg)]/80
                backdrop-blur-xl
                border
                border-slate-700/50
                rounded-3xl
                p-8
              ">

                <p className="
                  text-slate-400
                  mb-3
                ">

                  Uploaded Files

                </p>

                <h1 className={`
                  text-5xl
                  font-bold
                  ${activeAccent.text}
                `}>

                  {history.length}

                </h1>

              </div>

              <div className="
                bg-[var(--card-bg)]/80
                backdrop-blur-xl
                border
                border-slate-700/50
                rounded-3xl
                p-8
              ">

                <p className="
                  text-slate-400
                  mb-3
                ">

                  AI Reports

                </p>

                <h1 className="
                  text-5xl
                  font-bold
                  text-green-400
                ">

                  {history.length}

                </h1>

              </div>

              <div className="
                bg-[var(--card-bg)]/80
                backdrop-blur-xl
                border
                border-slate-700/50
                rounded-3xl
                p-8
              ">

                <p className="
                  text-slate-400
                  mb-3
                ">

                  System Status

                </p>

                <h1 className="
                  text-4xl
                  font-bold
                  text-purple-400
                ">

                  Active

                </h1>

              </div>

            </div>

            {/* ================================================= */}
            {/* REPORT CARDS */}
            {/* ================================================= */}

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            ">

              {history
                .slice()
                .reverse()
                .map((item, index) => (

                  <div
                    key={index}

                    className="
                      group
                      bg-[var(--card-bg)]/80
                      backdrop-blur-xl
                      border
                      border-slate-700/50
                      hover:border-slate-500/50
                      rounded-3xl
                      p-8
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                    "
                  >

                    {/* TOP */}

                    <div className="
                      flex
                      justify-between
                      items-start
                      mb-8
                    ">

                      <div className="
                        text-6xl
                      ">

                        📄

                      </div>

                      <div className="
                        bg-green-500/20
                        text-green-400
                        px-4
                        py-2
                        rounded-xl
                        text-sm
                        font-bold
                      ">

                        ANALYZED

                      </div>

                    </div>

                    {/* FILE NAME */}

                    <h2 className={`
                      text-2xl
                      font-bold
                      mb-4
                      break-words
                      ${activeAccent.text}
                    `}>

                      {item.filename}

                    </h2>

                    {/* DATE */}

                    <p className="
                      text-slate-500
                      mb-6
                    ">

                      Uploaded:
                      {" "}
                      {item.uploaded_at}

                    </p>

                    {/* DESC */}

                    <p className="
                      text-slate-400
                      mb-8
                      leading-relaxed
                    ">

                      Open live AI analytics dashboard with charts,
                      trends, forecasting and advanced insights.

                    </p>

                    {/* STATS */}

                    <div className="
                      grid
                      grid-cols-2
                      gap-4
                      mb-8
                    ">

                      <div className="
                        bg-opacity-80
                        bg-[var(--card-bg)]/80
                        rounded-2xl
                        p-4
                      ">

                        <p className="
                          text-slate-400
                          text-sm
                          mb-2
                        ">

                          Rows

                        </p>

                        <h3 className={`
                          text-2xl
                          font-bold
                          ${activeAccent.text}
                        `}>

                          {
                            item.analysis?.shape?.[0] || 0
                          }

                        </h3>

                      </div>

                      <div className="
                        bg-opacity-80
                        bg-[var(--card-bg)]/80
                        rounded-2xl
                        p-4
                      ">

                        <p className="
                          text-slate-400
                          text-sm
                          mb-2
                        ">

                          Columns

                        </p>

                        <h3 className="
                          text-2xl
                          font-bold
                          text-purple-400
                        ">

                          {
                            item.analysis?.shape?.[1] || 0
                          }

                        </h3>

                      </div>

                    </div>

                    {/* BUTTONS */}

                    <div className="
                      space-y-4
                    ">

                      {/* OPEN REPORT */}

                      <button

                        onClick={() =>
                          openReport(
                            item.report_path
                          )
                        }

                        className="
                          w-full
                          bg-green-500
                          hover:bg-green-600
                          py-4
                          rounded-2xl
                          font-bold
                          text-lg
                          transition-all
                          duration-300
                          hover:scale-[1.02]
                          flex
                          items-center
                          justify-center
                          gap-3
                        "
                      >

                        <FileText size={20} />

                        Open Report

                      </button>

                      {/* DELETE */}

                      <button

                        onClick={() =>
                          deleteReport(item.filename)
                        }

                        className="
                          w-full
                          bg-red-500/20
                          hover:bg-red-500
                          text-red-400
                          hover:text-white
                          py-4
                          rounded-2xl
                          font-bold
                          flex
                          items-center
                          justify-center
                          gap-3
                          transition-all
                          duration-300
                        "
                      >

                        <Trash2 size={20} />

                        Delete Report

                      </button>

                    </div>

                  </div>

                ))}

            </div>

          </>

        )}

      </main>

    </div>

  );

}

export default Reports;