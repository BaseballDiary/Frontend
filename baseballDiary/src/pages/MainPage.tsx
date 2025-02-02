// MainPage.tsx (방법 1)
import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import "../pages/Custom.css"; // custom.css에서 .rsbs-overlay { pointer-events: none; } 적용
import "../components/Navbar"

// 이미지 및 아이콘 임포트
import BevoliLogo from "../assets/main/BevoliLogo.svg";
import NotificationIcon from "../assets/main/NotificationIcon.svg";
import LotteLogo from "../assets/team/LotteLogo.svg";
import HanwhaLogo from "../assets/team/HanwhaLogo.svg";
import RecentIcon from "../assets/main/RecentIcon.svg";
import OldestIcon from "../assets/main/OldestIcon.svg";
import Navbar from "../components/Navbar";

const MainPage: React.FC = () => {
  // 상태 및 임시 데이터
  const [attendanceMonth, setAttendanceMonth] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const userName = "000";
  const baseballTemp = 88;
  const tempPercent = 0;
  const attendanceCount = 23;
  const attendanceMax = 30;
  const directWatchCount = 13;
  const directWatchWin = 6;
  const directWatchWinRate = Math.round((directWatchWin / directWatchCount) * 100);

  const recentMatches = [
    { id: 1, date: "9.13 (수)", homeScore: 4, awayScore: 9 },
    { id: 2, date: "9.12 (화)", homeScore: 5, awayScore: 8 },
    { id: 3, date: "9.11 (월)", homeScore: 3, awayScore: 6 },
  ];

  const oldestMatches = [
    { id: 3, date: "9.11 (월)", homeScore: 3, awayScore: 6 },
    { id: 2, date: "9.12 (화)", homeScore: 5, awayScore: 8 },
    { id: 1, date: "9.13 (수)", homeScore: 4, awayScore: 9 },
  ];

  const displayedMatches = sortOrder === "recent" ? recentMatches : oldestMatches;

  return (
    <div className="app-container relative bg-gradient-to-b from-red-500 to-orange-400 min-h-screen text-white">
      {/* 배경 콘텐츠 영역 */}
      <div className="z-0">
        <header className="flex justify-between items-center p-4">
          <img src={BevoliLogo} alt="Bevoli Logo" className="h-8" />
          <img src={NotificationIcon} alt="Notification Icon" className="h-6 cursor-pointer" />
        </header>
        <section className="text-center my-2 px-4">
          <p className="text-lg">
            안녕하세요! <span className="font-bold">{userName}님</span> 오늘의 경기를 확인해보세요.
          </p>
        </section>
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
      </div>

      {/* BottomSheet 영역 (방법 1 적용) */}
      <BottomSheet
        open={true}
        overlayprops={{ style: { pointerEvents: "none" } }}
        // sheetProps에서 bottom: "60px"로 지정하여 Navbar와 겹치지 않도록 함
        sheetprops={{ style: { bottom: "60px", pointerEvents: "auto" } }}
        defaultSnap={() => 300}
        snapPoints={() => [300, 500]}
        header={
          <div className="w-full flex justify-center p-2">
            <div className="w-12 h-1 rounded-full bg-gray-300"></div>
          </div>
        }
      >
        <div className="px-4 space-y-6 pb-20">
          {/* 나의 야구온도 카드 */}
          <div className="bg-white text-black rounded-xl p-4 shadow-lg">
            <p className="text-base font-semibold">나의 야구온도는?</p>
            <div className="flex items-center mt-4">
              <span className="text-4xl font-bold text-red-500">{baseballTemp}°</span>
              <div className="flex-grow ml-4 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${baseballTemp}%` }}></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              0000명 중 상위 {tempPercent}%예요!
            </p>
          </div>
          {/* 1월 출석체크 카드 */}
          <div className="bg-white text-black rounded-xl p-4 shadow-lg">
            <div className="flex justify-between items-center">
              <p className="text-base font-semibold">{attendanceMonth}월 출석체크</p>
              <p className="text-red-500 font-bold">
                {attendanceCount}/{attendanceMax}일 출석 중
              </p>
            </div>
            <select
              value={attendanceMonth}
              onChange={(e) => setAttendanceMonth(parseInt(e.target.value))}
              className="px-3 py-1 rounded-lg text-sm bg-gray-200 text-black"
            >
              {[...Array(12)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}월
                </option>
              ))}
            </select>
          </div>
          {/* 2024년 나의 직관 카드 */}
          <div className="bg-white text-black rounded-xl p-4 shadow-lg">
            <p className="text-base font-semibold">
              2024년 나의 직관{" "}
              <span className="text-sm text-red-500 ml-2">직관 승률 {directWatchWinRate}%</span>
            </p>
            <p className="text-xs text-gray-500 mt-1 mb-2">
              {directWatchCount}회의 직관 중 {directWatchWin}회 승리했어요.
            </p>
            <div className="flex justify-start items-center mb-4">
              <button
                className="w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-0"
                style={{ backgroundColor: "transparent", border: "none", outline: "none" }}
                onClick={() => setSortOrder((prev) => (prev === "recent" ? "oldest" : "recent"))}
              >
                <img
                  src={sortOrder === "recent" ? RecentIcon : OldestIcon}
                  alt={sortOrder === "recent" ? "최근순 아이콘" : "오래된순 아이콘"}
                  className="w-6 h-6"
                />
              </button>
            </div>
            <ul className="space-y-2">
              {displayedMatches.map((match) => (
                <li key={match.id} className="border-b pb-2 text-sm last:border-b-0">
                  롯데 {match.homeScore} vs {match.awayScore} 한화 ({match.date})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default MainPage;