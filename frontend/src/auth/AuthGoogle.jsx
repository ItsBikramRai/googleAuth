import React, { useContext, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextAPI/AuthContext";
import { toast } from "react-toastify";
import { API } from "../../API"; // Import the API helper

export default function AuthGoogle() {
  const navigate = useNavigate();
  const { setAuth, setIsVerified } = useContext(AuthContext);

  // Check the authentication status after redirecting back from Google
  const handleGoogleLogin = async () => {
    try {
      const response = await API.get("/auth/protected", {
        withCredentials: true, // Ensure cookies are included
      });
      console.log(response);
      // console.log("response", response.data);
      if (response?.data?.success) {
        const userData = response?.data;
        localStorage.setItem("auth", JSON.stringify(userData));
        setAuth({
          user: userData?.user?.name,
          data: userData?.user,
        });
        setIsVerified(userData?.user?.isVerified === true);
        toast.success(response?.data?.message);
        navigate("/");
        // window.location.reload();
      } else {
        toast.error(response?.data?.message || "Login failed");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred during login");
      navigate("/login");
    }
  };

  return (
    <Layout>
      <div className="flex flex-wrap justify-center text-center p-5">
        <h2 className="w-full text-2xl font-bold">Google Authentication</h2>
        <div className="w-full pt-5">
          <button
            onClick={handleGoogleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </Layout>
  );
}
