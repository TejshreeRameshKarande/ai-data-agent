import { getAccentTheme } from "../utils/theme";

import {

  LayoutDashboard,
  Upload,
  FileText,
  History,
  Settings,
  LogOut,
  MessageSquareText,

} from "lucide-react";

import {

  NavLink,
  useNavigate,

} from "react-router-dom";

import toast from "react-hot-toast";

function Sidebar() {

  // =====================================================
  // ACTIVE ACCENT
  // =====================================================

  const activeAccent =
    getAccentTheme();

  // =====================================================
  // NAVIGATE
  // =====================================================

  const navigate = useNavigate();

  // =====================================================
  // USER
  // =====================================================

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success(
      "Logged out successfully 🚀"
    );

    navigate("/login");

  };

  // =====================================================
  // MENU ITEMS
  // =====================================================

  const menuItems = [

    {
      name: "Dashboard",

      icon: <LayoutDashboard size={22} />,

      path: "/dashboard",
    },

    {
      name: "Upload",

      icon: <Upload size={22} />,

      path: "/upload",
    },

    {
      name: "Reports",

      icon: <FileText size={22} />,

      path: "/reports",
    },

    {
      name: "History",

      icon: <History size={22} />,

      path: "/history",
    },

    {
      name: "Chat AI",

      icon: <MessageSquareText size={22} />,

      path: "/chat-ai",
    },

    {
      name: "Settings",

      icon: <Settings size={22} />,

      path: "/settings",
    },

  ];

  return (

    <aside className="
      w-[290px]
      min-h-screen
      bg-slate-950
      border-r
      border-slate-800
      flex
      flex-col
      justify-between
      p-6
      sticky
      top-0
    ">

      {/* ================================================= */}
      {/* TOP */}
      {/* ================================================= */}

      <div>

        {/* LOGO */}

        <div className="mb-12">

          <h1 className={`
            text-4xl
            font-black
            mb-3
            ${activeAccent.text}
          `}>

            AI Data Agent

          </h1>

          <p className="
            text-slate-400
            text-sm
          ">

            AI Powered Analytics Platform 🚀

          </p>

        </div>

        {/* NAVIGATION */}

        <nav className="space-y-4">

          {menuItems.map((item, index) => (

            <NavLink

              key={index}

              to={item.path}

              className={({ isActive }) => `

                flex
                items-center
                gap-4

                px-5
                py-4

                rounded-2xl

                font-semibold

                transition-all
                duration-300

                ${
                  isActive

                    ? `
                      ${activeAccent.button}
                      text-white
                      shadow-lg
                    `

                    : `
                      text-slate-300
                      bg-slate-900
                      hover:bg-slate-800
                      hover:text-white
                    `
                }
              `}
            >

              {item.icon}

              {item.name}

            </NavLink>

          ))}

        </nav>

      </div>

      {/* ================================================= */}
      {/* BOTTOM */}
      {/* ================================================= */}

      <div>

        {/* USER CARD */}

        <div className={`
          bg-slate-900
          border
          ${activeAccent.border}
          rounded-3xl
          p-5
          mb-5
        `}>

          <div className="
            flex
            items-center
            gap-4
          ">

            {/* USER ICON */}

            <div className={`
              w-14
              h-14
              rounded-full
              ${activeAccent.button}
              flex
              items-center
              justify-center
              text-2xl
              font-bold
            `}>

              {
                user?.name
                  ?.charAt(0)
                  ?.toUpperCase()
              }

            </div>

            {/* USER DETAILS */}

            <div>

              <h2 className="
                text-lg
                font-bold
                text-white
              ">

                {user?.name || "User"}

              </h2>

              <p className="
                text-slate-400
                text-sm
                break-all
              ">

                {user?.email}

              </p>

            </div>

          </div>

        </div>

        {/* LOGOUT BUTTON */}

        <button

          onClick={handleLogout}

          className="
            w-full
            bg-red-500/20
            hover:bg-red-500
            border
            border-red-500/30
            hover:border-red-500
            text-red-400
            hover:text-white
            py-4
            rounded-2xl
            font-bold
            flex
            items-center
            justify-center
            gap-3
            transition-all
            duration-300
          "
        >

          <LogOut size={22} />

          Logout

        </button>

      </div>

    </aside>

  );

}

export default Sidebar;