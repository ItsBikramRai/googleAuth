import React, { useContext } from "react";
import Layout from "../Layout/Layout";

import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../API";
import { AuthContext } from "../contextAPI/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setAuth, setIsVerified } = useContext(AuthContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("auth/login", {
        email,
        password,
      });

      if (response?.data?.success) {
        const userData = response?.data;
        localStorage.setItem("auth", JSON.stringify(userData));
        setAuth({
          user: userData?.user?.name,
          data: userData?.user,
        });
        setIsVerified(userData?.user?.isVerified === true);
        toast.success(response?.data?.message);
        setEmail("");
        setPassword("");
        navigate("/");
        // window.location.reload();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      // console.log("error", error);
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className="flex ">
        <form
          onSubmit={onSubmitHandler}
          className="flex items-center justify-center flex-col mt-5 bg-slate-400 pb-5 lg:w-1/4 md:w-1/4 sm:w-2/4 h-1/3 mx-auto rounded-lg "
        >
          <h1 className="text-3xl p-2 font-semibold from-neutral-900">Login</h1>
          <hr className="border-black  w-3/4 ms-3 " />
          <div className="pt-2 flex  items-center justify-center">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              className="outline-black outline-1 ps-2 rounded w-3/4 my-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pt-2 flex  items-center justify-center">
            <input
              type="password" // Changed type to password for security
              placeholder="Password"
              name="password"
              value={password}
              className="outline-black outline-1 ps-2 rounded w-3/4 mb-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="h-8 m-2 p-2 hover:rounded-md  text-blue-800 font-medium hover:bg-black hover:text-white bg-green-600 rounded text-center "
          >
            Login
          </button>
          <div className="w-3/4 text-center justify-center">
            <NavLink to="/signup" className={"text-white text-[10px] mt-3"}>
              Not at signup?
            </NavLink>
            <span></span>
            <NavLink
              to="/forgot-password"
              className={
                "text-sm mt-3 font-thin underline text-blue-600 ms-1 text-[10px]"
              }
            >
              Forgot Password?
            </NavLink>
          </div>
        </form>
      </div>
    </Layout>
  );
}
