import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout: React.FC = () => {
  return (
    <div>
      <h1>로그인 화면</h1>
      <Outlet /> {/* 자식 경로를 렌더링 */}
    </div>
  );
};

export default LoginLayout;
