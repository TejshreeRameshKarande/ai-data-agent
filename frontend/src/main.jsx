import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(

  document.getElementById("root")

).render(

  <React.StrictMode>

    <>

      <App />

      <Toaster

        position="top-right"

        reverseOrder={false}

        gutter={16}

        containerStyle={{

          top: 30,

          right: 30,

        }}

        toastOptions={{

          duration: 4000,

          style: {

            background:
              "rgba(15, 23, 42, 0.95)",

            color: "#ffffff",

            border:
              "1px solid #334155",

            padding: "20px 24px",

            borderRadius: "20px",

            fontSize: "18px",

            fontWeight: "600",

            minWidth: "380px",

            boxShadow:
              "0 10px 40px rgba(0,0,0,0.4)",

            backdropFilter:
              "blur(10px)",

          },

          success: {

            iconTheme: {

              primary: "#22c55e",

              secondary: "#ffffff",

            },

          },

          error: {

            iconTheme: {

              primary: "#ef4444",

              secondary: "#ffffff",

            },

          },

        }}

      />

    </>

  </React.StrictMode>

);