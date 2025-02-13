import React, { useState } from "react";
import styled from "styled-components";
import lotte from "../assets/lotte.png";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";


interface Team {
  rank: number;
  name: string;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  winRate: number;
  logo: string;
}

const teamData: Team[] = Array(10).fill({
  rank: 1,
  name: "롯데",
  games: 144,
  wins: 87,
  draws: 2,
  losses: 55,
  winRate: 0.573,
  logo: lotte,
});

const TeamRanking = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("schedule");
  const navigate = useNavigate(); 

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

      {/* 연도 선택 */}
      <YearSelector>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="2024">2024</option>
        </select>
      </YearSelector>

      {/* 팀 순위 테이블 */}
      <Table>
        <thead>
          <tr>
            <th>순위</th>
            <th>팀</th>
            <th>경기</th>
            <th>승</th>
            <th>무</th>
            <th>패</th>
            <th>승률</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((team, index) => (
            <TableRow
              key={index}
              active={selectedTeam === team.name}
              onClick={() => setSelectedTeam(team.name)}
            >
              <td>{team.rank}</td>
              <td>
                <TeamInfo>
                  <TeamLogo src={team.logo} alt={team.name} />
                  {team.name}
                </TeamInfo>
              </td>
              <td>{team.games}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.winRate.toFixed(3)}</td>
            </TableRow>
          ))}
        </tbody>
      </Table>

    
    </Container>
  );
  console.log("현재 선택된 탭:", selectedTab);

};

export default TeamRanking;

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  height: 100vh;
  overflow-y: auto;
  padding-top: 90px; /* 👈 헤더(50px) + 탭(40px) 높이 만큼 패딩 추가 */
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
  border-bottom: 2px solid #ddd;
  position: fixed;
  top: 50px;
  left: 0;
  background: white;
  z-index: 99;
`;

const Tab = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$active", // ✅ active가 DOM으로 전달되지 않도록 차단
})<{ $active?: boolean }>`  // 🔹 속성명을 "$active"로 변경하여 스타일에서만 사용
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#f8223b" : "#999")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  border-bottom: ${({ $active }) => ($active ? "3px solid #f8223b" : "none")};
`;


const YearSelector = styled.div`
  margin: 10px 0;
  select {
    padding: 5px;
    font-size: 16px;
  }
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin-top: 10px;
  text-align: center;
  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
`;

const TableRow = styled.tr.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#f8223b" : "#fff")};
  color: ${({ active }) => (active ? "white" : "black")};
  cursor: pointer;
`;


const TeamInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TeamLogo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;


