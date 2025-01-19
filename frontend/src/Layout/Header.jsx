import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contextAPI/AuthContext";

export default function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setAuth(null);
    navigate("/login");
  };

  const handleGoogleLogin = () => {
    try {
      // Redirect to the backend Google OAuth route
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      window.location.href = `${backendUrl}/api/v1/auth/google`;
    } catch (error) {
      console.error("Error during Google login:", error.message);
    }
  };
  
  return (
    <div className="justify-end text-end flex-wrap flex-row p-5 bg-slate-950 text-white space-x-2">
      {auth?.user ? (
        <button
          type="button"
          onClick={handleLogout} // Logout handler
          className="hover:underline"
        >
          Logout
        </button>
      ) : (
        <>
          <NavLink
            to="/signup"
            aria-label="Sign up"
            className="hover:underline"
          >
            Signup
          </NavLink>

          <NavLink
            type="button"
            aria-label="Login"
            to="/login"
            className="hover:underline"
          >
            Login
          </NavLink>

          <button
            to="/auth-google"
            aria-label="Sign in with Google"
            className="hover:underline"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </button>

          <NavLink
            to="/forgot-password"
            aria-label="Forgot Password"
            className="hover:underline"
          >
            Forgot Password
          </NavLink>
        </>
      )}
    </div>
  );
}
