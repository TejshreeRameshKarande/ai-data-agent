import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import toast from "react-hot-toast";

import {
  User,
  Mail,
  LogOut,
  Palette,
  ShieldCheck,
} from "lucide-react";

function Settings() {

  // =====================================================
  // NAVIGATE
  // =====================================================

  const navigate =
    useNavigate();

  // =====================================================
  // USER
  // =====================================================

  const currentUser = JSON.parse(

    localStorage.getItem("user")

  );

  // =====================================================
  // STATES
  // =====================================================

  const [theme, setTheme] =
    useState("dark");

  // =====================================================
  // LOAD SETTINGS
  // =====================================================

  useEffect(() => {

    const settings = JSON.parse(

      localStorage.getItem("settings")

    );

    if (settings?.theme) {

      setTheme(settings.theme);

      applyTheme(settings.theme);

    }

  }, []);

  // =====================================================
  // APPLY THEME
  // =====================================================

  const applyTheme = (selectedTheme) => {

    document.body.classList.remove(

      "purple-theme",

      "emerald-theme"

    );

    if (
      selectedTheme === "purple"
    ) {

      document.body.classList.add(
        "purple-theme"
      );

    }

    else if (
      selectedTheme === "emerald"
    ) {

      document.body.classList.add(
        "emerald-theme"
      );

    }

  };

  // =====================================================
  // SAVE THEME
  // =====================================================

  const saveTheme = () => {

    const settings = {

      theme,

    };

    localStorage.setItem(

      "settings",

      JSON.stringify(settings)

    );

    applyTheme(theme);

    toast.success(
      "Theme updated successfully 🚀"
    );

  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success(
      "Logged out successfully 👋"
    );

    navigate("/login");

  };

  // =====================================================
  // THEME BUTTON STYLE
  // =====================================================

  const getThemeButton = (value) => {

    return `
      w-full
      py-4
      rounded-2xl
      font-bold
      text-lg
      transition-all
      duration-300
      border

      ${
        theme === value

          ? `
            border-cyan-400
            bg-cyan-500/20
            text-cyan-300
            scale-[1.02]
          `

          : `
            border-slate-700
            bg-slate-900
            text-slate-300
            hover:border-slate-500
          `
      }
    `;

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
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-12">

          <h1 className="
            text-6xl
            font-bold
            mb-4
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
            bg-clip-text
            text-transparent
          ">

            ⚙ Settings

          </h1>

          <p className="
            text-slate-400
            text-xl
          ">

            Manage your profile and dashboard appearance

          </p>

        </div>

        {/* ================================================= */}
        {/* GRID */}
        {/* ================================================= */}

        <div className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-10
        ">

          {/* ================================================= */}
          {/* PROFILE */}
          {/* ================================================= */}

          <div className="
            bg-[var(--card-bg)]/80
            backdrop-blur-xl
            border
            border-slate-700/50
            rounded-3xl
            p-10
          ">

            <div className="
              flex
              items-center
              gap-4
              mb-8
            ">

              <div className="
                p-4
                rounded-2xl
                bg-cyan-500/20
              ">

                <User size={28} />

              </div>

              <div>

                <h2 className="
                  text-3xl
                  font-bold
                ">

                  Profile

                </h2>

                <p className="
                  text-slate-400
                ">

                  User account information

                </p>

              </div>

            </div>

            {/* USERNAME */}

            <div className="
              mb-8
            ">

              <label className="
                block
                text-slate-400
                mb-3
              ">

                Username

              </label>

              <div className="
                bg-slate-900
                border
                border-slate-700
                rounded-2xl
                px-5
                py-4
                flex
                items-center
                gap-3
              ">

                <User size={20} />

                <span className="
                  text-lg
                ">

                  {
                    currentUser?.username ||
                    "User"
                  }

                </span>

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label className="
                block
                text-slate-400
                mb-3
              ">

                Email

              </label>

              <div className="
                bg-slate-900
                border
                border-slate-700
                rounded-2xl
                px-5
                py-4
                flex
                items-center
                gap-3
              ">

                <Mail size={20} />

                <span className="
                  text-lg
                  break-all
                ">

                  {
                    currentUser?.email ||
                    "No email"
                  }

                </span>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* THEME */}
          {/* ================================================= */}

          <div className="
            bg-[var(--card-bg)]/80
            backdrop-blur-xl
            border
            border-slate-700/50
            rounded-3xl
            p-10
          ">

            <div className="
              flex
              items-center
              gap-4
              mb-8
            ">

              <div className="
                p-4
                rounded-2xl
                bg-purple-500/20
              ">

                <Palette size={28} />

              </div>

              <div>

                <h2 className="
                  text-3xl
                  font-bold
                ">

                  Theme

                </h2>

                <p className="
                  text-slate-400
                ">

                  Customize dashboard appearance

                </p>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="
              space-y-5
            ">

              {/* DARK */}

              <button

                onClick={() =>
                  setTheme("dark")
                }

                className={
                  getThemeButton("dark")
                }
              >

                🌑 Dark Theme

              </button>

              {/* PURPLE */}

              <button

                onClick={() =>
                  setTheme("purple")
                }

                className={
                  getThemeButton("purple")
                }
              >

                🟣 Purple Theme

              </button>

              {/* EMERALD */}

              <button

                onClick={() =>
                  setTheme("emerald")
                }

                className={
                  getThemeButton("emerald")
                }
              >

                🟢 Emerald Theme

              </button>

            </div>

            {/* SAVE */}

            <button

              onClick={saveTheme}

              className="
                mt-8
                w-full
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                hover:scale-[1.02]
                transition-all
                duration-300
                py-4
                rounded-2xl
                font-bold
                text-lg
              "
            >

              Save Theme

            </button>

          </div>

          {/* ================================================= */}
          {/* SECURITY */}
          {/* ================================================= */}

          <div className="
            bg-[var(--card-bg)]/80
            backdrop-blur-xl
            border
            border-slate-700/50
            rounded-3xl
            p-10
            xl:col-span-2
          ">

            <div className="
              flex
              items-center
              gap-4
              mb-8
            ">

              <div className="
                p-4
                rounded-2xl
                bg-red-500/20
              ">

                <ShieldCheck size={28} />

              </div>

              <div>

                <h2 className="
                  text-3xl
                  font-bold
                ">

                  Account Security

                </h2>

                <p className="
                  text-slate-400
                ">

                  Logout from current session

                </p>

              </div>

            </div>

            {/* LOGOUT */}

            <button

              onClick={handleLogout}

              className="
                bg-red-500
                hover:bg-red-600
                transition-all
                duration-300
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                flex
                items-center
                gap-3
              "
            >

              <LogOut size={22} />

              Logout

            </button>

          </div>

        </div>

      </main>

    </div>

  );

}

export default Settings;