import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { API } from "../../API";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // compare password
    if (password !== confirmPassword) {
      setError("password doesnot match !!");
      return;
    }
    try {
      const response = await API.post(`/auth/reset-password/${token}`, {
        password,
      });
      if (response?.data?.success) {
        toast.success("Password successfully changed");
        setConfirmPassword("");
        setPassword("");
        setError("");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  return (
    <Layout>
      <form
        onSubmit={onSubmitHandler}
        className="flex items-center justify-center flex-col mt-5 bg-slate-400 pb-5 w-1/3 h-2/3 mx-auto rounded-lg"
      >
        <h1 className="text-2xl p-2 font-semibold from-neutral-900">
          Reset Password
        </h1>

        <hr className="border-black  w-3/4 m-2 " />

        <div className="pt-2 flex  items-center justify-center">
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            placeholder="Set Password"
            className="outline-black outline-1  ps-2 rounded w-3/4"
          />
        </div>
        <div className="pt-2 flex  items-center justify-center">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="outline-black outline-1  ps-2 rounded w-3/4"
          />
        </div>

        <div className="p-3">
          {error && <p className="text-sm text-red-700">{error}</p>}
        </div>
        <button
          type="submit"
          className="h-8 bg-green-600 rounded px-2 hover:rounded-md  text-blue-800 font-medium hover:bg-black hover:text-white"
        >
          Reset
        </button>
        <NavLink to="/login" className={"text-blue-700 underline  text-sm"}>
          login
        </NavLink>
      </form>
    </Layout>
  );
}
