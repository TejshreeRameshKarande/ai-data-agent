import { useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import { getAccentTheme } from "../../utils/theme";
function Login() {

  // =====================================================
  // ACTIVE THEME
  // =====================================================

  const activeAccent =
    getAccentTheme();

  // =====================================================
  // STATES
  // =====================================================

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",

    });

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  // =====================================================
  // HANDLE LOGIN
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // =================================================
      // API REQUEST
      // =================================================

      const response =
        await axios.post(

          "http://127.0.0.1:8000/auth/login",

          formData

        );

      // =================================================
      // SAVE TOKEN
      // =================================================

      localStorage.setItem(

        "token",

        response.data.access_token

      );

      // =================================================
      // CREATE USER DATA
      // =================================================

      const userData = {

        id:
          response.data.user?.id || 1,

        username:
          response.data.user?.username ||

          formData.email.split("@")[0],

        email:
          response.data.user?.email ||

          formData.email,

      };

      // =================================================
      // SAVE USER
      // =================================================

      localStorage.setItem(

        "user",

        JSON.stringify(userData)

      );

      // =================================================
      // DEFAULT SETTINGS
      // =================================================

      const existingSettings =

        localStorage.getItem(
          "settings"
        );

      if (!existingSettings) {

        const defaultSettings = {

          theme: "purple",

          exportFormat: "pdf",

          notifications: true,

          autoDownload: false,

          emailReports: false,

          aiModel: "mixtral",

        };

        localStorage.setItem(

          "settings",

          JSON.stringify(
            defaultSettings
          )

        );

      }

      // =================================================
      // SUCCESS
      // =================================================

      toast.success(
        "Login successful 🚀"
      );

      // =================================================
      // REDIRECT
      // =================================================

      navigate("/");

    }

    catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.detail ||

        "Login failed"

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
      min-h-screen
      bg-[var(--main-bg)]
      flex
      items-center
      justify-center
      p-6
      relative
      overflow-hidden
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
      {/* LOGIN CARD */}
      {/* ================================================= */}

      <div className="
        relative
        z-10
        w-full
        max-w-lg
        bg-[var(--card-bg)]
        border
        border-slate-800
        rounded-3xl
        p-10
        shadow-2xl
      ">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="
          mb-10
          text-center
        ">

          <div className="
            text-7xl
            mb-5
          ">

            🤖

          </div>

          <h1 className={`
            text-5xl
            font-bold
            mb-4
            ${activeAccent.text}
          `}>

            Welcome Back

          </h1>

          <p className="
            text-slate-400
            text-lg
          ">

            Login to AI Data Agent 🚀

          </p>

        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ================================================= */}
          {/* EMAIL */}
          {/* ================================================= */}

          <div>

            <label className="
              block
              text-slate-300
              mb-3
              font-semibold
            ">

              Email

            </label>

            <input

              type="email"

              name="email"

              value={formData.email}

              onChange={handleChange}

              placeholder="Enter email"

              required

              className="
                w-full
                bg-[var(--card-bg)]
                border
                border-slate-700
                focus:border-blue-500
                outline-none
                px-5
                py-4
                rounded-2xl
                text-white
                transition-all
              "
            />

          </div>

          {/* ================================================= */}
          {/* PASSWORD */}
          {/* ================================================= */}

          <div>

            <label className="
              block
              text-slate-300
              mb-3
              font-semibold
            ">

              Password

            </label>

            <input

              type="password"

              name="password"

              value={formData.password}

              onChange={handleChange}

              placeholder="Enter password"

              required

              className="
                w-full
                bg-[var(--card-bg)]
                border
                border-slate-700
                focus:border-blue-500
                outline-none
                px-5
                py-4
                rounded-2xl
                text-white
                transition-all
              "
            />

          </div>

          {/* ================================================= */}
          {/* BUTTON */}
          {/* ================================================= */}

          <button

            type="submit"

            disabled={loading}

            className={`
              w-full
              py-4
              rounded-2xl
              font-bold
              text-lg
              transition-all
              duration-300

              ${
                loading

                  ? `
                    bg-slate-700
                    cursor-not-allowed
                  `

                  : `
                    ${activeAccent.button}
                    hover:scale-[1.02]
                  `
              }
            `}
          >

            {
              loading

                ? "Logging in..."

                : "Login"
            }

          </button>

        </form>

        {/* ================================================= */}
        {/* SIGNUP */}
        {/* ================================================= */}

        <p className="
          text-center
          text-slate-400
          mt-8
        ">

          Don't have account?

          {" "}

          <Link

            to="/signup"

            className={`
              font-semibold
              ${activeAccent.text}
            `}
          >

            Signup

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;