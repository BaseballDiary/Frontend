// src/SplashPage.tsx
import React, { useEffect } from "react";
import "./SplashPage.css";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // 홈화면 경로로 변경
    }, 3000); // 3초 후 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

/** 데이터 로딩 후 홈화면 이동시
 * useEffect(() => {
  const loadData = async () => {
    try {
      // 실제 데이터 로딩 로직 추가
      await axios.get('/api/init-data');
      navigate('/home');
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
      // 에러 처리 로직 추가
    }
  };

  loadData();
}, [navigate]);
 */

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