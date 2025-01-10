import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, NavLink } from "react-router-dom";
import { API } from "../../API";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Compare password
    if (password !== confirmPassword) {
      setError("Password doesn't match!");
      return;
    }

    try {
      const response = await API.post(`/auth/signup`, {
        name,
        password,
        email,
      });

      if (response?.data?.success) {
        toast.success("Please verified your account");
        navigate("/email-verify");
      } else {
        toast.error(response?.data?.message);
        // console.error(response.data.message);
      }
    } catch (error) {
      // console.error("Error:", error.response?.data );
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <Layout>
      <div className="flex pt-20">
        <form
          onSubmit={onSubmitHandler}
          className="flex items-center justify-center flex-col mt- bg-slate-400 pb-5 h-2/3 mx-auto rounded-lg lg:w-2/5 sm:w-3/4 md:w-1/3"
        >
          <h1 className="text-3xl p-2 font-semibold from-neutral-900">
            Signup
          </h1>
          <hr className="border-black w-3/4 m-2" />

          {/* Name */}
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-r-2 outline-black ps-2 rounded w-3/4"
            />
          </div>

          {/* Email */}
          <div className="pt-2 flex items-center justify-center">
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="outline-black outline-1 ps-2 rounded w-3/4"
            />
          </div>

          {/* Password */}
          <div className="pt-2 flex items-center justify-center">
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="outline-black outline-1 ps-2 rounded w-3/4"
            />
          </div>

          {/* Confirm Password */}
          <div className="pt-2 flex items-center justify-center">
            <input
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="outline-black outline-1 ps-2 rounded w-3/4"
            />
          </div>

          {/* Error Message */}
          <div className="pt-4 text-sm text-red-800">
            {error && <p>{error}</p>}
          </div>

          {/* Signup Button */}
          <button className="h-8 my-1 px-2 hover:rounded-md text-blue-800 font-medium hover:bg-black hover:text-white">
            Signup
          </button>

          {/* Link to login */}
          <NavLink to="/login" className={"text-white text-sm"}>
            Already signed up?
          </NavLink>
        </form>
      </div>
    </Layout>
  );
}
