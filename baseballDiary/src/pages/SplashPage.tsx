// src/SplashPage.tsx
import React from "react";
import "./SplashPage.css";
import Logo from "../assets/logo.svg"; // 실제 경로에 맞게 수정

function SplashPage() {
  return (
    <div className="splash-container">
      {/* 로고 (베볼리 글자 포함) */}
      <img
        src={Logo}
        alt="베볼리 로고"
        className="splash-logo"
      />
    </div>
  );
}

export default SplashPage;