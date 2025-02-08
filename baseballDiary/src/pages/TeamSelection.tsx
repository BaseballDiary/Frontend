import React, { useState } from "react";
import styled from "styled-components";
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
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 16px;
`;

const InfoText = styled.p`
  color: gray;
  text-align: center;
  margin-bottom: 16px;
  max-width: 320px;
  word-wrap: break-word;
  font-size: 14px
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 320px;
  margin-bottom: 24px;
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
  height: 80px;
  width: 100px;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TeamImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 4px;
`;

const TeamSelection: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  return (
    <Container>
      <Title>선호 구단 선택</Title>
      <Subtitle>000님이 응원하는 구단을 알려주세요!</Subtitle>
      <InfoText>선택해주신 구단을 중심으로 정보를 제공해드려요.<br />
      나중에 계정설정에서 변경할 수 있어요.</InfoText>
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
      <NextButton text="다음으로" width="100%" onClick={() => console.log(selectedTeam)} disabled={!selectedTeam} />
    </Container>
  );
};

export default TeamSelection;
