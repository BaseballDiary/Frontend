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

// 출석 아이콘 import
import circle from "../assets/circle.svg";
import redCircle from "../assets/red-circle.png";
import check from "../assets/check.svg";
import crossCircle from "../assets/cross.png";

// 출석 관련 인터페이스 (is_attendance 사용)
interface AttendanceDay {
  date: string;
  day: string;
  is_attendance: number;
}

// 날짜를 "YYYY-MM-DD" 형식으로 반환하는 helper 함수 (local time 기준)
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// dummy 데이터 생성 함수 (예: 2월 dummy 데이터)
const getDummyAttendanceWeeks = (year: number, month: number): { week: string; days: AttendanceDay[] }[] => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const allDays: AttendanceDay[] = [];
  let d = new Date(startDate);
  while (d <= endDate) {
    const dayNum = d.getDate();
    let is_attendance = 0;
    if (month === 2 && dayNum <= 19) {
      // 2월 1일 ~ 19일: 짝수 날짜는 출석, 홀수 날짜는 미출석
      is_attendance = dayNum % 2 === 0 ? 1 : 0;
    } else {
      is_attendance = 0;
    }
    allDays.push({
      date: formatDate(d),
      day: ["일", "월", "화", "수", "목", "금", "토"][d.getDay()],
      is_attendance,
    });
    d.setDate(d.getDate() + 1);
  }
  const groupedWeeks = [];
  for (let i = 0; i < allDays.length; i += 7) {
    const weekDays = allDays.slice(i, i + 7);
    groupedWeeks.push({
      week: `${month}월 ${Math.floor(i / 7) + 1}주차`,
      days: weekDays,
    });
  }
  return groupedWeeks;
};

