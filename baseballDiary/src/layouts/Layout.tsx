import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Outlet />
      <Navbar />
    </div>
  );
}

export default Layout;