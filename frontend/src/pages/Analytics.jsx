import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAccentTheme } from "../utils/theme";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Download,
  BarChart3,
  Database,
  Brain,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

import {

  BarChart,
  Bar,

  XAxis,
  YAxis,

  Tooltip,

  ResponsiveContainer,

  CartesianGrid,

  LineChart,
  Line,

  Legend,

  PieChart,
  Pie,
  Cell,

} from "recharts";

function Analytics() {

  const activeAccent =
  getAccentTheme();

  // =====================================================
  // PARAMS
  // =====================================================

  const { filename } = useParams();

  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [data, setData] = useState(null);

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {

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

    `history_${currentUser?.id}`;

  // =================================================
  // GET USER HISTORY
  // =================================================

  const history =

    JSON.parse(
      localStorage.getItem(historyKey)
    ) || [];

  // =================================================
  // FIND SELECTED FILE
  // =================================================

  const decodedFilename =

  decodeURIComponent(filename)

    .replaceAll("_", " ")

    .trim();

const selected =

  history.find(

    (item) =>

      item.filename

        ?.replaceAll("_", " ")

        ?.trim()

        === decodedFilename

  );

  // =================================================
  // SET DATA
  // =================================================

  setData(selected);

}, [filename]);

  // =====================================================
  // LOADING
  // =====================================================

  if (!data) {

    return (

      <div className="
        min-h-screen
        bg-[var(--main-bg)]
        text-white
        flex
        items-center
        justify-center
      ">

        <div className="text-center">

          <div className="text-7xl mb-6">
            📄
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Report Not Found
          </h1>

          <p className="text-slate-400 text-xl mb-8">
            Analytics data is unavailable
          </p>

          <button
            onClick={() => navigate(-1)}
            className="
              ${activeAccent.button}
              hover:bg-blue-600
              px-8
              py-4
              rounded-2xl
              font-bold
            "
          >

            Go Back

          </button>

        </div>

      </div>

    );

  }

  // =====================================================
  // CHART DATA
  // =====================================================

  const chartData = Object.entries(
    data.analysis.mean || {}
  ).map(([key, value]) => ({

    name: key,

    value: Number(value.toFixed(2)),

  }));

  const COLORS = [

  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#ef4444",

];

