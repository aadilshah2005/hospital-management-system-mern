import axios from "axios";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "dashboard", path: "/dashboard" },
    { name: "doctors", path: "/doctors" },
    { name: "patients", path: "/patients" },
    { name: "appointments", path: "/appointments" },
    { name: "records", path: "/records" },
    { name: "billing", path: "/billing" },
    { name: "pharmacy", path: "/pharmacy" },
    { name: "lab", path: "/lab" },
    { name: "beds", path: "/beds" },
    { name: "notifications", path: "/notifications" },
    { name: "roles", path: "/roles" },
  ];

  const firstLetter = localStorage.getItem("firstLetter");
  console.log("get firstLetter in navbar", firstLetter);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/logout",
        {
          withCredentials: true,
        },
      );
      localStorage.removeItem("firstLetter");
      toast.success(response.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error("Logout failed");
    }
  };

  
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 
      bg-[rgba(10,15,30,0.92)] backdrop-blur-md 
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
          <NavLink
            to="/"
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

          {menuItems.map((item) => (
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

          {firstLetter && (
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
                    onClick={handleLogout}
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