const MainPage: React.FC = () => {
  // MainPage 관련 상태
  const [attendanceMonth, setAttendanceMonth] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  // API에서 받아올 데이터: nickname, temperature, gameInfo
  const [nickname, setNickname] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0);
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

  // 사용자 정보 API 호출
  useEffect(() => {
    fetch("/info", { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setNickname(data.nickname);
        setGameInfo(data.gameInfo);
        if (data.gameInfo && typeof data.gameInfo === "object" && data.gameInfo.temperature) {
          setTemperature(data.gameInfo.temperature);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);
        // fallback dummy 데이터
        setNickname("DummyUser");
        setTemperature(50);
      });
  }, []);

  // 오늘 날짜 (local 기준 "YYYY-MM-DD")
  const today = formatDate(new Date());
  // 기준 연도를 2025로 고정
  const currentYear = 2025;

  // 출석 데이터를 주별로 그룹화하여 저장할 상태
  const [attendanceWeeks, setAttendanceWeeks] = useState<{ week: string; days: AttendanceDay[] }[]>([]);

  // 선택한 월의 출석 데이터를 API로부터 받아와 그룹화 (local 날짜 포맷 사용)
  useEffect(() => {
    fetch(`/home/viewAttendance?month=${attendanceMonth}`)
      .then((res) => res.json())
      .then((attendanceDates) => {
        if (!Array.isArray(attendanceDates)) {
          attendanceDates = [];
        }
        const startDate = new Date(currentYear, attendanceMonth - 1, 1);
        const endDate = new Date(currentYear, attendanceMonth, 0);
        const allDays: AttendanceDay[] = [];
        let d = new Date(startDate);
        while (d <= endDate) {
          const dateStr = formatDate(d);
          allDays.push({
            date: dateStr,
            day: ["일", "월", "화", "수", "목", "금", "토"][d.getDay()],
            is_attendance: attendanceDates.includes(dateStr) ? 1 : 0,
          });
          d.setDate(d.getDate() + 1);
        }
        const groupedWeeks = [];
        for (let i = 0; i < allDays.length; i += 7) {
          const weekDays = allDays.slice(i, i + 7);
          groupedWeeks.push({
            week: `${attendanceMonth}월 ${Math.floor(i / 7) + 1}주차`,
            days: weekDays,
          });
        }
        setAttendanceWeeks(groupedWeeks);
      })
      .catch((error) => {
        console.error("Failed to fetch attendance data:", error);
        // fallback: dummy attendance data
        setAttendanceWeeks(getDummyAttendanceWeeks(currentYear, attendanceMonth));
      });
  }, [attendanceMonth, today, currentYear]);

  // 출석 아이콘 선택 함수 (import한 아이콘 사용)
  // 조건:
  // - is_attendance가 1이면 check
  // - 오늘 날짜이고 아직 출석되지 않았다면 redCircle
  // - 오늘보다 이전인데 출석되지 않았다면 crossCircle
  // - 오늘보다 이후이면 circle
  const getStatusIcon = (date: string, is_attendance: number) => {
    if (is_attendance === 1) return check;
    if (date === today) return redCircle;
    if (date < today) return crossCircle;
    return circle;
  };

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
          <img src={BevoliLogo} alt="Bevoli Logo" style={{ height: "3rem", width: "auto" }} />
          <img src={NotificationIcon} alt="Notification Icon" style={{ height: "1.5rem", cursor: "pointer" }} />
        </header>

        {/* 인사말 섹션 */}
        <section style={{ textAlign: "center", margin: "0.5rem 0", padding: "0 1rem" }}>
          <p style={{ fontSize: "1.125rem" }}>
            안녕하세요! <span style={{ fontWeight: "bold" }}>{nickname}</span>
            <br />
            오늘의 경기를 확인해보세요.
          </p>
        </section>

        {/* 경기 예정 카드 */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>오늘의 경기가 없습니다.</p>
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
        <div style={{ padding: "0 1rem", paddingBottom: "5rem", pointerEvents: "auto" }}>
          {/* 나의 야구온도 카드 (그대로 유지) */}
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "0.75rem",
              padding: "1rem",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
              marginBottom: "1rem",
            }}
          >
            <p style={{ fontSize: "1rem", fontWeight: 600 }}>나의 야구온도는?</p>
            <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
              <span style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#EF4444" }}>
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
            <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: "0.5rem" }}>
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
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: "1rem", fontWeight: 600 }}>{attendanceMonth}월 출석체크</p>
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

          {/* 출석 카드 (출석 Carousel inline) */}
          <div style={{ display: "flex", overflowX: "auto", gap: "1rem", padding: "1rem" }}>
            {attendanceWeeks.length > 0 ? (
              attendanceWeeks.map((weekData, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                    width: "20rem",
                    flexShrink: 0,
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontSize: "1.125rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {weekData.week}
                  </h2>
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    {weekData.days.map((day, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={getStatusIcon(day.date, day.is_attendance)}
                          alt={day.is_attendance === 1 ? "present" : "absent"}
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                        {/* 날짜 표시: 연도 제거 후 "MM-DD" 형식 */}
                        <span style={{ fontSize: "0.75rem", color: "#4B5563" }}>
                          {day.date.substring(5)}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{day.day}</span>
                      </div>
                    ))}
                  </div>
                  {/* 오늘 날짜가 포함되어 있고, 오늘 날짜가 아직 출석되지 않았다면 출석 버튼 표시 */}
                  {weekData.days.some((day) => day.date === today && day.is_attendance === 0) && (
                    <button
                      style={{
                        backgroundColor: "#EF4444",
                        color: "white",
                        width: "100%",
                        padding: "0.5rem 0",
                        borderRadius: "0.5rem",
                        transition: "all 200ms ease",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      출석하기
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p style={{ color: "black", fontSize: "1rem" }}>출석 데이터가 없습니다.</p>
            )}
          </div>

          {/* 2024년 나의 직관 카드 */}
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "0.75rem",
              padding: "1rem",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ fontSize: "1rem", fontWeight: 600 }}>
              2024년 나의 직관{" "}
              <span style={{ fontSize: "0.875rem", color: "#EF4444", marginLeft: "0.5rem" }}>
                직관 승률 {directWatchWinRate}%
              </span>
            </p>
            <p style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "0.25rem", marginBottom: "0.5rem" }}>
              {directWatchCount}회의 직관 중 {directWatchWin}회 승리했어요.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "1rem" }}>
              <button
                onClick={() => setSortOrder((prev) => (prev === "recent" ? "oldest" : "recent"))}
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
                  alt={sortOrder === "recent" ? "최근순 아이콘" : "오래된순 아이콘"}
                  style={{ transform: "scale(2) translateX(-20%)" }}
                />
              </button>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: "1.5" }}>
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