// SignUpPage.tsx: 회원가입 페이지에서 InputField를 사용하도록 수정
import React, { useState } from 'react';
import InputField from '../components/InputField';
import './SignUpPage.css';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Signing up with:', { username, password });
    // 회원가입 처리 로직 추가
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h1>회원가입</h1>
      {/* 공용 InputField 컴포넌트 사용 */}
      <InputField
        type="text"
        placeholder="아이디를 입력하세요"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignUp}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignUpPage;
