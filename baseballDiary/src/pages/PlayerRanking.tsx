import React, { useState } from "react";
import styled from "styled-components";
import lotte from "../assets/lotte.png";
import hanhwa from "../assets/hanhwa.png";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

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




const SubTabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const SubTab = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  margin: 0 5px;
  border: none;
  background: ${({ active }) => (active ? "#f8223b" : "#ddd")};
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const CardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  width: 90%;
  margin-top: 10px;
`;

const PlayerCard = styled.div`
  min-width: 140px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 0 5px;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
`;

const CardContent = styled.div`
  margin-top: 10px;
  h4 {
    font-size: 14px;
    color: #666;
  }
  h2 {
    font-size: 18px;
    color: #f8223b;
  }
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
  text-align: center;
  border-collapse: collapse;
  margin-top: 10px;
  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
`;

const TableRow = styled.tr`
  cursor: pointer;
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImageSmall = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;




interface Player {
  rank: number;
  name: string;
  team: string;
  avgERA: number;
  games: number;
  wins: number;
  losses: number;
  innings: string;
  profileImg: string;
}

const pitcherData: Player[] = Array(10).fill({
  rank: 1,
  name: "내일",
  team: "KIA",
  avgERA: 2.53,
  games: 26,
  wins: 12,
  losses: 5,
  innings: "1 1/3",
  profileImg: lotte,
});

const batterData: Player[] = Array(10).fill({
  rank: 1,
  name: "내일",
  team: "KIA",
  avgERA: 0.321,
  games: 126,
  wins: 0,
  losses: 0,
  innings: "-",
  profileImg: hanhwa,
});

const PlayerRanking = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedTab, setSelectedTab] = useState<"투수" | "타자">("투수");
  const [selectedTab2, setSelectedTab2] = useState("schedule");
  const navigate = useNavigate(); 
  const location = useLocation(); // 현재 경로 가져오기


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


      {/* 투수/타자 선택 */}
      <SubTabContainer>
        <SubTab active={selectedTab === "투수"} onClick={() => setSelectedTab("투수")}>
          투수
        </SubTab>
        <SubTab active={selectedTab === "타자"} onClick={() => setSelectedTab("타자")}>
          타자
        </SubTab>
      </SubTabContainer>

      {/* 선수 카드 리스트 */}
      <CardContainer>
        {(selectedTab === "투수" ? pitcherData : batterData).map((player, index) => (
          <PlayerCard key={index}>
            <ProfileImage src={player.profileImg} alt={player.name} />
            <CardContent>
              <h4>평균 자책</h4>
              <h2>{player.avgERA}</h2>
              <span>{player.name} {player.team}</span>
            </CardContent>
          </PlayerCard>
        ))}
      </CardContainer>

      {/* 연도 선택 */}
      <YearSelector>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="2024">2024</option>
        </select>
      </YearSelector>

      {/* 선수 순위 테이블 */}
      <Table>
        <thead>
          <tr>
            <th>순위</th>
            <th>선수</th>
            <th>평균 자책</th>
            <th>경기</th>
            <th>승</th>
            <th>패</th>
            <th>이닝</th>
          </tr>
        </thead>
        <tbody>
          {(selectedTab === "투수" ? pitcherData : batterData).map((player, index) => (
            <TableRow key={index}>
              <td>{player.rank}</td>
              <td>
                <PlayerInfo>
                  <ProfileImageSmall src={player.profileImg} alt={player.name} />
                  {player.name}
                </PlayerInfo>
              </td>
              <td>{player.avgERA.toFixed(2)}</td>
              <td>{player.games}</td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
              <td>{player.innings}</td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
    
  );
  console.log("현재 선택된 탭:", selectedTab);

};

export default PlayerRanking;
