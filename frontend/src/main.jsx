import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { AuthContextProdiver } from "./contextAPI/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <AuthContextProdiver>
      <App />
    </AuthContextProdiver>
  </StrictMode>
);
