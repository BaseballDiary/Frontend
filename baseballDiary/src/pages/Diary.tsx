import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
// 팀 로고 import
import lotte from "../assets/team/lotte.png";
import doosan from "../assets/team/doosan.png";
import samsung from "../assets/team/samsung.png";
import kiwoom from "../assets/team/kiwoom.png";
import hanhwa from "../assets/team/hanhwa.png";
import kia from "../assets/team/kia.png";
import kt from "../assets/team/kt.png";
import nc from "../assets/team/nc.png";
import lg from "../assets/team/lg.png";
import ssg from "../assets/team/ssg.png";
import kbo from "../assets/team/KBO.png";

// 감정 icon import
import feeling1 from "../assets/feeling/feeling1.svg"
import feeling2 from "../assets/feeling/feeling2.svg"
import feeling3 from "../assets/feeling/feeling3.svg"
import feeling4 from "../assets/feeling/feeling4.svg"
import feeling5 from "../assets/feeling/feeling5.svg"

// 팀 로고 매핑
const teamLogos: { [key: string]: string } = {
  Lotte: lotte,
  Doosan: doosan,
  Samsung: samsung,
  Kiwoom: kiwoom,
  Hanwha: hanhwa,
  Kia: kia,
  KT: kt,
  NC: nc,
  LG: lg,
  SSG: ssg,
  KBO: kbo, // 기본 로고
};


interface GameRecord {
  id: number;
  result: "승리" | "패배";
  score: string;
  team1: string;
  team2: string;
  feeling: number;
}

const Diary = () => {
  const navigate = useNavigate();
  const [gameRecords, setGameRecords] = useState<GameRecord[]>([]);
  const [selectedYear, setSelectedYear] = useState(2024); // 연도 선택

  // 데이터 로드 (향후 API 연동을 고려)
  useEffect(() => {
    const fetchGameRecords = async () => {
        try {
          const data: GameRecord[] = [
            { id: 1, result: "승리", score: "11 - 5", team1: "Hanwha", team2: "Lotte", feeling: 3 },
            { id: 2, result: "패배", score: "5 - 11", team1: "Samsung", team2: "Doosan", feeling: 1 },
            { id: 3, result: "승리", score: "11 - 5", team1: "Kia", team2: "KT", feeling: 5 },
            { id: 4, result: "승리", score: "11 - 5", team1: "NC", team2: "LG", feeling: 2 },
          ];
          setGameRecords(data);
        } catch (error) {
          console.error("데이터 불러오기 실패", error);
        }
      };

    fetchGameRecords();
  }, [selectedYear]); // 연도 변경 시 데이터 갱신

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        color: "black",
        position: "relative",
        paddingBottom: "4rem", // FAB 버튼이 떠있을 공간 확보
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#EF4444",
          color: "white",
          textAlign: "center",
          padding: "1rem",
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
      >
        야구일기
      </header>

      {/* Year Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        {[2024, 2023, 2022, 2021, 2020].map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              backgroundColor: year === selectedYear ? "#EF4444" : "transparent",
              color: year === selectedYear ? "white" : "#6B7280",
              fontWeight: "bold",
              transition: "background 0.3s",
            }}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Statistics */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        <div
          style={{
            border: "1px solid #E5E7EB",
            padding: "1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#EF4444", fontSize: "0.875rem" }}>나의 직관</p>
          <p style={{ fontSize: "1.125rem", fontWeight: "bold" }}>6승 1패 0무/7경기</p>
          <p style={{ color: "#EF4444", fontSize: "1.5rem", fontWeight: "bold" }}>86%</p>
        </div>
        <div
          style={{
            border: "1px solid #E5E7EB",
            padding: "1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>우리팀</p>
          <p style={{ fontSize: "1.125rem", fontWeight: "bold" }}>87승 55패 2무 / 144경기</p>
          <p style={{ color: "#6B7280", fontSize: "1.5rem", fontWeight: "bold" }}>61%</p>
        </div>
      </div>

      {/* Tabs (직관/집관) */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        {["직관", "집관"].map((tab, index) => (
          <button
            key={tab}
            style={{
              flex: 1,
              padding: "0.5rem 0",
              fontWeight: "bold",
              textAlign: "center",
              borderBottom: index === 0 ? "2px solid #EF4444" : "none",
              color: index === 0 ? "#EF4444" : "#6B7280",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Game List */}
<div style={{ padding: "1rem" }}>
  {gameRecords.map((game) => {
    // 점수 비교해서 승리한 팀 결정
    const [score1, score2] = game.score.split(" - ").map(Number);
    const isTeam1Winner = score1 > score2;

    // feeling 값에 따라 아이콘 매핑
    const feelingIcons: { [key: number]: string } = {
      1: feeling1,
      2: feeling2,
      3: feeling3,
      4: feeling4,
      5: feeling5,
    };

    // 🛠 **팀 로고를 올바르게 매핑 (대소문자 문제 해결)**
    const formatTeamName = (team: string) =>
      team.charAt(0).toUpperCase() + team.slice(1).toLowerCase();

    const team1Logo = teamLogos[formatTeamName(game.team1)] || teamLogos["KBO"];
    const team2Logo = teamLogos[formatTeamName(game.team2)] || teamLogos["KBO"];

    return (
      <div
        key={game.id}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          border: "1px solid #E5E7EB",
          marginBottom: "0.5rem",
        }}
      >
        {/* 왼쪽 아이콘 (feeling 아이콘) */}
        <img
          src={feelingIcons[game.feeling] || feeling1} // 기본값 feeling1
          alt="feeling icon"
          style={{ width: "48px", height: "48px", marginRight: "12px" }}
        />

        {/* 경기 정보 컨테이너 */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* 상단 날짜 & 장소 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#6B7280",
              fontSize: "0.875rem",
              marginBottom: "8px",
            }}
          >
            <p>01.45(수) 18:00</p>
            <p>잠실</p>
          </div>

          {/* 경기 내용 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* 팀 1 (좌측) */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
              <img
                src={team1Logo}
                alt={game.team1}
                style={{ width: "40px", height: "40px" }}
              />
              <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>{game.team1}</p>
            </div>

            {/* 경기 결과 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center" }}>
              <p style={{ fontWeight: "bold", color: game.result === "승리" ? "#10B981" : "#EF4444" }}>
                {game.result}
              </p>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                <span style={{ fontWeight: isTeam1Winner ? "800" : "400" }}>{score1}</span>
                {" - "}
                <span style={{ fontWeight: !isTeam1Winner ? "800" : "400" }}>{score2}</span>
              </p>
            </div>

            {/* 팀 2 (우측) */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
              <img
                src={team2Logo}
                alt={game.team2}
                style={{ width: "40px", height: "40px" }}
              />
              <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>{game.team2}</p>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>

      {/* Floating Action Button */}
      <button
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          backgroundColor: "#EF4444",
          color: "white",
          padding: "1rem",
          borderRadius: "50%",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          cursor: "pointer",
        }}
        onClick={() => navigate("/diary/create")}
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default Diary;