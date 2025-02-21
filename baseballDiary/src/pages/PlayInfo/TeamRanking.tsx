import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import lotte from "../../assets/team/lotte.png";
import hanhwa from "../../assets/team/hanhwa.png";

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100vw;
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

const YearSelector = styled.select`
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const SectionTitle = styled.h3`
  width: 90%;
  font-size: 16px;
  color: #333;
  margin-top: 15px;
`;

const TeamRankTable = styled.div`
  width: 90%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

const TableHeader = styled.div`
  display: flex;
  background: #f1f1f1;
  padding: 10px;
  font-weight: bold;
  font-size: 14px;
`;

const TableRow = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background: ${({ selected }) => (selected ? "#f8223b" : "white")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  white-space: nowrap; /* 👈 팀명이 줄바꿈되지 않도록 설정 */
`;

const TableCell = styled.div<{ width?: string }>`
  flex: ${({ width }) => (width ? `0 0 ${width}` : "1")};
  text-align: center;
  min-width: ${({ width }) => width || "auto"}; /* 👈 팀명이 너무 좁아지지 않도록 최소 너비 설정 */
`;

const TeamName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 👈 왼쪽 정렬 */
  text-align: left;
`;

const TeamLogo = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`;


// 예제 팀 순위 데이터
const teams = [
  { rank: 1, name: "롯데", logo: lotte, games: 144, win: 87, draw: 2, lose: 55, winRate: 0.573 },
  { rank: 2, name: "한화", logo: hanhwa, games: 144, win: 85, draw: 3, lose: 56, winRate: 0.567 },
  { rank: 3, name: "LG", logo: lotte, games: 144, win: 83, draw: 4, lose: 57, winRate: 0.560 },
  { rank: 4, name: "SSG", logo: hanhwa, games: 144, win: 80, draw: 6, lose: 58, winRate: 0.550 },
  { rank: 5, name: "삼성", logo: lotte, games: 144, win: 78, draw: 5, lose: 61, winRate: 0.540 },
];

const TeamRanking = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedTeam, setSelectedTeam] = useState("롯데"); // 선택된 팀
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

      {/* 연도 선택 드롭다운 */}
      <SectionTitle>종합순위</SectionTitle>
      <YearSelector value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </YearSelector>

      {/* 팀 순위 테이블 */}
      <TeamRankTable>
  <TableHeader>
    <TableCell width="10%">순위</TableCell>
    <TableCell width="25%">팀</TableCell> {/* 👈 너비를 늘려 가로로 정렬 */}
    <TableCell width="15%">경기</TableCell>
    <TableCell width="10%">승</TableCell>
    <TableCell width="10%">무</TableCell>
    <TableCell width="10%">패</TableCell>
    <TableCell width="15%">승률</TableCell>
  </TableHeader>

  {teams.map((team) => (
    <TableRow
      key={team.rank}
      selected={team.name === selectedTeam}
      onClick={() => setSelectedTeam(team.name)}
    >
      <TableCell>{team.rank}</TableCell>
      <TableCell>
        <TeamName>
          <TeamLogo src={team.logo} alt={team.name} />
          {team.name}
        </TeamName>
      </TableCell>
      <TableCell>{team.games}</TableCell>
      <TableCell>{team.win}</TableCell>
      <TableCell>{team.draw}</TableCell>
      <TableCell>{team.lose}</TableCell>
      <TableCell>{team.winRate.toFixed(3)}</TableCell>
    </TableRow>
  ))}
</TeamRankTable>

    </Container>
  );
};

export default TeamRanking;
