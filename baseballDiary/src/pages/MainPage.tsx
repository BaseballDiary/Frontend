import React, { useState } from "react";
import BevoliLogo from "../assets/main/BevoliLogo.svg";
import NotificationIcon from "../assets/main/NotificationIcon.svg";
import LotteLogo from "../assets/team/LotteLogo.svg";
import HanwhaLogo from "../assets/team/HanwhaLogo.svg";
import RecentIcon from "../assets/main/RecentIcon.svg";
import OldestIcon from "../assets/main/OldestIcon.svg";

/**
 * MainPage 컴포넌트
 * - 상단 로고, 알림 아이콘
 * - 사용자 이름 표시(예: "안녕하세요! 000님")
 * - 경기 정보(롯데 vs 한화, 경기 예정 상태와 시간)
 * - 스크롤 가능 영역: 나의 야구온도, 출석체크, 직관(최근순/오래된순)
 * - 하단 탭바
 */
const MainPage: React.FC = () => {
  // 월별 출석체크를 위한 상태 (1~12)
  const [attendanceMonth, setAttendanceMonth] = useState<number>(1);

  // 직관 정보 정렬상태 ("recent" 혹은 "oldest")
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  // 임시 데이터: 나중에 백엔드 연동 시 대체
  const userName = "000"; // 백엔드에서 가져올 사용자 이름
  const baseballTemp = 88; // 백엔드에서 가져올 야구 온도
  const tempPercent = 0; // 상위 몇 %인지 (예: 백엔드에서 퍼센트값 반환)
  const attendanceCount = 23; // 1월 기준 출석일수
  const attendanceMax = 30; // 1월 기준 총 일수
  const directWatchCount = 13; // 직관 경기 수
  const directWatchWin = 6; // 직관 중 승리 경기 수

  // 직관 성공률 (예: 86%)
  const directWatchWinRate = Math.round((directWatchWin / directWatchCount) * 100);

  // 최근 직관 경기 정보 (임시 배열)
  const recentMatches = [
    { id: 1, date: "9.13 (수)", homeScore: 4, awayScore: 9 },
    { id: 2, date: "9.12 (화)", homeScore: 5, awayScore: 8 },
    { id: 3, date: "9.11 (월)", homeScore: 3, awayScore: 6 },
  ];

  // 오래된 순 직관 경기 정보 (임시 배열)
  const oldestMatches = [
    { id: 3, date: "9.11 (월)", homeScore: 3, awayScore: 6 },
    { id: 2, date: "9.12 (화)", homeScore: 5, awayScore: 8 },
    { id: 1, date: "9.13 (수)", homeScore: 4, awayScore: 9 },
  ];

  // 정렬 상태에 따라 화면에 보여줄 데이터 결정
  const displayedMatches = sortOrder === "recent" ? recentMatches : oldestMatches;

  return (
    <div className="app-container bg-gradient-to-b from-red-500 to-orange-400 min-h-screen text-white flex flex-col">
      {/* 헤더 영역 */}
      <header className="flex justify-between items-center p-4">
        {/* 베볼리 로고 (SVG) */}
        <img src={BevoliLogo} alt="Bevoli Logo" className="h-8" />
        {/* 알림 아이콘 (SVG) */}
        <img
          src={NotificationIcon}
          alt="Notification Icon"
          className="h-6 cursor-pointer"
        />
      </header>

      {/* 인사 영역 */}
      <section className="text-center my-2 px-4">
        <p className="text-lg">
          안녕하세요! <span className="font-bold">{userName}님</span> 오늘의 경기를 확인해보세요.
        </p>
      </section>

      {/* 경기 정보 카드 (vs) */}
      <section className="bg-white text-black rounded-xl mx-4 p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <img src={LotteLogo} alt="Lotte Logo" className="h-10 w-10" />
          <div className="text-center">
            <p className="text-sm text-gray-600">경기 예정</p>
            <p className="text-xl font-bold">18:00</p>
          </div>
          <img src={HanwhaLogo} alt="Hanwha Logo" className="h-10 w-10" />
        </div>
      </section>

      {/* 스크롤 가능 영역: flex-grow 처리 후 내부 스크롤 */}
      <div className="flex-grow mt-4 overflow-auto px-4 space-y-6 pb-20">
        {/* 나의 야구온도 카드 */}
        <div className="bg-white text-black rounded-xl p-4 shadow-lg">
          <p className="text-base font-semibold">나의 야구온도는?</p>
          <div className="flex items-center mt-4">
            <span className="text-4xl font-bold text-red-500">{baseballTemp}°</span>
            <div className="flex-grow ml-4 bg-gray-200 h-2 rounded-full overflow-hidden">
              {/* 백분율로 환산해서 width에 반영(예: 88%) */}
              <div
                className="bg-red-500 h-full transition-all duration-300"
                style={{ width: `${baseballTemp}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            0000명 중 상위 {tempPercent}%예요!
          </p>
        </div>

        {/* 1월 출석체크 카드 */}
        <div className="bg-white text-black rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold">
              {attendanceMonth}월 출석체크
            </p>
            <p className="text-red-500 font-bold">
              {attendanceCount}/{attendanceMax}일 출석 중
            </p>
          </div>

          {/* 출석체크 달 선택 토글(1~12월) */}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {[...Array(12)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap ${
                  attendanceMonth === index + 1
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setAttendanceMonth(index + 1)}
              >
                {index + 1}월
              </button>
            ))}
          </div>
        </div>

        {/* 2024년 나의 직관 카드 */}
        <div className="bg-white text-black rounded-xl p-4 shadow-lg">
          <p className="text-base font-semibold">
            2024년 나의 직관 <span className="text-sm text-red-500 ml-2">직관 승률 {directWatchWinRate}%</span>
          </p>
          <p className="text-xs text-gray-500 mt-1 mb-2">
            {directWatchCount}회의 직관 중 {directWatchWin}회 승리했어요.
          </p>

          {/* 최근순 / 오래된순 토글 영역 */}
          <div className="flex justify-start items-center mb-4">
            {/* 하나의 아이콘만 표시하고 클릭 시 다른 아이콘으로 변경 */}
            <button
              className="w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-0"
              style={{ backgroundColor: "transparent", border: "none", outline: "none" }}
              onClick={() =>
                setSortOrder((prev) => (prev === "recent" ? "oldest" : "recent"))
              }
            >
              <img
                src={sortOrder === "recent" ? RecentIcon : OldestIcon}
                alt={sortOrder === "recent" ? "최근순 아이콘" : "오래된순 아이콘"}
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* 직관 경기 리스트 */}
          <ul className="space-y-2">
            {displayedMatches.map((match) => (
              <li key={match.id} className="border-b pb-2 text-sm last:border-b-0">
                롯데 {match.homeScore} vs {match.awayScore} 한화 ({match.date})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
