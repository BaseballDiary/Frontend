import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit } from "react-icons/fa";
import styled from "styled-components";

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
import feeling1 from "../assets/feeling/feeling1.svg";
import feeling2 from "../assets/feeling/feeling2.svg";
import feeling3 from "../assets/feeling/feeling3.svg";
import feeling4 from "../assets/feeling/feeling4.svg";
import feeling5 from "../assets/feeling/feeling5.svg";

// Styled WriteButton: 항상 보이는 글쓰기 버튼
const WriteButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #f8223b;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

// FixedTopContainer: 헤더부터 직관/집관 탭까지 고정
const FixedTopContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 99;
`;

// Styled TabContainer (고정 영역 내부에 포함)
const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid #E5E7EB;
`;

// Styled Tab (active 상태에 따라 스타일 변경)
const Tab = styled.div<{ $active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  font-size: 16px;
  color: ${({ $active }) => ($active ? "#f8223b" : "#999")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  border-bottom: ${({ $active }) => ($active ? "3px solid #f8223b" : "none")};
`;

// 팀 로고 객체
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
  KBO: kbo,
};

interface GameRecord {
  id: number;
  result: "승리" | "패배";
  score: string;
  team1: string;
  team2: string;
  feeling: number;
  attendance: "직관" | "집관";
}

// dummy data에 attendance 필드 추가 (더 필요하면 추가 가능)
const dummyGames: GameRecord[] = [
  { id: 1, result: "승리", score: "11 - 5", team1: "Hanwha", team2: "Lotte", feeling: 3, attendance: "직관" },
  { id: 2, result: "패배", score: "5 - 11", team1: "Samsung", team2: "Doosan", feeling: 1, attendance: "집관" },
  { id: 3, result: "승리", score: "11 - 5", team1: "Kia", team2: "KT", feeling: 5, attendance: "직관" },
  { id: 4, result: "승리", score: "11 - 5", team1: "NC", team2: "LG", feeling: 2, attendance: "집관" },
  { id: 5, result: "패배", score: "7 - 3", team1: "Hanwha", team2: "Lotte", feeling: 4, attendance: "직관" },
];

// 내 팀(dummyMyTeam)과 한글 팀 이름 매핑 (kbo 제외)
const dummyMyTeam = "hanhwa";
const teamNames: { [key: string]: string } = {
  lotte: "롯데",
  doosan: "두산",
  samsung: "삼성",
  kiwoom: "키움",
  hanhwa: "한화",
  kia: "기아",
  kt: "KT",
  nc: "NC",
  lg: "LG",
  ssg: "SSG",
};

const Diary = () => {
  const navigate = useNavigate();
  const [gameRecords, setGameRecords] = useState<GameRecord[]>([]);
  const [selectedYear, setSelectedYear] = useState(2024);
  // 탭 상태: "직관" 또는 "집관"
  const [activeAttendance, setActiveAttendance] = useState<"직관" | "집관">("직관");

  useEffect(() => {
    // dummy data 사용
    setGameRecords(dummyGames);
  }, [selectedYear]);

  const filteredRecords = gameRecords.filter(
    (record) => record.attendance === activeAttendance
  );

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        color: "black",
        position: "relative",
        paddingBottom: "4rem",
      }}
    >
      {/* 고정된 상단 영역: Header, Year Tabs, Statistics, 직관/집관 탭 */}
      <FixedTopContainer>
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
              onClick={() => {
                setSelectedYear(year);
              }}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                backgroundColor: year === selectedYear ? "#EF4444" : "transparent",
                color: year === selectedYear ? "white" : "#6B7280",
                fontWeight: "bold",
                transition: "background 0.3s",
                border: "none",
                cursor: "pointer",
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

        {/* 직관/집관 탭 */}
        <TabContainer>
          <Tab
            $active={activeAttendance === "직관"}
            onClick={() => setActiveAttendance("직관")}
          >
            직관
          </Tab>
          <Tab
            $active={activeAttendance === "집관"}
            onClick={() => setActiveAttendance("집관")}
          >
            집관
          </Tab>
        </TabContainer>
      </FixedTopContainer>

      {/* Game List: 고정 영역 높이(예: 300px)만큼 margin-top 적용 */}
      <div style={{ padding: "1rem", marginTop: "380px", height: "calc(100vh - 300px)", overflowY: "auto" }}>
        {filteredRecords.map((game) => {
          const [score1, score2] = game.score.split(" - ").map(Number);
          const isTeam1Winner = score1 > score2;
          const feelingIcons: { [key: number]: string } = {
            1: feeling1,
            2: feeling2,
            3: feeling3,
            4: feeling4,
            5: feeling5,
          };

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
              <img
                src={feelingIcons[game.feeling] || feeling1}
                alt="feeling icon"
                style={{ width: "48px", height: "48px", marginRight: "12px" }}
              />
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                    <img
                      src={teamLogos["Hanwha"]}
                      alt="Hanwha"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p style={{ fontSize: "0.875rem", marginTop: "4px", fontWeight: "bold" }}>한화</p>
                  </div>
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
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                    <img
                      src={teamLogos["Lotte"]}
                      alt="Lotte"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p style={{ fontSize: "0.875rem", marginTop: "4px", fontWeight: "bold" }}>롯데</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* WriteButton: 글쓰기 버튼 항상 보이도록 */}
      <WriteButton onClick={() => navigate("/diary/new")}>
        <FaEdit size={24} color="white" />
      </WriteButton>
    </div>
  );
};

export default Diary;