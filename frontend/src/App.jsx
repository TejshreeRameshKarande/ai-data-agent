import React, {
  useEffect
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =====================================================
// PAGES
// =====================================================

import Dashboard from "./pages/Dashboard";

import Upload from "./pages/Upload";

import Reports from "./pages/Reports";

import Analytics from "./pages/Analytics";

import Settings from "./pages/Settings";

import History from "./pages/History";

import ViewReport from "./pages/ViewReport";

import ChatAI from "./pages/ChatAI";

// =====================================================
// AUTH PAGES
// =====================================================

import Login from "./pages/auth/Login";

import Signup from "./pages/auth/Signup";

// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  if (!token) {

    return <Navigate to="/login" />;

  }

  return children;

}

// =====================================================
// NOT FOUND PAGE
// =====================================================

function NotFound() {

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

        <h1 className="
          text-8xl
          font-bold
          ${activeAccent.text}
          mb-6
        ">

          404

        </h1>

        <h2 className="
          text-4xl
          font-bold
          mb-4
        ">

          Page Not Found

        </h2>

        <p className="
          text-slate-400
          text-xl
        ">

          The page you are looking for does not exist.

        </p>

      </div>

    </div>

  );

}

// =====================================================
// APP
// =====================================================

function App() {

  // ===================================================
  // LOAD THEME
  // ===================================================

  const savedSettings = JSON.parse(

    localStorage.getItem("settings")

  );

  const currentTheme =
    savedSettings?.theme || "dark";

  // ===================================================
  // APPLY THEME TO BODY
  // ===================================================

  useEffect(() => {

    // REMOVE OLD THEMES

    document.body.classList.remove(
      "purple-theme",
      "emerald-theme"
    );

    // APPLY NEW THEME

    if (currentTheme === "purple") {

      document.body.classList.add(
        "purple-theme"
      );

    }

    else if (
      currentTheme === "emerald"
    ) {

      document.body.classList.add(
        "emerald-theme"
      );

    }

  }, [currentTheme]);

  return (

    <div className="
      min-h-screen
      bg-[var(--main-bg)]
      text-white
    ">

      <BrowserRouter>

        <Routes>

          {/* ========================================= */}
          {/* DEFAULT ROUTE */}
          {/* ========================================= */}

          <Route
            path="/"
            element={
              <Navigate to="/dashboard" />
            }
          />

          {/* ========================================= */}
          {/* AUTH ROUTES */}
          {/* ========================================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* ========================================= */}
          {/* DASHBOARD */}
          {/* ========================================= */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>

                <Dashboard />

              </ProtectedRoute>
            }
          />

          {/* ========================================= */}
          {/* UPLOAD */}
          {/* ========================================= */}

          <Route
            path="/upload"
            element={
              <ProtectedRoute>

                <Upload />

              </ProtectedRoute>
            }
          />

          {/* ========================================= */}
          {/* REPORTS */}
          {/* ========================================= */}

          <Route
            path="/reports"
            element={
              <ProtectedRoute>

                <Reports />

              </ProtectedRoute>
            }
          />

          {/* ========================================= */}
          {/* ANALYTICS */}
          {/* ========================================= */}

          <Route
            path="/analytics/:filename"
            element={
              <ProtectedRoute>

                <Analytics />

              </ProtectedRoute>
            }
          />

          {/* ========================================= */}
          {/* VIEW REPORT */}
          {/* ========================================= */}

          <Route
            path="/report/:filename"
            element={
              <ProtectedRoute>

                <ViewReport />

              </ProtectedRoute>
            }
          />

          {/* ========================================= */}
          {/* AI CHAT */}
          {/* ========================================= */}

          <Route
            path="/chat-ai"
            element={
              <ProtectedRoute>

                <ChatAI />

              </ProtectedRoute>
            }
          />

          {/* ========================================= */}
          {/* SETTINGS */}
          {/* ========================================= */}

          <Route
            path="/settings"
            element={
              <ProtectedRoute>

                <Settings />

              </ProtectedRoute>
            }
          />

          {/* ========================================= */}
          {/* HISTORY */}
          {/* ========================================= */}

          <Route
            path="/history"
            element={
              <ProtectedRoute>

                <History />

              </ProtectedRoute>
            }
          />

          {/* ========================================= */}
          {/* 404 */}
          {/* ========================================= */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </BrowserRouter>

    </div>

  );

}

export default App;