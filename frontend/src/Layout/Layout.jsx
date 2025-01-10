import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div style={{ backgroundColor: "#cce0d2" }}>
      <Header />

      <main style={{ minHeight: "100vh" }}>{children}</main>
      <Footer />
    </div>
  );
}
