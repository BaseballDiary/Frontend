import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import doosan from "../assets/doosan.png";
import lotte from "../assets/lotte.png";
import samsung from "../assets/samsung.png";
import kiwooon from "../assets/kiwoom.png";
import hanhwa from "../assets/hanhwa.png";
import kia from "../assets/kia.png";
import kt from "../assets/kt.png";
import nc from "../assets/nc.png";
import lg from "../assets/lg.png";
import ssg from "../assets/ssg.png";
import NextButton from "../components/Next-button";
import backButton from "../assets/backButton.png";
import exitButton from "../assets/exitButton.png";

const teams = [
  { name: "두산 베어스", id: "bears", image: doosan },
  { name: "롯데 자이언츠", id: "giants", image: lotte },
  { name: "삼성 라이온즈", id: "lions", image: samsung },
  { name: "키움 히어로즈", id: "heroes", image: kiwooon },
  { name: "한화 이글스", id: "eagles", image: hanhwa },
  { name: "KIA 타이거즈", id: "tigers", image: kia },
  { name: "KT 위즈", id: "wiz", image: kt },
  { name: "NC 다이노스", id: "dinos", image: nc },
  { name: "LG 트윈스", id: "twins", image: lg },
  { name: "SSG 랜더스", id: "landers", image: ssg },
];

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
  margin-top: 70px;
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
  word-wrap: break-word;
  font-size: 14px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 320px;
  margin-bottom: 35px;
`;

const TeamButton = styled.button<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 12px;
  background-color: ${(props) => (props.selected ? "red" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
  cursor: pointer;
  height: 100px;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;
`;

const TeamImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 4px;
`;

const TeamSelection: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
      <HeaderButton_exit src={exitButton} alt="Close" onClick={() => navigate("/")} />
        <HeaderTitle>선호구단 선택</HeaderTitle>
        <HeaderButton_back src={backButton} alt="Back" onClick={() => navigate("-1")} />
      </Header>
      <Title>홍길동님이 응원하는 구단을 <br/ > 알려주세요!</Title>
      <InfoText>
        선택해주신 구단을 중심으로 정보를 제공해드려요.<br />
        나중에 계정설정에서 변경할 수 있어요.
      </InfoText>
      <Grid>
        {teams.map((team) => (
          <TeamButton
            key={team.id}
            selected={selectedTeam === team.id}
            onClick={() => setSelectedTeam(team.id)}
          >
            <TeamImage src={team.image} alt={team.name} />
            {team.name}
          </TeamButton>
        ))}
      </Grid>
      <NextButton text="다음으로" width="100%" onClick={() => navigate("/agree")} />
    </Container>
  );
};

export default TeamSelection;
