import React, { useState } from "react";
import styled from "styled-components";

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
  logo: "/giants-logo.png",
});

const TeamRanking = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  return (
    <Container>
      {/* 상단 네비게이션 */}
      <Header>
        <Title>경기정보</Title>
      </Header>

      {/* 탭 메뉴 */}
      <TabContainer>
        <Tab>
          <a href="/playinfo">경기 일정</a>
        </Tab>
        <Tab active>팀 순위</Tab>
        <Tab>
          <a href="/player-ranking">개인 순위</a>
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

      {/* 하단 네비게이션 바 */}
      <BottomNav>
        <NavItem active>경기정보</NavItem>
        <NavItem>커뮤니티</NavItem>
        <NavItem>야구일기</NavItem>
        <NavItem>더보기</NavItem>
      </BottomNav>
    </Container>
  );
};

export default TeamRanking;

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  background: #f8223b;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

const Tab = styled.div<{ active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px;
  color: ${({ active }) => (active ? "#f8223b" : "#999")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-bottom: ${({ active }) => (active ? "3px solid #f8223b" : "none")};
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

const TableRow = styled.tr<{ active?: boolean }>`
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

const BottomNav = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background: white;
  border-top: 1px solid #ddd;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
`;

const NavItem = styled.div<{ active?: boolean }>`
  font-size: 14px;
  color: ${({ active }) => (active ? "#f8223b" : "#666")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;
