import { GiHospitalCross } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { HiMiniIdentification } from "react-icons/hi2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { handleLogout } from "../utils/logout.js";
import DoctorHeader from "../components/doctor/DoctorHeader.jsx";
import AdminHeader from "../components/admin/AdminHeader.jsx";
import axios from "axios";
function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const firstLetter = localStorage.getItem("firstLetter");
  const role = localStorage.getItem("role");

  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });
      console.log("profile Data", response.data.userData);
      setUser(response.data.userData);
    } catch (error) {
      console.log(error.message);
    }
  };

  getProfile();

  return (
    <>
      {role === "admin" ? (
        <AdminHeader />
      ) : role === "doctor" ? (
        <DoctorHeader />
      ) : (
        <Navbar />
      )}

      <div className="h-[calc(100vh-64px)] bg-[#0a0f1e] overflow-hidden px-3 sm:px-5 py-3 flex items-center">
        <div className="w-full max-w-4xl mx-auto">
          <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] shadow-[0_0_30px_rgba(0,196,180,0.08)] overflow-hidden flex flex-col">
            <div className="relative border-b border-[#1e293b] bg-linear-to-r from-[#00c4b4]/15 to-[#4f8ef7]/10 px-5 sm:px-8 py-4">
              <div className="absolute w-40 h-40 bg-[#00c4b4]/10 blur-3xl rounded-full -top-10 -left-10"></div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-r from-[#00c4b4] to-[#4f8ef7] flex items-center justify-center text-white text-2xl sm:text-3xl font-bold border-4 border-[#0f172a] shadow-lg">
                  {firstLetter}
                </div>

                <h1 className="text-white text-xl sm:text-2xl font-bold mt-3">
                  {user.name}
                </h1>

                <div className="flex items-center gap-2 mt-1 text-[#00c4b4] text-sm sm:text-base capitalize">
                  <FaUserDoctor />
                  {user.role}
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-3 flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-lg shrink-0">
                    <HiMiniIdentification />
                  </div>

                  <div className="overflow-hidden">
                    <p className="text-[#64748b] text-xs">User ID</p>

                    <h2 className="text-white text-xs sm:text-sm break-all mt-1">
                      {user._id}
                    </h2>
                  </div>
                </div>

                <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-3 flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-lg shrink-0">
                    <RiAdminFill />
                  </div>

                  <div>
                    <p className="text-[#64748b] text-xs">Full Name</p>

                    <h2 className="text-white text-sm sm:text-base font-medium mt-1">
                      {user.name}
                    </h2>
                  </div>
                </div>

                <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-3 flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-lg shrink-0">
                    <MdEmail />
                  </div>

                  <div className="overflow-hidden">
                    <p className="text-[#64748b] text-xs">Email Address</p>

                    <h2 className="text-white text-xs sm:text-sm break-all mt-1">
                      {user.email}
                    </h2>
                  </div>
                </div>

                <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-3 flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-lg shrink-0">
                    <FaUserDoctor />
                  </div>

                  <div>
                    <p className="text-[#64748b] text-xs">Role</p>

                    <h2 className="text-white text-sm sm:text-base capitalize mt-1">
                      {user.role}
                    </h2>
                  </div>
                </div>

                <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-3 flex gap-3 md:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-lg shrink-0">
                    <GiHospitalCross />
                  </div>

                  <div>
                    <p className="text-[#64748b] text-xs">Account Created</p>

                    <h2 className="text-white text-sm mt-1">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={
                    role === "admin"
                      ? "/admin/dashboard"
                      : role === "doctor"
                        ? "/doctor/dashboard"
                        : "/"
                  }
                  className="flex-1 py-2.5 rounded-xl border border-[#1e293b] bg-[#020617] text-white font-medium flex items-center justify-center gap-2 hover:border-[#00c4b4] hover:text-[#00c4b4] transition"
                >
                  <IoArrowBack />
                  Back
                </Link>

                <button
                  onClick={() => {
                    handleLogout(navigate);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/90 hover:bg-red-500 text-white font-medium flex items-center justify-center gap-2 transition"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
