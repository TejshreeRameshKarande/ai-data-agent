import { useEffect, useState } from "react";

import { getAccentTheme } from "../utils/theme";

import Sidebar from "../components/Sidebar";

import {
  Send,
  Bot,
  User,
  Sparkles,
  Database,
  MessageSquareMore,
} from "lucide-react";

function ChatAI() {

  const activeAccent =
  getAccentTheme();

  // =====================================================
  // STATES
  // =====================================================

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [datasets, setDatasets] = useState([]);

  const [selectedDataset, setSelectedDataset] =
    useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const [messages, setMessages] = useState([

    {
      role: "ai",

      text:
        "Hello 👋 Ask questions about your uploaded dataset."
    }

  ]);

  // =====================================================
  // LOAD DATASETS
  // =====================================================

  useEffect(() => {

    const currentUser = JSON.parse(
  localStorage.getItem("user")
);

const historyKey =
  `history_${currentUser?.id}`;

const history =
  JSON.parse(
    localStorage.getItem(historyKey)
  ) || [];

    setDatasets(history);

    if (history.length > 0) {

      setSelectedDataset(

        history[history.length - 1]
          .filename

      );

    }

  }, []);

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = async (

    customQuestion = null

  ) => {

    const finalQuestion =

      customQuestion || question;

    if (!finalQuestion.trim()) return;

    if (!selectedDataset) {

      alert(
        "Please select dataset first."
      );

      return;

    }

    const userMessage = {

      role: "user",

      text: finalQuestion

    };

    // =========================================
    // UPDATE CHAT
    // =========================================

    const updatedMessages = [

      ...messages,

      userMessage

    ];

    setMessages(updatedMessages);

    setQuestion("");

    setLoading(true);

    try {

      // =========================================
      // API CALL
      // =========================================

      const response = await fetch(

        "http://127.0.0.1:8000/ask",

        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            question: finalQuestion,

            dataset: selectedDataset,

            history: updatedMessages

          }),

        }

      );

      const data = await response.json();

      // =========================================
      // AI SUGGESTIONS
      // =========================================

      setSuggestions(

        data.suggestions || []

      );

      // =========================================
      // AI MESSAGE
      // =========================================

      const aiMessage = {

        role: "ai",

        text:
          data.answer ||

          "No response from AI."

      };

      setMessages((prev) => [

        ...prev,

        aiMessage

      ]);

    } catch (error) {

      console.error(error);

      const aiMessage = {

        role: "ai",

        text:
          "Backend connection failed."

      };

      setMessages((prev) => [

        ...prev,

        aiMessage

      ]);

    } finally {

      setLoading(false);

    }

  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }

  };

  // =====================================================
  // CLEAR CHAT
  // =====================================================

  const clearChat = () => {

    setMessages([

      {
        role: "ai",

        text:
          "Chat cleared ✅ Ask new questions."
      }

    ]);

    setSuggestions([]);

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
        flex
        flex-col
        p-10
      ">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="
          flex
          justify-between
          items-start
          mb-8
          gap-8
        ">

          <div>

            <h1 className="
              text-5xl
              font-bold
              mb-3
            ">

              🤖 AI Dataset Chat

            </h1>

            <p className="
              text-slate-400
              text-xl
            ">

              Ask intelligent questions about uploaded datasets

            </p>

          </div>

          {/* RIGHT */}

          <div className="
            flex
            flex-col
            gap-4
            items-end
          ">

            {/* AI STATUS */}

            <div className="
              bg-[var(--card-bg)]
              border
              border-slate-800
              px-6
              py-4
              rounded-2xl
              flex
              items-center
              gap-3
            ">

              <Sparkles
                size={22}
                className="text-blue-400"
              />

              <span className="
                text-blue-400
                font-bold
              ">

                AI Active

              </span>

            </div>

            {/* DATASET SELECTOR */}

            <div className="
              bg-[var(--card-bg)]
              border
              border-slate-800
              rounded-2xl
              px-5
              py-4
              flex
              items-center
              gap-3
              min-w-[320px]
            ">

              <Database
                size={22}
                className="text-purple-400"
              />

              <select

                value={selectedDataset}

                onChange={(e) =>

                  setSelectedDataset(
                    e.target.value
                  )

                }

                className="
                  bg-transparent
                  outline-none
                  text-white
                  w-full
                  cursor-pointer
                "
              >

                {datasets.length === 0 ? (

                  <option>
                    No datasets uploaded
                  </option>

                ) : (

                  datasets.map((item, index) => (

                    <option
                      key={index}
                      value={item.filename}
                      className="bg-[var(--card-bg)]"
                    >

                      {item.filename}

                    </option>

                  ))

                )}

              </select>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* ACTIVE DATASET */}
        {/* ================================================= */}

        <div className="
          mb-6
          bg-[var(--card-bg)]
          border
          border-slate-800
          rounded-2xl
          px-6
          py-5
          flex
          items-center
          justify-between
        ">

          <div className="
            flex
            items-center
            gap-4
          ">

            <Database
              className="text-blue-400"
            />

            <div>

              <p className="
                text-slate-400
                text-sm
              ">
                Active Dataset
              </p>

              <h3 className="
                font-bold
                text-lg
              ">

                {
                  selectedDataset ||

                  "No dataset selected"
                }

              </h3>

            </div>

          </div>

          {/* CLEAR CHAT */}

          <button

            onClick={clearChat}

            className="
              bg-red-500/20
              hover:bg-red-500/30
              border
              border-red-500/30
              px-5
              py-3
              rounded-2xl
              transition
            "
          >

            Clear Chat

          </button>

        </div>

        {/* ================================================= */}
        {/* CHAT AREA */}
        {/* ================================================= */}

        <div className="
          flex-1
          bg-[var(--card-bg)]
          border
          border-slate-800
          rounded-3xl
          p-8
          overflow-y-auto
          space-y-8
          mb-6
        ">

          {messages.map((msg, index) => (

            <div
              key={index}

              className={`
                flex
                gap-4

                ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }
              `}
            >

              {/* AI ICON */}

              {msg.role === "ai" && (

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  ${activeAccent.button}
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">

                  <Bot size={22} />

                </div>

              )}

              {/* MESSAGE */}

              <div
                className={`
                  max-w-3xl
                  p-6
                  rounded-3xl
                  leading-relaxed
                  text-lg
                  break-words

                  ${
                    msg.role === "user"

                      ? `
                        ${activeAccent.button}
                        text-white
                        rounded-br-md
                      `

                      : `
bg-opacity-80 bg-[var(--card-bg)]                        border
                        border-slate-700
                        rounded-bl-md
                      `
                  }
                `}
              >

                {msg.text}

              </div>

              {/* USER ICON */}

              {msg.role === "user" && (

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-slate-700
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">

                  <User size={22} />

                </div>

              )}

            </div>

          ))}

          {/* LOADING */}

          {loading && (

            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-12
                h-12
                rounded-2xl
                ${activeAccent.button}
                flex
                items-center
                justify-center
              ">

                <Bot size={22} />

              </div>

              <div className="
bg-opacity-80 bg-[var(--card-bg)]                border
                border-slate-700
                px-6
                py-5
                rounded-3xl
              ">

                Thinking...

              </div>

            </div>

          )}

        </div>

        {/* ================================================= */}
        {/* AI SUGGESTIONS */}
        {/* ================================================= */}

        {suggestions.length > 0 && (

          <div className="mb-6">

            <div className="
              flex
              items-center
              gap-3
              mb-4
            ">

              <MessageSquareMore
                size={22}
                className="text-blue-400"
              />

              <h3 className="
                text-slate-300
                text-lg
                font-bold
              ">

                Suggested Questions

              </h3>

            </div>

            <div className="
              flex
              flex-wrap
              gap-4
            ">

              {suggestions.map(

                (suggestion, index) => (

                  <button
                    key={index}

                    onClick={() =>
                      sendMessage(suggestion)
                    }

                    className="
                      bg-[var(--card-bg)]
                      border
                      border-slate-700
                      hover:border-blue-500
                      hover:${activeAccent.button}/10
                      px-5
                      py-3
                      rounded-2xl
                      transition
                      text-left
                    "
                  >

                    {suggestion}

                  </button>

                )

              )}

            </div>

          </div>

        )}

        {/* ================================================= */}
        {/* INPUT */}
        {/* ================================================= */}

        <div className="
          flex
          gap-4
        ">

          <input
            type="text"

            value={question}

            onChange={(e) =>
              setQuestion(e.target.value)
            }

            onKeyDown={handleKeyDown}

            placeholder="
              Ask AI about your dataset...
            "

            className="
              flex-1
              bg-[var(--card-bg)]
              border
              border-slate-700
              focus:border-blue-500
              rounded-2xl
              px-6
              py-5
              text-lg
              outline-none
              transition
            "
          />

          <button
            onClick={() => sendMessage()}

            disabled={loading}

            className={`
              px-8
              rounded-2xl
              font-bold
              text-lg
              flex
              items-center
              gap-3
              transition

              ${
                loading

                  ? `
                    bg-slate-700
                    cursor-not-allowed
                  `

                  : `
                    ${activeAccent.button}
                    hover:bg-blue-600
                  `
              }
            `}
          >

            <Send size={22} />

            Send

          </button>

        </div>

      </main>

    </div>

  );

}

export default ChatAI;