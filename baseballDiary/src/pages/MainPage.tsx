import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import "../components/Navbar";
import "../../styles.css";

// 이미지 및 아이콘 임포트
import BevoliLogo from "../assets/main/BevoliLogo.svg";
import NotificationIcon from "../assets/main/NotificationIcon.svg";
import LotteLogo from "../assets/team/LotteLogo.svg";
import HanwhaLogo from "../assets/team/HanwhaLogo.svg";
import RecentIcon from "../assets/main/RecentIcon.svg";
import OldestIcon from "../assets/main/OldestIcon.svg";

const MainPage: React.FC = () => {
  const [attendanceMonth, setAttendanceMonth] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  // API로부터 받아올 데이터: nickname과 temperature
  const [nickname, setNickname] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0);
  // 백엔드로부터 받아온 gameInfo는 사용하지 않습니다.
  const [gameInfo, setGameInfo] = useState<any>(null);

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

  // API 호출: /info 엔드포인트로부터 사용자 정보 받아오기
  useEffect(() => {
    fetch("/info", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNickname(data.nickname);
        setGameInfo(data.gameInfo); // 받아오긴 하지만 사용하지 않습니다.
        // temperature 정보가 있을 경우 업데이트 (없으면 기본값 0 유지)
        if (data.gameInfo && typeof data.gameInfo === "object" && data.gameInfo.temperature) {
          setTemperature(data.gameInfo.temperature);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);
      });
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #ef4444, #fb923c)",
        minHeight: "100vh",
        color: "white",
        position: "relative",
      }}
    >
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
            안녕하세요! <span style={{ fontWeight: "bold" }}>{nickname}</span>
            <br />
            오늘의 경기를 확인해보세요.
          </p>
        </section>

        {/* 경기 예정 카드 - 항상 "오늘의 경기가 없습니다."로 고정 */}
        
          
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                오늘의 경기가 없습니다.
              </p>
            </div>
      </div>

      {/* BottomSheet 영역 */}
      <BottomSheet
        open={true}
        blocking={false}
        defaultSnap={() => 250}
        snapPoints={() => [500, 850]}
        header={
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0.5rem",
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "0.25rem",
                borderRadius: "9999px",
                backgroundColor: "#D1D5DB",
              }}
            ></div>
          </div>
        }
      >
        <div
          style={{
            padding: "0 1rem",
            paddingBottom: "5rem",
            pointerEvents: "auto",
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
            <p style={{ fontSize: "1rem", fontWeight: 600 }}>
              나의 야구온도는?
            </p>
            <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
              <span
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  color: "#EF4444",
                }}
              >
                {temperature}°
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
                    width: `${temperature}%`,
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
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
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
                  width: "3rem",
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
                  style={{
                    transform: "scale(2) translateX(-20%)",
                  }}
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