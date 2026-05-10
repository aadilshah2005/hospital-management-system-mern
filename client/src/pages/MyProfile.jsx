import { GiHospitalCross } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { HiMiniIdentification } from "react-icons/hi2";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function MyProfile() {
  const [user, setUser] = useState("");
  const firstLetter = localStorage.getItem("firstLetter");

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
    <div className="h-screen bg-[#0a0f1e] overflow-y-auto px-3 py-4 sm:px-5 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-[#1e293b] bg-[#0f172a] shadow-[0_0_30px_rgba(0,196,180,0.08)]">
          <div className="relative bg-linear-to-r from-[#00c4b4]/15 to-[#4f8ef7]/10 border-b border-[#1e293b] px-5 sm:px-8 py-6 sm:py-8">
            <div className="absolute w-40 h-40 bg-[#00c4b4]/10 blur-3xl rounded-full -top-10 -left-10"></div>

            <div className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-[#00c4b4] to-[#4f8ef7] flex items-center justify-center text-white text-3xl sm:text-4xl shadow-lg border-4 border-[#0f172a]">
                {firstLetter}
              </div>

              <h1 className="text-white text-[24px] sm:text-[32px] font-bold mt-4">
                {user.name}
              </h1>

              <div className="flex items-center gap-2 mt-2 text-[#00c4b4] text-sm sm:text-base font-medium">
                <FaUserDoctor />
                {user.role}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-4 flex items-start gap-4 hover:border-[#00c4b4]/50 transition">
              <div className="w-11 h-11 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-xl shrink-0">
                <HiMiniIdentification />
              </div>

              <div className="overflow-hidden">
                <p className="text-[#64748b] text-xs sm:text-sm">User ID</p>

                <h2 className="text-white text-sm break-all mt-1">
                  {user._id}
                </h2>
              </div>
            </div>

            <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-4 flex items-start gap-4 hover:border-[#00c4b4]/50 transition">
              <div className="w-11 h-11 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-xl shrink-0">
                <RiAdminFill />
              </div>

              <div>
                <p className="text-[#64748b] text-xs sm:text-sm">Full Name</p>

                <h2 className="text-white text-base sm:text-lg font-medium mt-1">
                  {user.name}
                </h2>
              </div>
            </div>

            <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-4 flex items-start gap-4 hover:border-[#00c4b4]/50 transition">
              <div className="w-11 h-11 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-xl shrink-0">
                <MdEmail />
              </div>

              <div className="overflow-hidden">
                <p className="text-[#64748b] text-xs sm:text-sm">
                  Email Address
                </p>

                <h2 className="text-white text-sm sm:text-base break-all mt-1">
                  {user.email}
                </h2>
              </div>
            </div>

            <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-4 flex items-start gap-4 hover:border-[#00c4b4]/50 transition">
              <div className="w-11 h-11 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-xl shrink-0">
                <FaUserDoctor />
              </div>

              <div>
                <p className="text-[#64748b] text-xs sm:text-sm">Role</p>

                <h2 className="text-white text-base sm:text-lg capitalize mt-1">
                  {user.role}
                </h2>
              </div>
            </div>

            {/* Created At */}
            <div className="bg-[#020617] border border-[#1e293b] rounded-2xl p-4 flex items-start gap-4 hover:border-[#00c4b4]/50 transition md:col-span-2">
              <div className="w-11 h-11 rounded-xl bg-[#00c4b4]/10 text-[#00c4b4] flex items-center justify-center text-xl shrink-0">
                <GiHospitalCross />
              </div>

              <div>
                <p className="text-[#64748b] text-xs sm:text-sm">
                  Account Created
                </p>

                <h2 className="text-white text-sm sm:text-base mt-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </h2>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-5 sm:pb-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 py-3 rounded-xl border border-[#1e293b] bg-[#020617] text-white font-medium flex items-center justify-center gap-2 hover:border-[#00c4b4] hover:text-[#00c4b4] transition"
            >
              <IoArrowBack />
              Back
            </Link>

            <button className="flex-1 py-3 rounded-xl bg-red-500/90 hover:bg-red-500 text-white font-medium flex items-center justify-center gap-2 transition">
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
