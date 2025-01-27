// App.tsx

import './App.css'
import Layout from './layouts/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SplashPage from './pages/SplashPage';


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
        element: <h1>피그마 - 홈화면입니다.</h1>,
      },
      {
        path: 'game',
        element: <h1>오늘의 경기 페이지입니다.</h1>,
        children: [
          { path: 'schedule', element: <h1>일정 페이지입니다.</h1> },
          { path: 'team-ranking', element: <h1>팀순위 페이지입니다.</h1> },
          {
            path: 'player-ranking',
            element: <h1>개인순위 페이지입니다.</h1>,
            children: [
              { path: 'bowler', element: <h1>개인 투수 순위 페이지입니다.</h1> },
              { path: 'batter', element: <h1>개인 타자 순위 페이지입니다.</h1> }
            ]
          }
        ]
      },
      {
        path: 'community',
        children: [
          {
            path: 'team-choice',
            element: <h1>피그마 - 커뮤니티 - 팀 선택 페이지입니다.</h1>,
          },
          {
            path: ':team-name',
            children: [
              { path: 'posts', element: <h1>일반 게시글</h1> },
              { path: 'posts/popular', element: <h1>인기 게시글</h1> },
              { path: 'posts/market', element: <h1>장터 게시글</h1> },
              { path: 'posts/new', element: <h1>게시글 생성</h1> },
              { path: 'post/:post-id', element: <h1>단일 게시글</h1> },
            ],
          },
        ],
      },
      {
        path: 'diary',
        children: [
          { path: ':year', element: <h1>피그마 - 다이어리 - 연도별 일기</h1> },
          { path: 'new', element: <h1>피그마 - 다이어리 - 직관 일기 생성</h1> },
          { path: ':diaryId', element: <h1>피그마 - 다이어리 - 특정 직관 일기</h1> },
        ],
      },
      {
        path: 'mypage',
        children: [
          { index: true, element: <h1>마이페이지 - 프로필</h1> },
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
      { index: true, element: <h1>로그인 페이지입니다.</h1> },
      { path: 'sign-up', element: <h1>회원가입 페이지입니다.</h1> },
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