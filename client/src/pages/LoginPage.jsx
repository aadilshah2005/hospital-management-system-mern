import Navbar from "../components/Navbar";
import LoginContent from "../pages/LoginContent";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen h-screen bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute w-62.5 h-62.5 sm:w-87.5 sm:h-87.5 lg:w-125 lg:h-125 bg-[radial-gradient(circle,rgba(0,196,180,0.07),transparent)] -top-20 -left-20 sm:-top-32 sm:-left-32 lg:-top-40 lg:-left-40 rounded-full"></div>

        <div className="absolute w-50 h-50 sm:w-75 sm:h-75 lg:w-100 lg:h-100 bg-[radial-gradient(circle,rgba(79,142,247,0.05),transparent)] -bottom-16 -right-16 sm:-bottom-24 sm:-right-24 lg:-bottom-32 lg:-right-32 rounded-full"></div>

        <div className="w-full h-full relative z-10 mt-15">
          <LoginContent />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
