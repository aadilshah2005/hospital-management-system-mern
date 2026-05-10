import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
