import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NextButton from "../components/Next-button";
import backButton from "../assets/backButton.png";
import exitButton from "../assets/exitButton.png";
import detailButton from "../assets/detailButton.png";
import checkIcon from "../assets/checkIcon.png";
import MainPage from './MainPage';
import TeamSelection from './pages/TeamSelection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 360px;
  padding: 8px 16px;
  position: absolute;
  top: 30px;
`;

const HeaderButton_exit = styled.img`
  width: 12px;
  height: 16px;
  cursor: pointer;
`;

const HeaderButton_back = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 100px;
  margin-bottom: 8px;
  max-width: 320px;
  text-align: left;
  line-height: 1.2;
  color: red;
`;

const InfoText = styled.p`
  color: gray;
  text-align: left;
  margin-bottom: 40px;
  max-width: 320px;
  font-size: 14px;
`;

const InputWrapper = styled.div<{ verified: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 320px;
  position: relative;
  padding: 12px;
  border: 1px solid ${(props) => (props.verified ? "green" : "#ccc")};
  border-radius: 40px;
  background-color: ${(props) => (props.verified ? "#e6f9e6" : "white")};
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  padding-right: 80px;
`;

const VerifyButton = styled.button<{ verified: boolean }>`
  margin-top: 20px;
  margin-left: auto;
  background-color: ${(props) => (props.verified ? "green" : "#ddd")};
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
`;

const WarningText = styled.p`
  color: gray;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 300px;
  max-width: 360px;
  font-size: 14px;
`;

const NextButtonStyled = styled(NextButton)<{ enabled: boolean }>`
  background-color: ${(props) => (props.enabled ? "red" : "gray")} !important;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nickname: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    if (nickname.length >= 2 && nickname.length <= 10) {
      setIsVerified(true);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderButton_exit src={exitButton} alt="Close" onClick={() => navigate("/")} />
        <HeaderTitle>닉네임 입력</HeaderTitle>
        <HeaderButton_back src={backButton} alt="Back" onClick={() => navigate("-1")} />
      </Header>
      <Title>닉네임을 정해주세요.</Title>
      <InfoText>
        베볼디에서 불리는 이름이에요.<br />
        나중에 계정설정에서 변경할 수 있어요.
      </InfoText>
      <InputWrapper verified={isVerified}>
        <Input 
          type="text" 
          placeholder="닉네임을 입력해주세요." 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)}
        />
        {isVerified ? (
          <img src={checkIcon} alt="verified" width="20px" />
        ) : null}
      </InputWrapper>
      <VerifyButton verified={isVerified} onClick={handleVerify}>중복확인</VerifyButton>
      <WarningText>{isVerified ? "사용 가능한 닉네임이에요." : "이모지, 특수문자는 사용할 수 없어요."}</WarningText>
      <NextButtonStyled 
        text="다음으로" 
        width="100%" 
        onClick={() => navigate("/team-selection")}
        disabled={!isVerified} 
        enabled={isVerified}
      />
    </Container>
  );
};

export default Nickname;
