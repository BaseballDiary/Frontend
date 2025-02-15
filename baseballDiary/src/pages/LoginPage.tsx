import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BevoliLogo from "../assets/logo.svg"; // 로고 이미지 경로
import NextButton from "../components/Next-button"; // NextButton 컴포넌트
import InputField from "../components/InputField"; // InputField 컴포넌트
import { login } from "../api/LoginApi"; // 로그인 API 함수 임포트

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 입력 필드가 모두 채워졌는지 확인
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  // 로그인 버튼 클릭 시 호출되는 함수
  const handleLogin = async () => {
    try {
      const loginResponse = await login(email, password);
      console.log("로그인 성공:", loginResponse);
      // 로그인 성공 후, 예를 들어 홈 페이지로 이동
      navigate("/home"); // 원하는 경로로 수정 가능
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <Container>
      {/* 로고 */}
      <Logo src={BevoliLogo} alt="베볼리 로고" />

      {/* 입력 필드 */}
      <InputContainer>
        <InputField
          type="text"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>

      {/* NextButton: 로그인 API 호출 */}
      <NextButton
        text="시작하기"
        bgColor="red"
        textColor="white"
        hoverColor="#ff4d4d"
        width="341px"
        onClick={handleLogin}
        disabled={!isFormValid} // 입력값 없을 때 비활성화
      />

      {/* 아이디/비밀번호 찾기 & 회원가입 링크 */}
      <BottomLinks>
        <LinkText onClick={() => navigate("/login/search-account")}>
          비밀번호 찾기
        </LinkText>{" "}
        |{" "}
        <LinkText onClick={() => navigate("/login/sign-up")}>
          회원가입
        </LinkText>
      </BottomLinks>
    </Container>
  );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
`;

const Logo = styled.img`
  width: 200px; /* 로고 크기 조정 */
  height: auto;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 341px;
  gap: 10px;
  margin-bottom: 20px;
`;

const BottomLinks = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: gray;
`;

const LinkText = styled.span`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;