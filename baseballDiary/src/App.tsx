import './App.css';
import Layout from './layouts/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import TeamSelection from './pages/TeamSelection';
import PlayInfo from './pages/TeamSelection';

// 📌 추가된 페이지 import
import GameSchedule from './pages/GameSchedule';
import TeamRanking from './pages/TeamRanking';
import PlayerRanking from './pages/PlayerRanking';
import BowlerRanking from './pages/BowlerRanking';
import BatterRanking from './pages/BatterRanking';

const router = createBrowserRouter([
  {
    path: '/splash',
    element: <SplashPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, 
        element: <TeamSelection />,
      },
      {
        path: 'game',
        element: <PlayInfo />,
        children: [
          { path: 'schedule', element: <GameSchedule /> }, // 📌 일정 페이지
          { path: 'team-ranking', element: <TeamRanking /> }, // 📌 팀 순위 페이지
          {
            path: 'player-ranking',
            element: <PlayerRanking />, // 📌 개인 순위 메인 페이지
            children: [
              { path: 'bowler', element: <BowlerRanking /> }, // 📌 투수 순위
              { path: 'batter', element: <BatterRanking /> }, // 📌 타자 순위
            ]
          }
        ]
      },
    ],
  },
  {
    path: '*',
    element: <h1>404 - 페이지를 찾을 수 없습니다.</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
