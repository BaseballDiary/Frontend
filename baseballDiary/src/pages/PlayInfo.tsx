import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import lotte from "../assets/lotte.png";
import hanhwa from "../assets/hanhwa.png";

// 전체 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  height: 100vh;
  font-family: "Arial", sans-serif;
`;

// 상단 헤더
export const Header = styled.div`
  width: 100%;
  height: 50px;
  background: #f8223b;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  color: white;
  font-size: 18px;
`;

// 탭 메뉴
export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  border-bottom: 2px solid #ddd;
`;

export const Tab = styled.div<{ active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px;
  color: ${({ active }) => (active ? "#f8223b" : "#999")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-bottom: ${({ active }) => (active ? "3px solid #f8223b" : "none")};
`;

// 날짜 선택
export const DateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
`;

export const DateBox = styled.div<{ active?: boolean }>`
  padding: 5px 10px;
  border-radius: 10px;
  background: ${({ active }) => (active ? "#f8223b" : "#eee")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  font-weight: bold;
  cursor: pointer;
`;

// 경기 섹션
export const SectionTitle = styled.h3`
  width: 90%;
  font-size: 16px;
  color: #333;
  margin-top: 15px;
`;

// 내 구단 경기
export const MyTeamMatch = styled.div`
  display: flex;
  align-items: center;
  background: #f8223b;
  color: white;
  padding: 10px;
  width: 90%;
  border-radius: 10px;
  justify-content: space-between;
`;

export const TeamLogo = styled.img`
  width: 50px;
  height: 50px;
`;

export const MatchDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MatchTime = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const MatchStatus = styled.span`
  font-size: 14px;
`;

// 오늘의 경기 리스트
export const MatchList = styled.div`
  width: 90%;
`;

export const MatchItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const MatchTimeSmall = styled.span`
  font-size: 14px;
  color: #666;
`;

export const MatchResult = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

export const MatchStatusSmall = styled.span`
  font-size: 14px;
  color: green;
`;

export const TeamIcons = styled.div`
  display: flex;
  gap: 5px;
`;

export const TeamLogoSmall = styled.img`
  width: 30px;
  height: 30px;
`;

// 하단 네비게이션
export const BottomNav = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background: white;
  border-top: 1px solid #ddd;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
`;

export const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: ${({ active }) => (active ? "#f8223b" : "#666")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

export const NavIcon = styled.span`
  font-size: 20px;
`;



const PlayInfo = () => {
  const [selectedDate, setSelectedDate] = useState(7);

  return (
    <Container>
      {/* 상단 네비게이션 */}
      <Header>
        <Title>경기정보</Title>
      </Header>

      {/* 탭 메뉴 */}
      <TabContainer>
        <Tab active>경기 일정</Tab>
        <Tab>팀 순위</Tab>
        <Tab>개인 순위</Tab>
      </TabContainer>

      {/* 날짜 선택 */}
      <DateContainer>
        {[7, 7, 7, 7, 7, 7, 7].map((day, index) => (
          <DateBox key={index} active={index === 1} onClick={() => setSelectedDate(day)}>
            {day} 화
          </DateBox>
        ))}
      </DateContainer>

      {/* 내 구단 경기 */}
      <SectionTitle>내 구단 경기</SectionTitle>
      <MyTeamMatch>
        <TeamLogo src={lotte} alt="롯데" />
        <MatchDetails>
          <MatchTime>18:00</MatchTime>
          <MatchStatus>잠실</MatchStatus>
        </MatchDetails>
        <TeamLogo src={hanhwa} alt="한화" />
      </MyTeamMatch>

      {/* 오늘의 경기 리스트 */}
      <SectionTitle>오늘의 경기</SectionTitle>
      <MatchList>
        <MatchItem>
          <MatchTimeSmall>15:00</MatchTimeSmall>
          <TeamIcons>
            <TeamLogoSmall src={lotte} alt="롯데" />
            </TeamIcons>
            <MatchResult>롯데 4 - 9 한화</MatchResult>
            <TeamIcons>
            <TeamLogoSmall src={hanhwa} alt="한화" />
          </TeamIcons>
        </MatchItem>
        <MatchItem>
          <MatchTimeSmall>17:00</MatchTimeSmall>
          <TeamIcons>
            <TeamLogoSmall src={lotte} alt="롯데" />
            </TeamIcons>
            <MatchStatusSmall>예정</MatchStatusSmall>
            <TeamIcons>
            <TeamLogoSmall src={hanhwa} alt="한화" />
          </TeamIcons>
        </MatchItem>
      </MatchList>

      {/* 하단 네비게이션 바 */}
      
    </Container>
  );
};

export default PlayInfo;
