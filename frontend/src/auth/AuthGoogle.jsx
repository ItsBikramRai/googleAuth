import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextAPI/AuthContext";
import { toast } from "react-toastify";
import { API } from "../../API"; // Import the API helper

export default function AuthGoogle() {
  const navigate = useNavigate();
  const { setAuth, setIsVerified } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false); // Prevent duplicate processing

  const handleGoogleLogin = async () => {
    if (isProcessing) return; // Prevent multiple calls
    setIsProcessing(true); // Set processing state to true

    try {
      const response = await API.get("/auth/protected", {
        withCredentials: true, // Ensure cookies are included
      });

      if (response?.data?.success) {
        const userData = response?.data;
        if (!localStorage.getItem("auth")) {
          // Avoid duplicate toast by checking if user data is already set
          localStorage.setItem("auth", JSON.stringify(userData));
          setAuth({
            user: userData?.user?.name,
            data: userData?.user,
          });
          setIsVerified(userData?.user?.isVerified === true);
          toast.success(response?.data?.message);
        }
        navigate("/"); // Redirect to home page
      } else {
        toast.error(response?.data?.message || "Login failed");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during Google login:", error.message);
      toast.error(error?.message || "An error occurred during login");
      navigate("/login");
    } finally {
      setIsProcessing(false); // Reset processing state
    }
  };

  useEffect(() => {
    handleGoogleLogin();
  }, []); 

  return (
    <Layout>
      <div className="flex flex-wrap justify-center text-center p-5">
        <h2 className="w-full text-2xl font-bold">Google Authentication</h2>
        <div className="w-full pt-5">
          <p className="text-lg">{isProcessing ? "Authenticating..." : "Please wait"}</p>
        </div>
      </div>
    </Layout>
  );
}
