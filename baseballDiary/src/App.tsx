import './App.css'

// 1. import를 해줍니다.
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>피그마 - 홈화면입니다.</h1>
    },
    {
        path: '/game',
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
        path: '/login',
        element: <h1>로그인 페이지입니다.</h1>,
        children: [
            { path: 'sign-up', element: <h1>회원가입 페이지입니다.</h1> },
            { path: 'search-account', element: <h1>아이디/비밀번호 찾기 페이지입니다.</h1> }
        ]
    },
    {
        path: '/community',
        children: [
            {
                path: 'team-choice', // 팀 선택 페이지
                element: <h1> 피그마 - 커뮤니티 - 팀 선택 페이지입니다.</h1>,
            },
            {
                path: ':team-name',
                children: [
                    {
                        path: 'posts', // 일반 게시글
                        element: <h1> 피그마 - 커뮤니티 - 일반 게시글 페이지입니다.</h1>,
                    },
                    {
                        path: 'posts/popular', // 인기 게시글
                        element: <h1> 피그마 - 커뮤니티 - 인기 게시글 페이지입니다.</h1>,
                    },
                    {
                        path: 'posts/market', // 장터 게시글
                        element: <h1> 피그마 - 커뮤니티 - 장터 게시글 페이지입니다.</h1>,
                    },
                    {
                        path: 'posts/new', // 게시글 생성 페이지
                        element: <h1> 피그마 - 커뮤니티 - 게시글 생성 페이지입니다.</h1>,
                    },
                    {
                        path: 'post/:post-id', // 단일 게시글
                        element: <h1> 피그마 - 커뮤니티 - 단일 게시글 페이지입니다.</h1>,
                    },
                ],
            },
        ],
    },
    {
        path: '/diary',
        children: [
            {
                path: ':year', // 연도별 일기 페이지
                element: <h1> 피그마 - 다이어리 - 연도별 일기 페이지입니다.</h1>,
            },
            {
                path: 'new', // 직관 일기 생성 페이지
                element: <h1> 피그마 - 다이어리 - 직관 일기 생성 페이지입니다.</h1>,
            },
            {
                path: ':diaryId', // 특정 직관 일기 페이지
                element: <h1> 피그마 - 다이어리 - 특정 직관 일기 페이지입니다.</h1>,
            },
        ],
    },
    {
        path: '/mypage',
        children: [
            {
                path: '', // 프로필 조회
                element: <h1> 피그마 - 마이페이지 - 프로필 페이지입니다.</h1>,
            },
            {
                path: 'edit', // 프로필 수정
                element: <h1> 피그마 - 마이페이지 - 프로필 수정 페이지입니다.</h1>,
            },
        ],
    },
    { path: '*', element: <h1>404 - 페이지를 찾을 수 없습니다.</h1> }
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App;
