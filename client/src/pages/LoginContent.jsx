import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHospitalCross } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const LoginContent = () => {
  const [role, setRole] = useState("patient");
  // console.log("User role is", role);
  const roles = ["admin", "doctor", "patient"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  console.log(userName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          rememberMe,
          role,
        },
        { withCredentials: true },
      );

      const user = responseData.data.user;

      setUserName(user.name);

      const firstLetter = user.name.slice(0, 1).toUpperCase();
      console.log("firstLetter", firstLetter);

      localStorage.setItem("firstLetter", firstLetter);
      localStorage.setItem("role", user.role);

      toast.success(`Hello ${user.name}, login successful!`);

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "doctor") {
          navigate("/doctor/dashboard");
        } else if (user.role === "patient") {
          navigate("/");
        } else {
          navigate("/");
        }
      }, 500);

      setEmail("");
      setPassword("");
      setRememberMe(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      // console.log(error.response?.data); // this is for checking after cheking i will remove it
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center relative z-10 px-4 sm:px-6 lg:px-10 py-10">
        <div className="w-full max-w-lg lg:max-w-xl text-center lg:text-left flex flex-col justify-center">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-lg bg-linear-to-br from-[#00c4b4] to-[#4f8ef7] shadow-lg">
              <GiHospitalCross />
            </div>

            <span className="text-[26px] lg:text-[32px] font-extrabold tracking-wide bg-linear-to-br from-[#00c4b4] to-[#4f8ef7] bg-clip-text text-transparent">
              MediCore
            </span>
          </div>

          <h1 className="text-[42px] lg:text-[56px] leading-[1.05] font-extrabold text-white mb-5">
            Hospital
            <br />
            Management
            <br />
            System
          </h1>

          <p className="text-[#8fa3bf] text-[16px] lg:text-[18px] leading-8 mb-8 max-w-lg">
            A unified platform for admins, doctors, and patients — managing
            appointments, records, billing, and more.
          </p>

          <div className="flex flex-col gap-4 text-[15px] text-[#8fa3bf]">
            {[
              "Role-based access control",
              "End-to-end patient lifecycle",
              "Integrated billing & pharmacy",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center lg:justify-start gap-3"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-md bg-[#00c4b4]/10 text-[#00c4b4] text-xs">
                  ✓
                </span>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-5 sm:p-6 lg:p-7 rounded-2xl bg-[#0f172a] border border-[#1e293b] shadow-[0_0_30px_rgba(0,196,180,0.08)]">
            <h2 className="text-[20px] sm:text-[22px] lg:text-[25px] font-semibold mb-1 text-white">
              Welcome back
            </h2>

            <p className="text-[#8fa3bf] text-[12px] mb-5">
              Sign in to your account
            </p>

            <div className="flex gap-1 bg-[#020617] p-1 rounded-xl mb-5 text-[13px]">
              {roles.map((item) => (
                <div
                  key={item}
                  onClick={() => setRole(item)}
                  className={`flex-1 text-center py-2 rounded-lg font-semibold cursor-pointer capitalize transition ${
                    role === item ? "bg-[#00c4b4] text-black" : "text-[#8fa3bf]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-[11px] text-[#8fa3bf] uppercase tracking-wide">
                Email Address
              </label>

              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="admin@medicore.health"
                className="w-full mt-2 px-4 py-2.5 rounded-lg bg-[#020617] border border-[#1e293b] text-sm text-white outline-none focus:border-[#00c4b4]"
              />
            </div>

            <div className="mb-4">
              <label className="text-[11px] text-[#8fa3bf] uppercase tracking-wide">
                Password
              </label>

              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="••••••••"
                className="w-full mt-2 px-4 py-2.5 rounded-lg bg-[#020617] border border-[#1e293b] text-sm text-white outline-none focus:border-[#00c4b4]"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-5 text-[12px]">
              <label className="flex items-center gap-2 text-[#8fa3bf]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                  }}
                  className="accent-[#00c4b4]"
                />
                Remember me
              </label>

              <a href="#" className="text-[#00c4b4] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-lg border border-[#1e293b] bg-[#020617] text-white text-sm font-medium flex items-center justify-center gap-3 hover:border-[#00c4b4] transition mb-4"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#1e293b]" />
              <span className="text-[#64748b] text-xs">OR</span>
              <div className="flex-1 h-px bg-[#1e293b]" />
            </div>

            <button className="w-full py-2.5 rounded-lg bg-linear-to-br from-[#00c4b4] to-[#1dd4bf] text-black font-semibold hover:opacity-90 transition">
              Sign In →
            </button>

            <p className="text-center text-[11px] text-[#64748b] mt-5">
              Protected by JWT authentication + 2FA
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginContent;
