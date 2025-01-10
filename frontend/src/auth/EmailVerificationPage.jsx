import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../API";
export default function EmailVerificationPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!/^\d{6}$/.test(code)) {
        setError("Code must be exactly 6 digits!");

        return;
      }

      const response = await API.post("auth/verify-email", { code });
      //  console.log(response)
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setCode("");
        setError("");
        navigate("/");
      } else {
        toast.error(response?.data?.message);
        setCode("");
        setError("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  
  // handleChange
  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow digits and prevent exceeding 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setCode(Number(value));
    }
  };

  return (
    <Layout>
      <div className="flex flex-wrap items-center text-center justify-center h-screen">
        <form
          onSubmit={onSubmitHandler}
          className="flex items-center justify-center flex-col mt-5 bg-slate-400 pb-5 w-1/3  rounded-lg"
        >
          <h1 className="pt-4 text-2xl font-semibold">Verify Email</h1>
          <hr className="border-black w-full mt-4" />
          <input
            className="p-1 rounded text-center mt-6 w-3/4"
            type="text"
            placeholder="Enter your code"
            name="code"
            value={code}
            onChange={handleChange} // Handle digits-only input
            maxLength="6" // Limit input to 6 characters
          />
          {/* display error */}
          {error && <p className="text-red-700 text-sm mt-3 p-2">{error}</p>}

          <div className="w-full">
            <button
              type="submit"
              className="p-1 rounded-sm mt-4 border-green-500 bg-green-600 text-white hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
