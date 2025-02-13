// MainPage.tsx (방법 1 - 모든 스타일을 인라인으로 적용)
import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import "../components/Navbar";
import "../../styles.css";  // 다른 전역 스타일이 있다면 그대로 유지

// 이미지 및 아이콘 임포트
import BevoliLogo from "../assets/main/BevoliLogo.svg";
import NotificationIcon from "../assets/main/NotificationIcon.svg";
import LotteLogo from "../assets/team/LotteLogo.svg";
import HanwhaLogo from "../assets/team/HanwhaLogo.svg";
import RecentIcon from "../assets/main/RecentIcon.svg";
import OldestIcon from "../assets/main/OldestIcon.svg";

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
    // 루트 div: 배경 그라데이션, 최소 높이, 텍스트 흰색, 상대 위치 지정
    <div
      style={{
        background: "linear-gradient(to bottom, #ef4444, #fb923c)",
        minHeight: "100vh",
        color: "white",
        position: "relative",
      }}
    >
      {/* 배경 콘텐츠 영역 */}
      <div style={{ zIndex: 0 }}>
        {/* 헤더 */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <img
            src={BevoliLogo}
            alt="Bevoli Logo"
            style={{ height: "3rem", width: "auto" }}
          />
          <img
            src={NotificationIcon}
            alt="Notification Icon"
            style={{ height: "1.5rem", cursor: "pointer" }}
          />
        </header>

        {/* 인사말 섹션 */}
        <section
          style={{
            textAlign: "center",
            margin: "0.5rem 0",
            padding: "0 1rem",
          }}
        >
          <p style={{ fontSize: "1.125rem" }}>
            안녕하세요! <span style={{ fontWeight: "bold" }}>{userName}님</span>
            <br />
            오늘의 경기를 확인해보세요.
          </p>
        </section>

        {/* 경기 예정 카드 */}
        <section
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "0.75rem", // rounded-xl
            margin: "0 1rem",        // mx-4
            padding: "1rem",         // p-4
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)", // shadow-lg
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={LotteLogo}
              alt="Lotte Logo"
              style={{ transform: "scale(1.8)",height: "2.5rem", width: "2.5rem" }} // h-10 w-10
            />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>경기 예정</p>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>18:00</p>
            </div>
            <img
              src={HanwhaLogo}
              alt="Hanwha Logo"
              style={{transform: "scale(1.8)", height: "2.5rem", width: "2.5rem" }} // h-10 w-10
            />
          </div>
        </section>
      </div>

      {/* BottomSheet 영역 */}
      <BottomSheet
        open={true}
        blocking={false}
        defaultSnap={() => 250} // 기본 높이
        snapPoints={() => [500, 850]} // 최소 및 최대 높이
        header={
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0.5rem",
              pointerEvents: "auto", // 헤더 부분의 pointer-events 활성화
            }}
          >
            <div
              style={{
                width: "3rem", // w-12 (3rem)
                height: "0.25rem", // h-1 (0.25rem)
                borderRadius: "9999px", // rounded-full
                backgroundColor: "#D1D5DB", // bg-gray-300
              }}
            ></div>
          </div>
        }
      >
        <div
          style={{
            padding: "0 1rem",
            paddingBottom: "5rem", // pb-20 (approx.)
            pointerEvents: "auto", // 내부 컨텐츠의 pointer-events 활성화
          }}
        >
          {/* 나의 야구온도 카드 */}
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "0.75rem",
              padding: "1rem",
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
              marginBottom: "1rem",
            }}
          >
            <p style={{ fontSize: "1rem", fontWeight: 600 }}>나의 야구온도는?</p>
            <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
              <span
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  color: "#EF4444",
                }}
              >
                {baseballTemp}°
              </span>
              <div
                style={{
                  flexGrow: 1,
                  marginLeft: "1rem",
                  backgroundColor: "#E5E7EB",
                  height: "0.5rem",
                  borderRadius: "9999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#EF4444",
                    height: "100%",
                    transition: "all 300ms",
                    width: `${baseballTemp}%`,
                  }}
                ></div>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6B7280",
                marginTop: "0.5rem",
              }}
            >
              0000명 중 상위 {tempPercent}%예요!
            </p>
          </div>

          {/* 1월 출석체크 카드 */}
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "0.75rem",
              padding: "1rem",
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "1rem", fontWeight: 600 }}>
                {attendanceMonth}월 출석체크
              </p>
              <p style={{ color: "#EF4444", fontWeight: "bold" }}>
                {attendanceCount}/{attendanceMax}일 출석 중
              </p>
            </div>
            <select
              value={attendanceMonth}
              onChange={(e) => setAttendanceMonth(parseInt(e.target.value))}
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                backgroundColor: "#E5E7EB",
                color: "black",
                border: "none",
                marginTop: "0.5rem",
                width: "100%",
              }}
            >
              {[...Array(12)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}월
                </option>
              ))}
            </select>
          </div>

          {/* 2024년 나의 직관 카드 */}
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "0.75rem",
              padding: "1rem",
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ fontSize: "1rem", fontWeight: 600 }}>
              2024년 나의 직관{" "}
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#EF4444",
                  marginLeft: "0.5rem",
                }}
              >
                직관 승률 {directWatchWinRate}%
              </span>
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#6B7280",
                marginTop: "0.25rem",
                marginBottom: "0.5rem",
              }}
            >
              {directWatchCount}회의 직관 중 {directWatchWin}회 승리했어요.
            </p>
            {/* 아이콘 버튼을 오른쪽 정렬하고, 크기를 키움 */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end", // 오른쪽 정렬
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <button
                onClick={() =>
                  setSortOrder((prev) =>
                    prev === "recent" ? "oldest" : "recent"
                  )
                }
                style={{
                  width: "3rem",   // 버튼 크기를 약간 키움
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  src={sortOrder === "recent" ? RecentIcon : OldestIcon}
                  alt={
                    sortOrder === "recent"
                      ? "최근순 아이콘"
                      : "오래된순 아이콘"
                  }
                  style={{ transform: "scale(2) translateX(-20%)", // 2배 확대
                    width: "50rem !important", height: "50rem !important" }}
                  />
              </button>
            </div>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                lineHeight: "1.5",
              }}
            >
              {displayedMatches.map((match) => (
                <li
                  key={match.id}
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                    paddingBottom: "0.5rem",
                    fontSize: "0.875rem",
                  }}
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
