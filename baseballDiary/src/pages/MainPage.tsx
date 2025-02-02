import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

// 이미지 및 아이콘 임포트 (경로는 실제 프로젝트 구조에 맞게 수정)
import BevoliLogo from "../assets/main/BevoliLogo.svg";
import NotificationIcon from "../assets/main/NotificationIcon.svg";
import LotteLogo from "../assets/team/LotteLogo.svg";
import HanwhaLogo from "../assets/team/HanwhaLogo.svg";
import RecentIcon from "../assets/main/RecentIcon.svg";
import OldestIcon from "../assets/main/OldestIcon.svg";

/**
 * MainPage 컴포넌트
 * - 헤더, 인사, 경기정보 카드는 배경에 표시됨
 * - 나머지 내용(나의 야구온도, 출석체크, 직관 정보)은 Bottom Sheet 내부에 포함됨
 * - 반응형 웹앱 구조로 구성
 */
const MainPage: React.FC = () => {
  // 월별 출석체크 상태 (1 ~ 12)
  const [attendanceMonth, setAttendanceMonth] = useState<number>(1);

  // 직관 정보 정렬 상태 ("recent" 또는 "oldest")
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  // 임시 데이터 (추후 백엔드 연동 예정)
  const userName = "000"; // 사용자 이름
  const baseballTemp = 88; // 야구 온도
  const tempPercent = 0; // 상위 퍼센트
  const attendanceCount = 23; // 1월 기준 출석일수
  const attendanceMax = 30; // 1월 기준 총 일수
  const directWatchCount = 13; // 직관 경기 수
  const directWatchWin = 6; // 직관 승리 경기 수

  // 직관 성공률 계산 (예: 86%)
  const directWatchWinRate = Math.round((directWatchWin / directWatchCount) * 100);

  // 임시 데이터: 최근 및 오래된 순 직관 경기 정보 배열
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

  // 정렬 상태에 따른 경기 정보 표시 데이터 결정
  const displayedMatches = sortOrder === "recent" ? recentMatches : oldestMatches;

  return (
    <div className="app-container relative bg-gradient-to-b from-red-500 to-orange-400 min-h-screen text-white">
      {/* 
        배경 콘텐츠 영역
        헤더, 인사, 경기정보 카드를 담아서 bottom sheet의 뒤쪽에 보이도록 배치 
      */}
      <div className="z-0">
        {/* 헤더 영역 */}
        <header className="flex justify-between items-center p-4">
          <img src={BevoliLogo} alt="Bevoli Logo" className="h-8" />
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
      </div>

      {/*
        Bottom Sheet 영역
        - react-spring-bottom-sheet를 사용하여 화면 하단에 패널 형태로 구현
        - open을 true로 하여 항상 표시 (추후 필요에 따라 상태 관리 가능)
        - defaultSnap 및 snapPoints로 초기 높이 및 스냅 포인트 설정 (반응형 고려)
        - header 부분에 드래그 핸들을 추가해 사용자에게 패널 조작 가능함을 암시
      */}
      <BottomSheet
        // open={true}
        // // 최대 높이의 50%를 기본으로 열림 (필요에 따라 조정 가능)
        // defaultSnap={({ maxHeight }) => maxHeight * 0.5}
        // // 패널 높이 스냅 포인트 (50%와 90%로 조절)
        // snapPoints={({ maxHeight }) => [maxHeight * 0.5, maxHeight * 0.9]}
        // // 드래그 핸들(header) 영역
        // header={
        //   <div className="w-full flex justify-center p-2">
        //     <div className="w-12 h-1 rounded-full bg-gray-300"></div>
        //   </div>
        // }
      
        open={true}
        defaultSnap={() => 300} // 혹은 상황에 맞게 함수형태로 작성
        snapPoints={() => [300, 500]} // 함수를 전달하여 고정된 배열을 반환
        header={
          <div className="w-full flex justify-center p-2">
            <div className="w-12 h-1 rounded-full bg-gray-300"></div>
          </div>
        }
      >
        {/* Bottom Sheet 내부 스크롤 가능한 콘텐츠 */}
        <div className="px-4 space-y-6 pb-20">
          {/* 나의 야구온도 카드 */}
          <div className="bg-white text-black rounded-xl p-4 shadow-lg">
            <p className="text-base font-semibold">나의 야구온도는?</p>
            <div className="flex items-center mt-4">
              <span className="text-4xl font-bold text-red-500">{baseballTemp}°</span>
              <div className="flex-grow ml-4 bg-gray-200 h-2 rounded-full overflow-hidden">
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
            {/* 출석체크 달 선택 토글 (1 ~ 12월) */}
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
              2024년 나의 직관{" "}
              <span className="text-sm text-red-500 ml-2">
                직관 승률 {directWatchWinRate}%
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1 mb-2">
              {directWatchCount}회의 직관 중 {directWatchWin}회 승리했어요.
            </p>

            {/* 최근순 / 오래된순 토글 영역 */}
            <div className="flex justify-start items-center mb-4">
              <button
                className="w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-0"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                }}
                onClick={() =>
                  setSortOrder((prev) => (prev === "recent" ? "oldest" : "recent"))
                }
              >
                <img
                  src={sortOrder === "recent" ? RecentIcon : OldestIcon}
                  alt={
                    sortOrder === "recent"
                      ? "최근순 아이콘"
                      : "오래된순 아이콘"
                  }
                  className="w-6 h-6"
                />
              </button>
            </div>

            {/* 직관 경기 리스트 */}
            <ul className="space-y-2">
              {displayedMatches.map((match) => (
                <li
                  key={match.id}
                  className="border-b pb-2 text-sm last:border-b-0"
                >
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