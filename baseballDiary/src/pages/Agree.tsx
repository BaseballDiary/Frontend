import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NextButton from "../components/Next-button";
import backButton from "../assets/backButton.png";
import exitButton from "../assets/exitButton.png";
import detailButton from "../assets/detailButton.png";
import MainPage from './MainPage';

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

const DetailButton = styled.img`
  width: 6px;
  height: 12px;
  cursor: pointer;
  margin-left: 10px; /* 간격 추가 */
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
  margin-bottom: 16px;
  max-width: 320px;
  font-size: 14px;
`;

const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 320px;
  width: 100%;
  margin-bottom: 250px;
`;

const AgreementItem = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const NextButtonStyled = styled(NextButton)<{ enabled: boolean }>`
  background-color: ${(props) => (props.enabled ? "red" : "gray")} !important;
  color: white;
`;

const Agree: React.FC = () => {
  const [agreements, setAgreements] = useState<{ [key: string]: boolean }>({
    all: false,
    terms: false,
    privacy: false,
    dataPolicy: false,
    marketing: false,
  });
  const navigate = useNavigate();

  const handleAgreementChange = (key: string) => {
    if (key === "all") {
      const newState = !agreements.all;
      setAgreements({
        all: newState,
        terms: newState,
        privacy: newState,
        dataPolicy: newState,
        marketing: newState,
      });
    } else {
      setAgreements((prev) => {
        const newState = { ...prev, [key]: !prev[key] };
        newState.all = Object.keys(newState)
          .filter((k) => k !== "all")
          .every((k) => newState[k]);
        return newState;
      });
    }
  };

  const isRequiredChecked = agreements.terms && agreements.privacy && agreements.dataPolicy;

  return (
    <Container>
      <Header>
        <HeaderButton_exit src={exitButton} alt="Close" onClick={() => navigate("/")} />
        <HeaderTitle>약관 동의</HeaderTitle>
        <HeaderButton_back src={backButton} alt="Back" onClick={() => navigate("-1")} />
      </Header>
      <Title>약관에 동의해주세요.</Title>
      <InfoText>
        베볼리 서비스 사용을 위해 <br /> 먼저 가입 및 정보제공에 동의해주세요.
      </InfoText>
      <AgreementSection>
        <AgreementItem>
          <Checkbox type="checkbox" checked={agreements.all} onChange={() => handleAgreementChange("all")} />
          전체동의 (선택항목 포함)
        </AgreementItem>
        <AgreementItem>
          <Checkbox type="checkbox" checked={agreements.terms} onChange={() => handleAgreementChange("terms")} />
          [필수] 베볼리 이용 약관             
          <DetailButton src={detailButton} alt="Close" onClick={() => navigate("/splash")} />
        </AgreementItem>
        <AgreementItem>
          <Checkbox type="checkbox" checked={agreements.privacy} onChange={() => handleAgreementChange("privacy")} />
          [필수] 개인정보 수집 및 이용 동의
          <DetailButton src={detailButton} alt="Close" onClick={() => navigate("/splash")} />
        </AgreementItem>
        <AgreementItem>
          <Checkbox type="checkbox" checked={agreements.dataPolicy} onChange={() => handleAgreementChange("dataPolicy")} />
          [필수] 개인정보 처리방침
          <DetailButton src={detailButton} alt="Close" onClick={() => navigate("/splash")} />
        </AgreementItem>
        <AgreementItem>
          <Checkbox type="checkbox" checked={agreements.marketing} onChange={() => handleAgreementChange("marketing")} />
          [선택] 마케팅 정보 수집 및 수신동의
          <DetailButton src={detailButton} alt="Close" onClick={() => navigate("/splash")} />
        </AgreementItem>
      </AgreementSection>
      <NextButtonStyled 
        text="다음으로" 
        width="100%" 
        onClick={() => navigate("/home")}
        disabled={!isRequiredChecked} 
        enabled={isRequiredChecked}
      />
    </Container>
  );
};

export default Agree;
