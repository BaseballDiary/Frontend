// App.tsx

import './App.css'
import Layout from './layouts/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import PlayInfo from './pages/PlayInfo/PlayInfo';
import TeamRanking from './pages/PlayInfo/TeamRanking';
import PlayerRanking from './pages/PlayInfo/PlayerRanking';
import Signup from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PlayLayout from './layouts/PlayLayout';
import CommunityLayout from './layouts/CommunityLayout';
import CommunityTotal from './pages/community/CommunityTotal';
import CommunityPopular from './pages/community/CommunityPopular';
import PostDetail from './pages/community/PostDetail';
import { Navigate } from "react-router-dom"; // 👈 추가
import "../styles.css"
import Mydiary from './pages/Mydiary';
import Diary from './pages/Diary';
import DiaryNew from './pages/DiaryNew';


const router = createBrowserRouter([
  {
    // 스플래시 페이지 경로 설정
    path: '/splash',
    element: <SplashPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, 
        element: <MainPage />, // 메인 페이지 컴포넌트 연결
      },
      {
        path: "game",
        element: <PlayLayout />, // 기본적으로 경기 일정(PlayInfo) 표시
        children: [
          { index: true, element: <Navigate to="/game/schedule" replace />}, // 기본 페이지: 경기 일정
          { path: "schedule", element: <PlayInfo /> },
          { path: "team-ranking", element: <TeamRanking /> },
          {
            path: "player-ranking",
            element: <PlayerRanking />,
            children: [
              { path: "bowler", element: <h1>개인 투수 순위 페이지입니다.</h1> },
              { path: "batter", element: <h1>개인 타자 순위 페이지입니다.</h1> },
            ]
          }
        ]
      },
      {
        path: 'community',
        element: <CommunityLayout />, 
        children: [
          { index: true, element: <Navigate to="/community/all" replace /> },  // 기본 경로 설정
          { path: 'all', element: <CommunityTotal/> },
          { path: 'popular', element: <CommunityPopular /> },
          { path: 'post/:postId', element: <PostDetail /> }
        ],
      },
      {
        path: 'diary',
        children: [
          { index: true, element: <Diary /> },
          { path: ':year', element: <h1>피그마 - 다이어리 - 연도별 일기</h1> },
          { path: 'new', element: <DiaryNew /> },
          { path: ':diaryId', element: <h1>피그마 - 다이어리 - 특정 직관 일기</h1> },
        ],
      },
      {
        path: 'mypage',
        children: [
          { index: true, element: <Mydiary/> },
          { path: 'edit', element: <h1>프로필 수정</h1> },
        ],
      },
    ],
  },
  {
    // 2) 로그인(/login)은 Layout 없이 바로 페이지 렌더링
    //Navbar 사용안하도록 외부에 위치
    path: '/login',
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'sign-up', element: <SignUpPage/> }, //회원가입 페이지 연결
      { path: 'search-account', element: <h1>아이디/비밀번호 찾기 페이지입니다.</h1> }
    ]
  },
  {
    // 그 외 모든 URL - 404
    path: '*',
    element: <h1>404 - 페이지를 찾을 수 없습니다.</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;