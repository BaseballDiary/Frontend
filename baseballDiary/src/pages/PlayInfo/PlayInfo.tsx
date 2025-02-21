import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import doosan from "../../assets/team/doosan.png";
import hanhwa from "../../assets/team/hanhwa.png";
import kbo from "../../assets/team/KBO.png";

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  height: 100vh;
  overflow-y: auto;
  overflow-x:hidden;
  width:100vw;
  max-width: 430px;
  margin: 0 auto;
  padding-top: 90px;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  background: #f8223b;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Title = styled.h2`
  color: white;
  font-size: 18px;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: fixed;
  top: 50px;
  background: white;
  z-index: 99;
`;

const Tab = styled.div<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 12px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ $active }) => ($active ? "#f8223b" : "#999")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  border-bottom: ${({ $active }) => ($active ? "3px solid #f8223b" : "none")};
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1px;
  margin-top: 10px;
`;

const DateBox = styled.div<{ active?: boolean }>`
  padding: 10px 15px;
  border-radius: 8px;
  background: ${({ active }) => (active ? "#f8223b" : "#eee")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  font-weight: bold;
  cursor: pointer;
  text-align: center;
`;

const SectionTitle = styled.h3`
  width: 90%;
  font-size: 16px;
  color: #333;
  margin-top: 15px;
`;

const MyTeamMatch = styled.div`
  display: flex;
  align-items: center;
  background: #f8223b;
  color: white;
  padding: 15px;
  width: 90%;
  border-radius: 10px;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TeamLogo = styled.img`
  width: 55px;
  height: 55px;
`;

const MatchDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

const MatchTime = styled.span`
  font-size: 20px;
`;

const MatchStatus = styled.span`
  font-size: 14px;
`;

const MatchList = styled.div`
  width: 90%;
  margin-bottom: 20px;
`;

const MatchItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

const MatchTimeSmall = styled.span`
  font-size: 14px;
  color: #666;
  width: 50px;
`;

const MatchResult = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  flex: 1;
  text-align: center;
`;

const MatchStatusSmall = styled.span<{ status?: string }>`
  font-size: 14px;
  color: ${({ status }) => (status === "종료" ? "gray" : "green")};
  font-weight: bold;
`;

const TeamIcons = styled.div`
  display: flex;
  gap: 5px;
`;

const TeamLogoSmall = styled.img`
  width: 30px;
  height: 30px;
`;

const PlayInfo = () => {
  const [selectedDate, setSelectedDate] = useState(7);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      {/* 상단 네비게이션 */}
      <Header>
        <Title>경기정보</Title>
      </Header>

      {/* 탭 메뉴 */}
      <TabContainer>
        <Tab $active={location.pathname === "/game/schedule"} onClick={() => navigate("/game/schedule")}>
          경기 일정
        </Tab>
        <Tab $active={location.pathname === "/game/team-ranking"} onClick={() => navigate("/game/team-ranking")}>
          팀 순위
        </Tab>
        <Tab $active={location.pathname === "/game/player-ranking"} onClick={() => navigate("/game/player-ranking")}>
          개인 순위
        </Tab>
      </TabContainer>

      {/* 날짜 선택 */}
      <DateContainer>
        {[7, 8, 9, 10, 11, 12, 13].map((day, index) => (
          <DateBox key={index} active={day === selectedDate} onClick={() => setSelectedDate(day)}>
            {day} 화
          </DateBox>
        ))}
      </DateContainer>

      {/* 내 구단 경기 */}
      <SectionTitle>내 구단 경기</SectionTitle>
      <MyTeamMatch>
        <TeamLogo src={doosan} alt="롯데" />
        <MatchDetails>
          <MatchTime>18:00</MatchTime>
          <MatchStatus>잠실</MatchStatus>
        </MatchDetails>
        <TeamLogo src={hanhwa} alt="한화" />
      </MyTeamMatch>

      {/* 오늘의 경기 리스트 */}
      <SectionTitle>오늘의 경기</SectionTitle>
      <MatchList>
        {[
          { time: "15:00", status: "종료", team1: doosan, team2: hanhwa, result: "롯데 4 - 9 한화" },
          { time: "17:00", status: "예정", team1: doosan, team2: hanhwa, result: "롯데 vs 한화" },
          { time: "18:00", status: "예정", team1: doosan, team2: hanhwa, result: "롯데 vs 한화" },
        ].map((game, index) => (
          <MatchItem key={index}>
            <MatchTimeSmall>{game.time}</MatchTimeSmall>
            <TeamIcons>
              <TeamLogoSmall src={game.team1} alt="team1" />
            </TeamIcons>
            <MatchResult>{game.result}</MatchResult>
            <TeamIcons>
              <TeamLogoSmall src={game.team2} alt="team2" />
            </TeamIcons>
            <MatchStatusSmall status={game.status}>{game.status}</MatchStatusSmall>
          </MatchItem>
        ))}
      </MatchList>
    </Container>
  );
};

export default PlayInfo;
