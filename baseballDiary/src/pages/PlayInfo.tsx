import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  background-color: red;
  padding: 10px;

  a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-size: 18px;
    font-weight: bold;
  }
`;

const GameSchedule = () => (
  <Container>
    <h1>경기 일정</h1>
    <p>경기 일정 페이지 내용</p>
  </Container>
);

const TeamRanking = () => (
  <Container>
    <h1>팀 순위</h1>
    <p>팀 순위 페이지 내용</p>
  </Container>
);

const PlayerRanking = () => (
  <Container>
    <h1>개인 순위</h1>
    <p>개인 순위 페이지 내용</p>
  </Container>
);

const App = () => {
  return (
    <Router>
      <NavBar>
        <Link to="/">경기 일정</Link>
        <Link to="/team-ranking">팀 순위</Link>
        <Link to="/player-ranking">개인 순위</Link>
      </NavBar>
      <Routes>
        <Route path="/" element={<GameSchedule />} />
        <Route path="/team-ranking" element={<TeamRanking />} />
        <Route path="/player-ranking" element={<PlayerRanking />} />
      </Routes>
    </Router>
  );
};

export default App;
