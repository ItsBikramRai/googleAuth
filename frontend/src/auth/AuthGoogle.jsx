import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextAPI/AuthContext";
import { toast } from "react-toastify";
import { API } from "../../API"; // Import the API helper

export default function AuthGoogle() {
  const navigate = useNavigate();
  const { setAuth, setIsVerified } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to handle Google authentication
  const handleGoogleLogin = async () => {
    try {
      // Start the processing state
      setIsProcessing(true);

      // Call the protected route to verify user
      const response = await API.get("/api/v1/auth/protected");

      if (response?.data?.success) {
        const userData = response.data;

        // Store user data in local storage and update context
        localStorage.setItem("auth", JSON.stringify(userData));
        setAuth({
          user: userData?.user?.name,
          data: userData?.user,
        });
        setIsVerified(userData?.user?.isVerified === true);

        toast.success(response?.data?.message || "Logged in successfully");
        navigate("/"); // Redirect to the home page
      } else {
        toast.error(response?.data?.message || "Authentication failed");
        navigate("/login");
      }
    } catch (error) {
      // Handle errors
      const errorMessage =
        error?.response?.data?.message || "An error occurred during login";
      toast.error(errorMessage);
      navigate("/login");
    } finally {
      // Reset the processing state
      setIsProcessing(false);
    }
  };

  // Call the login handler once the component mounts
  useEffect(() => {
    handleGoogleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap justify-center text-center p-5">
        <h2 className="w-full text-2xl font-bold">Google Authentication</h2>
        <div className="w-full pt-5">
          <p className="text-lg">
            {isProcessing ? "Authenticating..." : "Please wait"}
          </p>
        </div>
      </div>
    </Layout>
  );
}
