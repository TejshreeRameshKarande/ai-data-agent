import { useState } from "react";

import { getAccentTheme } from "../utils/theme";

import {
  useNavigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

import axios from "axios";

import toast from "react-hot-toast";

function Upload() {

  // =====================================================
  // ACTIVE THEME
  // =====================================================

  const activeAccent =
    getAccentTheme();

  // =====================================================
  // NAVIGATE
  // =====================================================

  const navigate =
    useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [isDragging, setIsDragging] =
    useState(false);

  const [uploadProgress, setUploadProgress] =
    useState(0);

  // =====================================================
  // DRAG EVENTS
  // =====================================================

  const handleDragOver = (e) => {

    e.preventDefault();

    setIsDragging(true);

  };

  const handleDragLeave = () => {

    setIsDragging(false);

  };

  const handleDrop = (e) => {

    e.preventDefault();

    setIsDragging(false);

    const droppedFile =
      e.dataTransfer.files[0];

    if (
      droppedFile &&
      droppedFile.type === "text/csv"
    ) {

      setFile(droppedFile);

      toast.success(
        "CSV file selected 🚀"
      );

    }

    else {

      toast.error(
        "Please upload CSV file only."
      );

    }

  };

  // =====================================================
  // HANDLE UPLOAD
  // =====================================================

  const handleUpload = async () => {

    if (!file) {

      toast.error(
        "Please select CSV file"
      );

      return;

    }

    try {

      setLoading(true);

      setUploadProgress(0);

      // =================================================
      // SETTINGS
      // =================================================

      const settings = JSON.parse(

        localStorage.getItem("settings")

      );

      const exportFormat =

        settings?.exportFormat || "pdf";

      // =================================================
      // FORM DATA
      // =================================================

      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "export_format",
        exportFormat
      );

      // =================================================
      // API REQUEST
      // =================================================

      const response = await axios.post(

        "http://127.0.0.1:8000/upload",

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data",

          },

          onUploadProgress: (
            progressEvent
          ) => {

            const percent = Math.round(

              (
                progressEvent.loaded * 100
              ) /

              progressEvent.total

            );

            setUploadProgress(percent);

          },

        }

      );

      setUploadProgress(100);

      // =================================================
      // CURRENT USER
      // =================================================

      const currentUser = JSON.parse(

        localStorage.getItem("user")

      );

      // =================================================
      // USER HISTORY KEY
      // =================================================

      const historyKey =

        `history_${currentUser.id}`;

      // =================================================
      // GET USER HISTORY
      // =================================================

      const history =

        JSON.parse(
          localStorage.getItem(historyKey)
        ) || [];

      // =================================================
      // NEW HISTORY ITEM
      // =================================================
      
      const newItem = {

  id: Date.now(),

  filename:
    response.data.filename,

  analysis:
    response.data.analysis,

  preview:
    response.data.preview,

  insights:
    response.data.insights,

  advanced_insights:
    response.data.advanced_insights,

  forecast_data:
    response.data.forecast_data,

  correlation_data:
    response.data.correlation_data,

  report_path:
    response.data.report_path,

  uploaded_at:
    new Date().toLocaleString(),

};

console.log(

  "REPORT PATH:",

  response.data.report_path

);
      // =================================================
      // UPDATED HISTORY
      // =================================================

      const updatedHistory = [

        ...history,

        newItem,

      ];

      // =================================================
      // SAVE USER HISTORY
      // =================================================

      try {

  localStorage.setItem(

    historyKey,

    JSON.stringify(updatedHistory)

  );

}

catch (error) {

  console.log(
    "Storage limit reached"
  );

}

      toast.success(
        "Dataset analyzed successfully 🚀"
      );

      // =================================================
      // NAVIGATE TO ANALYTICS
      // =================================================

      navigate(
        `/analytics/${response.data.filename}`
      );

    }

    catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.detail ||

        error.message

      );

    }

    finally {

      setLoading(false);

    }

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

              Upload Dataset

            </h1>

            <p className="
              text-slate-400
              text-xl
            ">

              Upload CSV datasets and generate AI-powered analytics reports

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

            🤖 AI Engine Active

          </div>

        </div>

        {/* ================================================= */}
        {/* UPLOAD SECTION */}
        {/* ================================================= */}

        <div className="
          bg-[var(--card-bg)]
          border
          border-slate-800
          rounded-3xl
          p-10
          shadow-2xl
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-8
          ">

            Dataset Upload

          </h2>

          {/* ================================================= */}
          {/* DRAG DROP */}
          {/* ================================================= */}

          <div

            onDragOver={handleDragOver}

            onDragLeave={handleDragLeave}

            onDrop={handleDrop}

            className={`
              border-2
              border-dashed
              rounded-3xl
              p-14
              transition-all
              duration-300
              text-center
              cursor-pointer

              ${
                isDragging

                  ? `
                    border-blue-500
                    scale-[1.01]
                  `

                  : `
                    border-slate-700
                    hover:border-blue-500
                    hover:bg-[var(--card-bg)]/50
                  `
              }
            `}
          >

            <div className="
              text-7xl
              mb-6
            ">

              {
                isDragging
                  ? "🚀"
                  : "📁"
              }

            </div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
            ">

              {
                isDragging

                  ? "Drop CSV File Here"

                  : "Drag & Drop Dataset"
              }

            </h2>

            <p className="
              text-slate-400
              text-lg
              mb-8
            ">

              Upload CSV datasets for
              AI-powered analytics &
              visualization

            </p>

            {/* FILE INPUT */}

            <input

              type="file"

              accept=".csv"

              id="fileUpload"

              onChange={(e) => {

                setFile(
                  e.target.files[0]
                );

                toast.success(
                  "CSV file selected 🚀"
                );

              }}

              className="hidden"
            />

            {/* LABEL */}

            <label

              htmlFor="fileUpload"

              className={`
                inline-block
                ${activeAccent.button}
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition
                cursor-pointer
              `}
            >

              Browse CSV File

            </label>

          </div>

          {/* ================================================= */}
          {/* BUTTON */}
          {/* ================================================= */}

          <div className="mt-8">

            <button

              onClick={handleUpload}

              disabled={loading}

              className={`
                w-full
                py-5
                rounded-2xl
                font-bold
                text-xl
                transition-all

                ${
                  loading

                    ? `
                      bg-slate-700
                      cursor-not-allowed
                    `

                    : `
                      ${activeAccent.button}
                    `
                }
              `}
            >

              {
                loading

                  ? "Analyzing Dataset..."

                  : "Upload & Analyze"
              }

            </button>

          </div>

          {/* ================================================= */}
          {/* PROGRESS */}
          {/* ================================================= */}

          {loading && (

            <div className="
              mt-8
              bg-[var(--card-bg)]
              border
              border-slate-700
              rounded-3xl
              p-8
            ">

              <div className="
                flex
                justify-between
                items-center
                mb-5
              ">

                <h3 className="
                  text-2xl
                  font-bold
                ">

                  🚀 Uploading Dataset

                </h3>

                <span className={`
                  font-bold
                  text-xl
                  ${activeAccent.text}
                `}>

                  {uploadProgress}%

                </span>

              </div>

              {/* PROGRESS BAR */}

              <div className="
                w-full
                bg-slate-700
                rounded-full
                h-5
                overflow-hidden
              ">

                <div

                  className="
                    bg-gradient-to-r
                    from-blue-500
                    to-cyan-400
                    h-full
                    transition-all
                    duration-300
                  "

                  style={{
                    width:
                      `${uploadProgress}%`
                  }}

                />

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* FILE INFO */}
          {/* ================================================= */}

          {file && (

            <div className="
              mt-8
              bg-[var(--card-bg)]
              p-6
              rounded-2xl
            ">

              <h3 className="
                text-xl
                font-bold
                mb-4
              ">

                📁 Selected File

              </h3>

              <div className="
                space-y-2
                text-slate-300
              ">

                <p>

                  <span className="
                    text-slate-400
                  ">

                    File Name:

                  </span>

                  {" "}

                  {file.name}

                </p>

                <p>

                  <span className="
                    text-slate-400
                  ">

                    File Size:

                  </span>

                  {" "}

                  {(file.size / 1024).toFixed(2)} KB

                </p>

                <p>

                  <span className="
                    text-slate-400
                  ">

                    File Type:

                  </span>

                  {" "}

                  {file.type}

                </p>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>

  );

}

export default Upload;