import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";


interface GameRecord {
  id: number;
  result: "승리" | "패배";
  score: string;
  team1: string;
  team2: string;
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
          { id: 1, result: "승리", score: "11 - 5", team1: "Eagles", team2: "Giants" },
          { id: 2, result: "패배", score: "5 - 11", team1: "Eagles", team2: "Giants" },
          { id: 3, result: "승리", score: "11 - 5", team1: "Eagles", team2: "Giants" },
          { id: 4, result: "승리", score: "11 - 5", team1: "Eagles", team2: "Giants" },
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
        {gameRecords.map((game) => (
          <div
            key={game.id}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F3F4F6",
              padding: "1rem",
              borderRadius: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                backgroundColor: "#3B82F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              P
            </div>
            <div style={{ marginLeft: "1rem", flex: 1 }}>
              <p
                style={{
                  color: game.result === "승리" ? "#10B981" : "#EF4444",
                  fontWeight: "bold",
                }}
              >
                {game.result}
              </p>
              <p style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
                {game.team1} {game.score} {game.team2}
              </p>
            </div>
          </div>
        ))}
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