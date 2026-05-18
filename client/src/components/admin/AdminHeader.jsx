import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/logout";

function AdminHeader() {
  const navigate = useNavigate();
  const firstLetter = localStorage.getItem("firstLetter");
  console.log("get firstLetter in navbar", firstLetter);
  const role = localStorage.getItem("role");
  console.log("role:", role);

  return (
    <header className="h-16 bg-[#111827] border-b border-gray-800 flex items-center justify-between px-3 md:px-6 gap-3">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-white">
          <Menu size={24} />
        </button>
        <Link to="/admin/dashboard">
          <h1 className="text-lg md:text-2xl font-bold text-white truncate">
            Dashboard
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        <div className="hidden sm:flex items-center bg-[#1F2937] px-3 md:px-4 py-2 rounded-xl w-35 sm:w-50 md:w-70 border border-gray-700">
          <Search size={16} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none px-2 text-xs md:text-sm w-full text-white placeholder:text-gray-400"
          />
        </div>

        <button className="relative">
          <Bell size={20} className="text-gray-300" />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
        </button>

        {role === "admin" && (
          <div className="relative group inline-block">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold border-2 border-cyan-400">
                {firstLetter}
              </div>

              <div className="hidden lg:block">
                <h3 className="text-sm font-semibold text-white">Admin</h3>
              </div>

              <ChevronDown
                size={16}
                className="hidden sm:block text-gray-400"
              />
            </div>

            <div className="absolute right-0 top-full pt-2 hidden group-hover:block">
              <div className="bg-white shadow-lg rounded-md w-40 overflow-hidden">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  My Profile
                </Link>

                <button
                  onClick={() => handleLogout(navigate)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;
