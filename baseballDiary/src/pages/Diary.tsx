import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import styled from "styled-components";
import { getTeamStat, getMyStat, getDiary, DiaryResponse } from "../api/MydiaryApi";

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

// Styled WriteButton
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

// FixedTopContainer: 헤더부터 탭까지 고정 영역
const FixedTopContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 99;
`;

// TabContainer 및 Tab
const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
`;
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

// 게임 기록 인터페이스 (Diary 페이지에서 사용하는 인터페이스)
interface GameRecordDisplay {
  id: number;
  result: "승리" | "패배";
  score: string;
  team1: string;
  team2: string;
  feeling: number;
  attendance: "직관" | "집관";
  date?: string;
  dayOfWeek?: string;
  time?: string;
  location?: string;
  uploadImages?: any;
  content?: string;
}

// 통계 인터페이스
interface TeamStat {
  teamWins: number;
  teamLosses: number;
  teamDraws: number;
  teamGames: number;
  teamWinRate: number;
}
interface MyStat {
  myWins: number;
  myLosses: number;
  myDraws: number;
  myGames: number;
  myWinRate: number;
}

const Diary = () => {
  const navigate = useNavigate();
  const [diaryList, setDiaryList] = useState<GameRecordDisplay[]>([]);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeAttendance, setActiveAttendance] = useState<"직관" | "집관">("직관");
  const [teamStat, setTeamStat] = useState<TeamStat | null>(null);
  const [myStat, setMyStat] = useState<MyStat | null>(null);

  // API 호출: Diary (일기) 데이터
  useEffect(() => {
    // 탭에 따라 엔드포인트의 쿼리 파라미터 결정
    const attendanceType = activeAttendance === "직관" ? "onSite" : "atHome";
    getDiary(`${selectedYear}`, attendanceType)
      .then((data: DiaryResponse) => {
        console.log("Diary API Response:", data);
        const diaryListFromApi: GameRecordDisplay[] = data.data.diaryList.map((d, index) => ({
          id: index,
          result: d.result ? "승리" : "패배",
          score: `${d.score.myScore} - ${d.score.opponentScore}`,
          team1: d.score.myTeam,
          team2: d.score.opponentTeam,
          feeling: d.feeling,
          attendance: activeAttendance,
          date: d.date,
          dayOfWeek: d.dayOfWeek,
          time: d.time,
          location: d.stadium, // stadium 필드를 location으로 매핑
          uploadImages: d.uploadImages,
          content: d.content,
        }));
        setDiaryList(diaryListFromApi);
      })
      .catch((error) => console.error("Diary API fetch error:", error));
  }, [selectedYear, activeAttendance]);

  // API 호출: 나의 직관 통계
  useEffect(() => {
    getTeamStat(selectedYear)
      .then((stat) => setTeamStat(stat))
      .catch((error) => console.error("팀 통계 가져오기 실패", error));
  }, [selectedYear]);

  // API 호출: 우리팀 통계
  useEffect(() => {
    getMyStat(selectedYear)
      .then((stat) => setMyStat(stat))
      .catch((error) => console.error("내 팀 통계 가져오기 실패", error));
  }, [selectedYear]);

  const filteredRecords = diaryList; // API 결과 그대로 사용

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
      <FixedTopContainer>
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
                border: "none",
                cursor: "pointer",
              }}
            >
              {year}
            </button>
          ))}
        </div>
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
            {myStat ? (
              <>
                <p style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
                  {myStat.myWins}승 {myStat.myLosses}패 {myStat.myDraws}무 / {myStat.myGames}경기
                </p>
                <p style={{ color: "#EF4444", fontSize: "1.5rem", fontWeight: "bold" }}>
                  {myStat.myWinRate}%
                </p>
              </>
            ) : (
              <p>로딩중...</p>
            )}
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
            {teamStat ? (
              <>
                <p style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
                  {teamStat.teamWins}승 {teamStat.teamLosses}패 {teamStat.teamDraws}무 / {teamStat.teamGames}경기
                </p>
                <p style={{ color: "#6B7280", fontSize: "1.5rem", fontWeight: "bold" }}>
                  {teamStat.teamWinRate}%
                </p>
              </>
            ) : (
              <p>로딩중...</p>
            )}
          </div>
        </div>
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
                cursor: "pointer",
              }}
              onClick={() =>
                navigate("/diary/detail", {
                  state: { game },
                })
              }
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
                  <p>
                    {game.date} ({game.dayOfWeek}) {game.time}
                  </p>
                  <p>{game.location}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                    <img
                      src={teamLogos[game.team1] || ""}
                      alt={game.team1}
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p style={{ fontSize: "0.875rem", marginTop: "4px", fontWeight: "bold" }}>
                      {game.team1 && game.team1.toLowerCase() in teamLogos ? teamLogos[game.team1] : ""}
                    </p>
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
                      src={teamLogos[game.team2] || ""}
                      alt={game.team2}
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p style={{ fontSize: "0.875rem", marginTop: "4px", fontWeight: "bold" }}>
                      {game.team2 && game.team2.toLowerCase() in teamLogos ? teamLogos[game.team2] : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <WriteButton onClick={() => navigate("/diary/new")}>
        <FaEdit size={24} color="white" />
      </WriteButton>
    </div>
  );
};

export default Diary;