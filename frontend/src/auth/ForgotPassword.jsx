import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, NavLink } from "react-router-dom";
import { API } from "../../API";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/forgot-password", { email });

      if (response?.data?.success) {
        toast.success("check your mail and verify");
        setEmail("");
        navigate("/");
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
          Forgot Password
        </h1>

        <hr className="border-black  w-3/4 m-2 " />

        <div className="pt-2 flex  items-center justify-center">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="outline-black outline-1 ps-2 rounded w-3/4"
          />
        </div>

        <button className="h-8 bg-green-600 rounded mt-2 px-2 hover:rounded-md  text-blue-800 font-medium hover:bg-black hover:text-white">
          Forgot
        </button>
        <NavLink to="/login" className={"text-blue-700 underline  text-sm"}>
          login
        </NavLink>
      </form>
    </Layout>
  );
}
