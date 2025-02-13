import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BevoliLogo from "../assets/logo.svg"; // 로고 이미지 경로
import NextButton from "../components/Next-button"; // NextButton 컴포넌트 사용
import InputField from "../components/InputField"; // InputField 컴포넌트 사용

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 입력 필드가 모두 채워졌는지 확인
  const isFormValid = userId.trim() !== "" && password.trim() !== "";

  return (
    <Container>
      {/* 로고 */}
      <Logo src={BevoliLogo} alt="베볼리 로고" />

      {/* 입력 필드 (InputField 컴포넌트 사용) */}
      <InputContainer>
        <InputField
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>

      {/* NextButton 사용 */}
      <NextButton
        text="시작하기"
        bgColor="red"
        textColor="white"
        hoverColor="#ff4d4d"
        width="341px"
        onClick={() => console.log("로그인 시도")}
        disabled={!isFormValid} // 입력값 없을 때 비활성화
      />

      {/* 아이디/비밀번호 찾기 & 회원가입 */}
      <BottomLinks>
        <LinkText onClick={() => navigate("/login/search-account")}>비밀번호 찾기</LinkText> |{" "}
        <LinkText onClick={() => navigate("/login/sign-up")}>회원가입</LinkText>
      </BottomLinks>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
`;

const Logo = styled.img`
  width: 200px; /* 기존 120px → 200px */
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