import axios from 'axios'
import { toast } from "react-toastify";

export const handleLogout = async (navigate) => {
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
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error("Logout failed");
    }
  };

  