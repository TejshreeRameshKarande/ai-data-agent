import { useEffect, useState } from "react";

import { getAccentTheme } from "../utils/theme";

import {
  ArrowLeft,
  Trash2,
  RefreshCcw,
  FileText,
  BarChart3,
} from "lucide-react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

import toast from "react-hot-toast";

function History() {

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
        "Failed to load history"
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

  const cleanedPath =

    reportPath.replace(
      "reports/",
      ""
    );

  const finalPath =

    `http://127.0.0.1:8000/reports/${cleanedPath}`;

  console.log(
    "OPENING REPORT:",
    finalPath
  );

  window.open(
    finalPath,
    "_blank"
  );

};

  // =====================================================
  // DELETE HISTORY
  // =====================================================

  const deleteHistory = (filename) => {

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
      "History deleted successfully"
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

              🕘 Upload History

            </h1>

            <p className="
              text-slate-400
              text-xl
            ">

              Previously uploaded datasets and generated AI reports

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
                mb-1
              ">

                Total Uploads

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

              No Upload History

            </h2>

            <p className="
              text-slate-400
              text-lg
              mb-10
            ">

              Upload and analyze datasets first

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
            {/* TOP CARDS */}
            {/* ================================================= */}

            <div className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-8
              mb-12
            ">

              {/* CARD 1 */}

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

              {/* CARD 2 */}

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

                  PDF Reports

                </p>

                <h1 className="
                  text-5xl
                  font-bold
                  text-green-400
                ">

                  {history.length}

                </h1>

              </div>

              {/* CARD 3 */}

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

                  AI Processing

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
            {/* HISTORY LIST */}
            {/* ================================================= */}

            <div className="
              space-y-8
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
                      flex-col
                      xl:flex-row
                      justify-between
                      xl:items-center
                      gap-8
                    ">

                      {/* LEFT */}

                      <div className="
                        flex
                        items-start
                        gap-6
                      ">

                        <div className="
                          text-6xl
                        ">

                          📄

                        </div>

                        <div>

                          <h2 className={`
                            text-3xl
                            font-bold
                            mb-4
                            break-words
                            ${activeAccent.text}
                          `}>

                            {item.filename}

                          </h2>

                          <p className="
                            text-slate-500
                            mb-4
                          ">

                            Uploaded:
                            {" "}
                            {item.uploaded_at}

                          </p>

                          <p className="
                            text-slate-400
                            text-lg
                            leading-relaxed
                            max-w-3xl
                          ">

                            AI-powered dataset analysis completed successfully with charts,
                            visualizations, insights and downloadable reports.

                          </p>

                        </div>

                      </div>

                      {/* RIGHT */}

                      <div className="
                        flex
                        flex-wrap
                        gap-4
                      ">

                        {/* VIEW ANALYTICS */}

                        <button

                          onClick={() =>
                            navigate(
                              `/analytics/${item.filename}`
                            )
                          }

                          className={`
                            ${activeAccent.button}
                            px-7
                            py-4
                            rounded-2xl
                            font-bold
                            text-lg
                            transition-all
                            duration-300
                            hover:scale-105
                            flex
                            items-center
                            gap-3
                            shadow-lg
                          `}
                        >

                          <BarChart3 size={20} />

                          View Analytics

                        </button>

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
                            deleteHistory(
                              item.filename
                            )
                          }

                          className="
                            bg-red-500/20
                            hover:bg-red-500
                            text-red-400
                            hover:text-white
                            px-7
                            py-4
                            rounded-2xl
                            font-bold
                            text-lg
                            transition-all
                            duration-300
                            hover:scale-105
                            flex
                            items-center
                            gap-3
                            border
                            border-red-500/30
                          "
                        >

                          <Trash2 size={20} />

                          Delete

                        </button>

                      </div>

                    </div>

                    {/* STATS */}

                    <div className="
                      grid
                      grid-cols-1
                      md:grid-cols-3
                      gap-6
                      mt-10
                    ">

                      {/* ROWS */}

                      <div className="
                        bg-opacity-80
                        bg-[var(--card-bg)]/80
                        rounded-2xl
                        p-5
                      ">

                        <p className="
                          text-slate-400
                          mb-2
                        ">

                          Rows

                        </p>

                        <h3 className={`
                          text-3xl
                          font-bold
                          ${activeAccent.text}
                        `}>

                          {
                            item.analysis?.shape?.[0] || 0
                          }

                        </h3>

                      </div>

                      {/* COLUMNS */}

                      <div className="
                        bg-opacity-80
                        bg-[var(--card-bg)]/80
                        rounded-2xl
                        p-5
                      ">

                        <p className="
                          text-slate-400
                          mb-2
                        ">

                          Columns

                        </p>

                        <h3 className="
                          text-3xl
                          font-bold
                          text-purple-400
                        ">

                          {
                            item.analysis?.shape?.[1] || 0
                          }

                        </h3>

                      </div>

                      {/* STATUS */}

                      <div className="
                        bg-opacity-80
                        bg-[var(--card-bg)]/80
                        rounded-2xl
                        p-5
                      ">

                        <p className="
                          text-slate-400
                          mb-2
                        ">

                          Status

                        </p>

                        <h3 className="
                          text-2xl
                          font-bold
                          text-green-400
                        ">

                          Completed

                        </h3>

                      </div>

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

export default History;