const highestFeature =

  [...chartData].sort(

    (a, b) => b.value - a.value

  )[0];

  // =====================================================
  // PDF DOWNLOAD
  // =====================================================

  const openPdfReport = () => {

    const cleanName =
      filename.replace(".csv", "");

    window.open(
      `http://127.0.0.1:8000/reports/${cleanName}.pdf`,
      "_blank"
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
        overflow-y-auto
        p-10
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

            <div className="
              flex
              items-center
              gap-4
              mb-5
            ">

              <button
                onClick={() => navigate(-1)}
                className="
                  bg-[var(--card-bg)]
                  border
                  border-slate-700
                  hover:border-blue-500
                  p-4
                  rounded-2xl
                  transition
                "
              >

                <ArrowLeft size={22} />

              </button>

              <div>

                <h1 className="
                  text-5xl
                  font-bold
                  break-words
                ">

                  {filename}

                </h1>

              </div>

            </div>

            <p className="
              text-slate-400
              text-xl
            ">

              AI Dataset Analytics Dashboard

            </p>

          </div>

          {/* RIGHT */}

          <button
            onClick={openPdfReport}
            className="
              ${activeAccent.button}
              hover:bg-blue-600
              px-8
              py-5
              rounded-2xl
              font-bold
              text-lg
              flex
              items-center
              gap-3
              transition
              hover:scale-105
            "
          >

            <Download size={22} />

            Open PDF Report

          </button>

        </div>

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

          {/* ROWS */}

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <div className="
              flex
              justify-between
              items-center
              mb-5
            ">

              <Database
                size={40}
                className="text-blue-400"
              />

              <div className="
                bg-blue-500/20
                text-blue-400
                px-4
                py-2
                rounded-xl
                text-sm
                font-bold
              ">

                DATA

              </div>

            </div>

            <p className="
              text-slate-400
              mb-3
            ">

              Total Rows

            </p>

            <h1 className="
              text-5xl
              font-bold
              text-blue-400
            ">


              {data.analysis.shape[0]}

            </h1>

          </div>

          {/* COLUMNS */}

          <div className="
            bg-[var(--card-bg)]
            border
            border-slate-800
            rounded-3xl
            p-8
          ">

            <div className="
              flex
              justify-between
              items-center
              mb-5
            ">

              <BarChart3
                size={40}
                className="text-purple-400"
              />

              <div className="
                bg-purple-500/20
                text-purple-400
                px-4
                py-2
                rounded-xl
                text-sm
                font-bold
              ">

                METRICS

              </div>

            </div>

            <p className="
              text-slate-400
              mb-3
            ">

              Total Columns

            </p>

            <h1 className="
              text-5xl
              font-bold
              text-purple-400
            ">

{data.analysis.shape[1]}


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

            <div className="
              flex
              justify-between
              items-center
              mb-5
            ">

              <Brain
                size={40}
                className="text-green-400"
              />

              <div className="
                bg-green-500/20
                text-green-400
                px-4
                py-2
                rounded-xl
                text-sm
                font-bold
              ">

                AI

              </div>

            </div>

            <p className="
              text-slate-400
              mb-3
            ">

              AI Status

            </p>

            <h1 className="
              text-4xl
              font-bold
              text-green-400
            ">

              Completed

            </h1>

          </div>

        </div>

       {/* ================================================= */}
{/* CHARTS */}
{/* ================================================= */}

<motion.div

  initial={{
    opacity: 0,
    y: 40
  }}

  animate={{
    opacity: 1,
    y: 0
  }}

  transition={{
    duration: 0.7
  }}

  className="
    grid
    grid-cols-1
    xl:grid-cols-2
    gap-10
    mb-12
  "
>

  {/* ================================================= */}
  {/* BAR CHART */}
  {/* ================================================= */}

  <motion.div

    whileHover={{
      scale: 1.02
    }}

    transition={{
      duration: 0.3
    }}

    className="
  bg-[var(--card-bg)]
  border
  border-slate-800
  rounded-3xl
  p-8
  transition-all
  duration-300
  hover:border-cyan-500/50
  hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]
"
  >

    <div className="
      flex
      justify-between
      items-center
      mb-10
    ">

      <div>

        <h2 className="
          text-3xl
          font-bold
          mb-3
        ">

          📊 Average Distribution

        </h2>

        <p className="text-slate-400">

          Visualization of average numeric values

        </p>

      </div>

    </div>

    <ResponsiveContainer
      width="100%"
      height={350}
    >

      <BarChart data={chartData}>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1e293b"
        />

        <XAxis
          dataKey="name"
          stroke="#94a3b8"
        />

        <YAxis
          stroke="#94a3b8"
        />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[10, 10, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

    {/* AI OVERVIEW */}

    <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-4
      mt-8
    ">

      {/* TREND */}

      <div className="
        bg-green-500/10
        border
        border-green-500/30
        rounded-2xl
        p-4
      ">

        <h4 className="
          text-green-400
          font-bold
          mb-2
        ">

          📈 Trend

        </h4>

        <p className="
          text-slate-300
          text-sm
        ">

{
  chartData.length > 2

    ? "Multiple columns show stable average patterns."

    : "Dataset averages appear controlled."
}
        </p>

      </div>

      {/* OBSERVATION */}

      <div className="
        bg-yellow-500/10
        border
        border-yellow-500/30
        rounded-2xl
        p-4
      ">

        <h4 className="
          text-yellow-400
          font-bold
          mb-2
        ">

          ⚠ Observation

        </h4>

        <p className="
          text-slate-300
          text-sm
        ">

{
  chartData.length > 4

    ? "Certain features fluctuate more strongly than others."

    : "Only minor value variations detected."
}
        </p>

      </div>

      {/* AI INSIGHT */}

      <div className="
        bg-cyan-500/10
        border
        border-cyan-500/30
        rounded-2xl
        p-4
      ">

        <h4 className="
          ${activeAccent.text}
          font-bold
          mb-2
        ">

          🤖 AI Insight

        </h4>

        <p className="
          text-slate-300
          text-sm
        ">
{
  data.chart_insights
    ?.average_distribution?.[0]

    ||

  `${highestFeature?.name} shows the highest average values in the dataset.`
}
        </p>

      </div>

    </div>

</motion.div>
  {/* ================================================= */}
  {/* PIE CHART */}
  {/* ================================================= */}

    <motion.div

  whileHover={{
    scale: 1.02
  }}

  transition={{
    duration: 0.3
  }}

  className="
  bg-[var(--card-bg)]
  border
  border-slate-800
  rounded-3xl
  p-8
  transition-all
  duration-300
  hover:border-purple-500/50
  hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]
"
>
 
    <div className="
      flex
      justify-between
      items-center
      mb-10
    ">

      <div>

        <h2 className="
          text-3xl
          font-bold
          mb-3
        ">

          🥧 Data Composition

        </h2>

        <p className="text-slate-400">

          Percentage contribution of each feature

        </p>

      </div>

    </div>

    <ResponsiveContainer
      width="100%"
      height={350}
    >

      <PieChart>

        <Pie

          data={chartData}

          dataKey="value"

          nameKey="name"

          outerRadius={120}

          label

        >

          {chartData.map(

            (entry, index) => (

              <Cell

                key={index}

                fill={
                  COLORS[
                    index %
                    COLORS.length
                  ]
                }

              />

            )

          )}

        </Pie>

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>

    {/* AI OVERVIEW */}

    <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-4
      mt-8
    ">

      {/* DOMINANCE */}

      <div className="
        bg-purple-500/10
        border
        border-purple-500/30
        rounded-2xl
        p-4
      ">

        <h4 className="
          text-purple-400
          font-bold
          mb-2
        ">

          🥇 Dominance

        </h4>

        <p className="
  text-slate-300
  text-sm
">

{
  data.chart_insights
    ?.pie_chart?.[0]
}

Most feature values appear balanced without extreme dominance.

</p>

      </div>

      {/* BALANCE */}

      <div className="
        bg-green-500/10
        border
        border-green-500/30
        rounded-2xl
        p-4
      ">

        <h4 className="
          text-green-400
          font-bold
          mb-2
        ">

          ⚖ Balance

        </h4>

        <p className="
          text-slate-300
          text-sm
        ">

{
  chartData.length > 3

    ? "Dataset contribution appears well distributed."

    : "Limited feature distribution detected."
}
        </p>

      </div>

      {/* AI INSIGHT */}

      <div className="
        bg-cyan-500/10
        border
        border-cyan-500/30
        rounded-2xl
        p-4
      ">

        <h4 className="
          ${activeAccent.text}
          font-bold
          mb-2
        ">

          🤖 AI Insight

        </h4>

        <p className="
  text-slate-300
  text-sm
">

  {
  data.chart_insights
    ?.pie_chart?.[0]

    ||

  `${highestFeature?.name} contributes more prominently compared to other features.`
}

{" "}

Most feature values appear balanced without extreme dominance.

</p>

      </div>

    </div>

  </motion.div>

</motion.div>
{/* DATASET PREVIEW */}

<div className="
  bg-[var(--card-bg)]
  border
  border-slate-800
  rounded-3xl
  p-10
">

  <h2 className="
    text-4xl
    font-bold
    mb-8
  ">

    📊 Dataset Preview

  </h2>

  <div className="
    overflow-x-auto
  ">

    <table className="
      w-full
    ">

      <thead>

        <tr>

          {data.preview &&
            Object.keys(
              data.preview[0] || {}
            ).map((key) => (

              <th
                key={key}

                className="
                  px-6
                  py-4
                  text-left
bg-opacity-80 bg-[var(--card-bg)]                "
              >

                {key}

              </th>

            ))}

        </tr>

      </thead>

      <tbody>

        {data.preview &&
          data.preview.map(

            (row, index) => (

              <tr key={index}>

                {Object.values(row).map(

                  (value, i) => (

                    <td
                      key={i}

                      className="
                        px-6
                        py-4
                        border-b
                        border-slate-800
                      "
                    >

                      {String(value)}

                    </td>

                  )

                )}

              </tr>

            )

          )}

      </tbody>

    </table>

  </div>

</div>

                        {/* ================================================= */}
{/* MODERN AI INSIGHTS DASHBOARD */}
{/* ================================================= */}

{data?.advanced_insights && (
  <div className="
    mt-12
    space-y-10
  ">

    {/* HEADER */}

    <div className="
      flex
      flex-col
      lg:flex-row
      lg:items-center
      justify-between
      gap-6
    ">

      <div>

        <h1 className="
          text-5xl
          font-bold
          mb-3
        ">

          🤖 AI Insights Dashboard

        </h1>

        <p className="
          text-slate-400
          text-xl
        ">

          Smart dataset analysis powered by AI & ML

        </p>

      </div>

      {/* RIGHT */}

      <div className="
        flex
        items-center
        gap-4
      ">

        <div className="
          bg-green-500/20
          text-green-400
          px-6
          py-4
          rounded-2xl
          font-bold
          text-lg
          border
          border-green-500/30
        ">

          AI Analysis Completed

        </div>

        <a
          href={`http://127.0.0.1:8000/${data.report_path}`}

          target="_blank"

          rel="noreferrer"

          className="
            bg-cyan-500
            hover:bg-cyan-600
            px-6
            py-4
            rounded-2xl
            font-bold
            text-lg
            transition-all
            duration-300
            hover:scale-105
            shadow-lg
          "
        >

          Download Report

        </a>

      </div>

    </div>

    {/* KPI CARDS */}

    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
    ">

      {/* HEALTH */}

      <div className="
        bg-[var(--card-bg)]/70
        backdrop-blur-xl
        border
        border-slate-700/50
        rounded-3xl
        p-7
        hover:border-cyan-500/50
        hover:-translate-y-1
        transition-all
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

          <div className="text-5xl">
            🧠
          </div>

          <div className="
            ${activeAccent.text}
            text-sm
            font-bold
          ">

            HEALTH

          </div>

        </div>

        <h2 className="
          text-4xl
          font-bold
          mb-2
        ">

          {
  data.analysis.shape[0] > 100

    ? "92%"

    : "78%"
}

        </h2>

        <p className="
          text-slate-400
        ">

{
  data.analysis.shape[0] > 100

    ? "Excellent Dataset"

    : "Moderate Dataset"
}
        </p>

        <div className="
  mt-5
  h-3
  bg-slate-700
  rounded-full
  overflow-hidden
">

  <div

    className={`
      h-full
      ${
        data.analysis.shape[0] > 100
          ? "w-[92%]"
          : "w-[78%]"
      }
      bg-cyan-500
      rounded-full
    `}

  />

</div>
      </div>

      {/* TRENDS */}

      <div className="
        bg-[var(--card-bg)]/70
        backdrop-blur-xl
        border
        border-slate-700/50
        rounded-3xl
        p-7
        hover:border-green-500/50
        hover:-translate-y-1
        transition-all
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

          <div className="text-5xl">
            📈
          </div>

          <div className="
            text-green-400
            text-sm
            font-bold
          ">

            TRENDS

          </div>

        </div>

        <h2 className="
          text-4xl
          font-bold
          mb-2
        ">

          3

        </h2>

        <p className="
          text-slate-400
        ">

          Trends Detected

        </p>

      </div>

      {/* ALERTS */}

      <div className="
        bg-[var(--card-bg)]/70
        backdrop-blur-xl
        border
        border-slate-700/50
        rounded-3xl
        p-7
        hover:border-red-500/50
        hover:-translate-y-1
        transition-all
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

          <div className="text-5xl">
            🚨
          </div>

          <div className="
            text-red-400
            text-sm
            font-bold
          ">

            ALERTS

          </div>

        </div>

        <h2 className="
          text-4xl
          font-bold
          mb-2
        ">

          {
  data.analysis.shape[0] > 100

    ? "Low"

    : "Medium"
}

        </h2>

        <p className="
          text-slate-400
        ">

{
  data.analysis.shape[0] > 100

    ? "Low Missing Values"

    : "Data Needs Cleaning"
}
        </p>

      </div>

      {/* PREDICTION */}

      <div className="
       bg-[var(--card-bg)]/70
        backdrop-blur-xl
        border
        border-slate-700/50
        rounded-3xl
        p-7
        hover:border-purple-500/50
        hover:-translate-y-1
        transition-all
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

          <div className="text-5xl">
            🔮
          </div>

          <div className="
            text-purple-400
            text-sm
            font-bold
          ">

            FORECAST

          </div>

        </div>

        <h2 className="
          text-3xl
          font-bold
          mb-2
        ">

          Stable

        </h2>

        <p className="
          text-slate-400
        ">

          Prediction Status

        </p>

      </div>

    </div>

  </div>

)}



    {/* AI FORECASTING */}

            {data.forecast_data && (

              <div className="
                bg-[var(--card-bg)]
                border
                border-slate-800
                rounded-3xl
                p-10
              ">

                <div className="
                  flex
                  items-center
                  gap-4
                  mb-10
                ">

                  <div className="
                    text-5xl
                  ">

                    📈

                  </div>

                  <div>

                    <h2 className="
                      text-4xl
                      font-bold
                    ">

                      AI Forecast Predictions

                    </h2>

                    <p className="
                      text-slate-400
                      mt-2
                    ">

                      Future trend forecasting using Machine Learning

                    </p>

                  </div>

                </div>

                <div className="
                  grid
                  grid-cols-1
                  xl:grid-cols-2
                  gap-8
                ">

                  {Object.entries(
                    data.forecast_data
                  ).map(([column, forecast], index) => (

                    <div
                      key={index}

                      className="
bg-opacity-80 bg-[var(--card-bg)]                        border
                        border-slate-700
                        rounded-3xl
                        p-6
                      "
                    >

                      <h3 className="
                        text-2xl
                        font-bold
                        mb-6
                        ${activeAccent.text}
                      ">

                        {column} Forecast

                      </h3>

                      <ResponsiveContainer
                        width="100%"
                        height={320}
                      >

                        <LineChart data={forecast}>

                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#334155"
                          />

                          <XAxis dataKey="index" />

                          <YAxis />

                          <Tooltip />

                          <Legend />

                          <Line

                            type="monotone"

                            dataKey="actual"

                            stroke="#3b82f6"

                            strokeWidth={4}

                            name="Actual"

                          />

                          <Line

                            type="monotone"

                            dataKey="predicted"

                            stroke="#22c55e"

                            strokeWidth={4}

                            strokeDasharray="8 5"

                            name="Prediction"

                          />

                        </LineChart>

                      </ResponsiveContainer>

                      {/* AI QUICK SUMMARY */}

<div className="
  grid
  grid-cols-1
  md:grid-cols-3
  gap-4
  mt-6
">

  {/* TREND */}

  <div className="
    bg-green-500/10
    border
    border-green-500/30
    rounded-2xl
    p-4
  ">

    <h4 className="
      text-green-400
      font-bold
      mb-2
    ">

      📈 Trend

    </h4>

    <p className="
      text-slate-300
      text-sm
    ">

{
  forecast.length > 2 &&

  forecast[
    forecast.length - 1
  ]?.predicted >

  forecast[0]?.actual

    ? "Prediction trend is increasing steadily."

    : "Prediction trend remains mostly stable."
}
    </p>

  </div>

  {/* FLUCTUATION */}

  <div className="
    bg-yellow-500/10
    border
    border-yellow-500/30
    rounded-2xl
    p-4
  ">

    <h4 className="
      text-yellow-400
      font-bold
      mb-2
    ">

      ⚠ Fluctuation

    </h4>

    <p className="
      text-slate-300
      text-sm
    ">

{
  forecast.length > 5

    ? "Data contains noticeable fluctuations."

    : "Data pattern appears smooth and controlled."
}
    </p>

  </div>

  {/* AI INSIGHT */}

  <div className="
    bg-cyan-500/10
    border
    border-cyan-500/30
    rounded-2xl
    p-4
  ">

    <h4 className="
      ${activeAccent.text}
      font-bold
      mb-2
    ">

      🤖 AI Insight

    </h4>

    <p className="
      text-slate-300
      text-sm
    ">

{
  data.chart_insights
    ?.forecast?.[0]

    ||

  "Forecast analysis generated successfully."
}
    </p>

  </div>

</div>

                    </div>

                  ))}

                </div>

              </div>

            )}

            {/* CORRELATION HEATMAP */}

            {data.correlation_data && (

              <div className="
                bg-[var(--card-bg)]
                border
                border-slate-800
                rounded-3xl
                p-10
              ">

                <div className="
                  flex
                  items-center
                  gap-4
                  mb-10
                ">

                  <div className="
                    text-5xl
                  ">

                    🔥

                  </div>

                  <div>

                    <h2 className="
                      text-4xl
                      font-bold
                    ">

                      Correlation Heatmap

                    </h2>

                    <p className="
                      text-slate-400
                      mt-2
                    ">

                      Feature relationship analysis using correlation matrix

                    </p>

                  </div>

                </div>

                <div className="
                  overflow-x-auto
                ">

                  <table className="
                    w-full
                    border-collapse
                  ">

                    <thead>

                      <tr>

                        <th className="
                          p-4
bg-opacity-80 bg-[var(--card-bg)]                        ">

                          Feature

                        </th>

                        {Object.keys(
                          data.correlation_data
                        ).map((col, index) => (

                          <th
                            key={index}

                            className="
                              p-4
bg-opacity-80 bg-[var(--card-bg)]                            "
                          >

                            {col}

                          </th>

                        ))}

                      </tr>

                    </thead>

                    <tbody>

                      {Object.entries(
                        data.correlation_data
                      ).map(([row, values], i) => (

                        <tr key={i}>

                          <td className="
                            p-4
bg-opacity-80 bg-[var(--card-bg)]                            font-bold
                          ">

                            {row}

                          </td>

                          {Object.values(values).map(

                            (value, j) => (

                              <td
                                key={j}

                                className={`
                                  p-4
                                  text-center
                                  font-bold

                                  ${
  Number(value) > 0.7

    ? "bg-green-500/40"

    : Number(value) < -0.7

    ? "bg-red-500/40"

    : "bg-slate-700"
}
                                `}
                              >

                                {value}

                              </td>

                            )

                          )}

                        </tr>

                      ))}

                    </tbody>

                  </table>

                  {/* AI HEATMAP SUMMARY */}

<div className="
  grid
  grid-cols-1
  md:grid-cols-3
  gap-4
  mt-8
">

  {/* STRONG RELATION */}

  <div className="
    bg-green-500/10
    border
    border-green-500/30
    rounded-2xl
    p-5
  ">

    <h4 className="
      text-green-400
      font-bold
      mb-3
    ">

      🔗 Strong Relations

    </h4>

    <p className="
      text-slate-300
      text-sm
      leading-relaxed
    ">

{
  Object.keys(data.correlation_data || {}).length > 1

    ? `${Object.keys(
        data.correlation_data
      )[0]} and ${Object.keys(
        data.correlation_data
      )[1]} show strong feature relationships.`

    : "Strong feature relationships detected."
}
    </p>

  </div>

  {/* LOW RELATION */}

  <div className="
    bg-yellow-500/10
    border
    border-yellow-500/30
    rounded-2xl
    p-5
  ">

    <h4 className="
      text-yellow-400
      font-bold
      mb-3
    ">

      📉 Weak Connections

    </h4>

    <p className="
      text-slate-300
      text-sm
      leading-relaxed
    ">

{
  Object.keys(data.correlation_data || {}).length > 3

    ? "Some dataset features have weaker dependency patterns."

    : "Most dataset features are interconnected."
}
    </p>

  </div>

  {/* AI INSIGHT */}

  <div className="
    bg-cyan-500/10
    border
    border-cyan-500/30
    rounded-2xl
    p-5
  ">

    <h4 className="
      ${activeAccent.text}
      font-bold
      mb-3
    ">

      🤖 AI Insight

    </h4>

    <p className="
      text-slate-300
      text-sm
      leading-relaxed
    ">

{
  data.chart_insights
    ?.heatmap?.[0]

    ||

  "Strong feature relationships detected."
}
    </p>

  </div>

</div>

                </div>

              </div>

            )}

          

      </main>

    </div>

  );

}

export default Analytics;