import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/logout.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "home", path: "/" },

    { name: "doctors", path: "/doctors" },

    { name: "appointments", path: "/appointments" },

    { name: "medical history", path: "/medical-history" },

    { name: "prescriptions", path: "/prescriptions" },

    { name: "lab reports", path: "/lab-reports" },

    { name: "billing", path: "/billing" },

    { name: "notifications", path: "/notifications" },
  ];

  const firstLetter = localStorage.getItem("firstLetter");
  console.log("get firstLetter in navbar", firstLetter);
  const role = localStorage.getItem("role");
  console.log("role:", role);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 
      bg-gray-900 backdrop-blur-md 
      border-b border-[#1f2a3a] px-3 sm:px-4 lg:px-6 py-2"
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[12px] sm:text-[13px] lg:text-[14px] font-extrabold 
          bg-linear-to-r from-teal-400 to-blue-500 
          bg-clip-text text-transparent"
        >
          🏥 MediCore HMS
        </span>
        <div className="hidden lg:flex gap-2 items-center">
          {!firstLetter && (
            <>
              <NavLink
                to="/"
                className="px-3 py-1 text-[11px] font-semibold rounded-md border text-gray-400 border-[#1f2a3a]"
              >
                Home
              </NavLink>

              <NavLink
                to="/doctors"
                className="px-3 py-1 text-[11px] font-semibold rounded-md border text-gray-400 border-[#1f2a3a]"
              >
                Doctors
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-1 text-[11px] font-semibold rounded-md border transition whitespace-nowrap
          ${
            isActive
              ? "bg-teal-500/10 text-teal-400 border-teal-400/30"
              : "text-gray-400 border-[#1f2a3a] hover:text-teal-400 hover:border-teal-400/30"
          }`
                }
              >
                Login
              </NavLink>
            </>
          )}

          {firstLetter &&
            role === "patient" &&
            menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1 text-[11px] font-semibold rounded-md border transition capitalize whitespace-nowrap
                ${
                  isActive
                    ? "bg-teal-500/10 text-teal-400 border-teal-400/30"
                    : "text-gray-400 border-[#1f2a3a] hover:text-teal-400 hover:border-teal-400/30"
                }`
                }
              >
                {item.name}
              </NavLink>
            ))}

          {firstLetter && role === "patient" && (
            <div className="relative group inline-block">
              <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center cursor-pointer">
                {firstLetter}
              </div>

              <div className="absolute right-0 top-full pt-2 hidden group-hover:block">
                <div className="bg-white shadow-lg rounded-md w-32 overflow-hidden">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout(navigate);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white text-xl"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div
          className="lg:hidden mt-3 flex flex-col gap-2 
        max-h-[70vh] overflow-y-auto pr-1"
        >
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="px-3 py-2 text-sm rounded-md border text-gray-300"
          >
            Login
          </NavLink>

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 text-sm rounded-md border text-gray-300 capitalize"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
