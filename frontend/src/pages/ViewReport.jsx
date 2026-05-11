import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Trash2,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

function Reports() {

  // =====================================================
  // STATES
  // =====================================================

  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  // =====================================================
  // LOAD HISTORY
  // =====================================================

  useEffect(() => {

    const storedHistory =
      JSON.parse(localStorage.getItem("history")) || [];

    setHistory(storedHistory);

  }, []);

  // =====================================================
  // DELETE REPORT
  // =====================================================

  const deleteReport = (filename) => {

    const updatedHistory = history.filter(
      (item) => item.filename !== filename
    );

    localStorage.setItem(
      "history",
      JSON.stringify(updatedHistory)
    );

    setHistory(updatedHistory);

  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="flex h-screen bg-[var(--main-bg)] text-white overflow-hidden">

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <Sidebar />

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="flex-1 overflow-y-auto p-10">

        {/* ================================================= */}
        {/* HEADER */}
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

            <h1 className="text-5xl font-bold mb-4">
              📊 Analytics Reports
            </h1>

            <p className="text-slate-400 text-xl">
              Select a dataset to open live AI analytics dashboard
            </p>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-5">

            {/* BACK */}

            <button
              onClick={() => navigate(-1)}
              className="
                bg-[var(--card-bg)]
                border
                border-slate-700
                hover:border-blue-500
                px-6
                py-4
                rounded-2xl
                flex
                items-center
                gap-3
                transition
              "
            >

              <ArrowLeft size={20} />

              Back

            </button>

            {/* TOTAL */}

            <div className="
              bg-[var(--card-bg)]
              border
              border-slate-800
              rounded-2xl
              px-6
              py-4
            ">

              <p className="text-slate-400 text-sm">
                Total Reports
              </p>

              <h2 className="text-3xl font-bold text-blue-400">
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
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-16
            text-center
          ">

            <div className="text-7xl mb-6">
              📁
            </div>

            <h2 className="text-4xl font-bold mb-4">
              No Reports Available
            </h2>

            <p className="text-slate-400 text-lg">
              Upload and analyze datasets first
            </p>

          </div>

        ) : (

          <>
            {/* ================================================= */}
            {/* TOP STATS */}
            {/* ================================================= */}

            <div className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-8
              mb-12
            ">

              <div className="
                bg-[var(--card-bg)]
                border
                border-slate-800
                rounded-3xl
                p-8
              ">

                <p className="text-slate-400 mb-3">
                  Total Uploaded Files
                </p>

                <h1 className="text-5xl font-bold text-blue-400">
                  {history.length}
                </h1>

              </div>

              <div className="
                bg-[var(--card-bg)]
                border
                border-slate-800
                rounded-3xl
                p-8
              ">

                <p className="text-slate-400 mb-3">
                  AI Generated Reports
                </p>

                <h1 className="text-5xl font-bold text-green-400">
                  {history.length}
                </h1>

              </div>

              <div className="
                bg-[var(--card-bg)]
                border
                border-slate-800
                rounded-3xl
                p-8
              ">

                <p className="text-slate-400 mb-3">
                  Analytics Status
                </p>

                <h1 className="text-4xl font-bold text-purple-400">
                  Active
                </h1>

              </div>

            </div>

            {/* ================================================= */}
            {/* FILE LIST */}
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
                      bg-[var(--card-bg)]
                      border
                      border-slate-800
                      hover:border-blue-500
                      rounded-3xl
                      p-8
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                      hover:shadow-2xl
                      hover:shadow-blue-500/10
                    "
                  >

                    {/* ===================================== */}
                    {/* TOP */}
                    {/* ===================================== */}

                    <div className="
                      flex
                      justify-between
                      items-start
                      mb-8
                    ">

                      <div className="text-6xl">
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

                    {/* ===================================== */}
                    {/* FILE NAME */}
                    {/* ===================================== */}

                    <h2 className="
                      text-2xl
                      font-bold
                      mb-4
                      break-words
                      group-hover:text-blue-400
                      transition
                    ">

                      {item.filename}

                    </h2>

                    {/* ===================================== */}
                    {/* DESC */}
                    {/* ===================================== */}

                    <p className="
                      text-slate-400
                      mb-8
                      leading-relaxed
                    ">

                      Open interactive AI analytics dashboard with
                      visualizations, insights, charts, correlations
                      and distributions.

                    </p>

                    {/* ===================================== */}
                    {/* STATS */}
                    {/* ===================================== */}

                    <div className="
                      grid
                      grid-cols-2
                      gap-4
                      mb-8
                    ">

                      <div className="
bg-opacity-80 bg-[var(--card-bg)]                        rounded-2xl
                        p-4
                      ">

                        <p className="
                          text-slate-400
                          text-sm
                          mb-2
                        ">
                          Rows
                        </p>

                        <h3 className="
                          text-2xl
                          font-bold
                          text-blue-400
                        ">

                          {item.analysis?.shape?.[0] || 0}

                        </h3>

                      </div>

                      <div className="
bg-opacity-80 bg-[var(--card-bg)]                        rounded-2xl
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

                          {item.analysis?.shape?.[1] || 0}

                        </h3>

                      </div>

                    </div>

                    {/* ===================================== */}
                    {/* OPEN BUTTON */}
                    {/* ===================================== */}

                    <Link
                      to={`/analytics/${item.filename}`}
                    >

                      <div className="
                        w-full
                        ${activeAccent.button}
                        hover:bg-blue-600
                        text-center
                        py-4
                        rounded-2xl
                        font-bold
                        text-lg
                        transition
                      ">

                        Open Analytics →

                      </div>

                    </Link>

                    {/* ===================================== */}
                    {/* DELETE BUTTON */}
                    {/* ===================================== */}

                    <button
                      onClick={() =>
                        deleteReport(item.filename)
                      }

                      className="
                        w-full
                        mt-4
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
                        transition
                      "
                    >

                      <Trash2 size={20} />

                      Delete Report

                    </button>

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