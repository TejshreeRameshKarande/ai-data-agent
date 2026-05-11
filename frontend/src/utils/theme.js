export const getAccentTheme = () => {

  const savedSettings = JSON.parse(

    localStorage.getItem("settings")

  );

  const accent =
    savedSettings?.accentColor || "cyan";

  const themes = {

    cyan: {

      button:
        "bg-cyan-500 hover:bg-cyan-600",

      border:
        "${activeAccent.border}",

      text:
        "${activeAccent.text}",

    },

    purple: {

      button:
        "bg-purple-500 hover:bg-purple-600",

      border:
        "border-purple-500",

      text:
        "text-purple-400",

    },

    emerald: {

      button:
        "bg-emerald-500 hover:bg-emerald-600",

      border:
        "border-emerald-500",

      text:
        "text-emerald-400",

    },

  };

  return themes[accent];

};