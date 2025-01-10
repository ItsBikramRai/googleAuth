import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import PageNotFound from "./PageNotFound";
import Home from "./Home";
import AuthGoogle from "./auth/AuthGoogle";
import EmailVerificationPage from "./auth/EmailVerificationPage";
import ResetPassword from "./auth/ResetPassword";
import ForgotPassword from "./auth/ForgotPassword";
import GoogleAuthError from "./pages/GoogleAuthError";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth-google" element={<AuthGoogle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerificationPage />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/google/failure" element={<GoogleAuthError />} />
      </Routes>
    </BrowserRouter>
  );
}
