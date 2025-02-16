import { useState } from "react";
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
import feeling1 from "../assets/feeling/feeling1.svg";
import feeling2 from "../assets/feeling/feeling2.svg";
import feeling3 from "../assets/feeling/feeling3.svg";
import feeling4 from "../assets/feeling/feeling4.svg";
import feeling5 from "../assets/feeling/feeling5.svg";
import check from "../assets/check.svg";
import circle from "../assets/circle.svg";
import NextButton from "../components/Next-button";

// 팀 로고 객체
const teamAssets = { lotte, doosan, samsung, kiwoom, hanhwa, kia, kt, nc, lg, ssg, kbo };
// 한글 팀 이름 매핑 (kbo 제외)
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
const teamMapping: { [key: string]: string } = {
  "한화": "hanhwa",
  "롯데": "lotte",
};
const feelingAssets = [feeling1, feeling2, feeling3, feeling4, feeling5];
const dummyMyTeam = "hanhwa";

const dummyGames = [
  { id: 1, date: "25.01.45", team1: "한화", team2: "롯데", score: "5 - 11", location: "잠실" },
  { id: 2, date: "25.01.45", team1: "한화", team2: "롯데", score: "5 - 11", location: "잠실" },
  { id: 3, date: "25.01.45", team1: "한화", team2: "롯데", score: "5 - 11", location: "잠실" },
  { id: 4, date: "25.01.45", team1: "한화", team2: "롯데", score: "5 - 11", location: "잠실" }
];

function DiaryNew() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [gameResults, setGameResults] = useState<typeof dummyGames>([]);
  const [selectedGame, setSelectedGame] = useState<typeof dummyGames[number] | null>(null);
  const [view, setView] = useState("search"); // search, select, write
  const [feeling, setFeeling] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [attendance, setAttendance] = useState<string | null>(null);

  // 팀 선택 모달 상태 관리
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const teamBoxStyle = {
    flex: 1,
    border: "1px solid gray",
    padding: "0.5rem",
    textAlign: "center" as const,
    cursor: "pointer",
    borderRadius: "8px",
  };

  const modalOverlayStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "600px",
  };

  // Search view: 날짜와 상대 팀 선택 검증
  const handleSearch = () => {
    if (!selectedDate) {
      alert("경기날짜를 선택하세요");
      return;
    }
    if (!selectedTeam) {
      alert("경기대상을 선택하세요");
      return;
    }
    setGameResults(dummyGames);
    setSelectedGame(null);
    setView("select");
  };

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
      {view === "search" && (
        <div style={{ padding: "1rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", textAlign: "left" }}>경기 검색</h2>
          <div style={{ textAlign: "left", marginTop: "1rem" }}>
            <span style={{ fontWeight: "normal" }}>경기날짜</span>
          </div>
          <input
            type="date"
            style={{
              width: "90%",
              border: "1px solid gray",
              padding: "0.5rem",
              marginTop: "0.5rem",
              borderRadius: "8px",
            }}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div style={{ textAlign: "left", marginTop: "1.5rem" }}>
            <span style={{ fontWeight: "normal" }}>경기대상</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <div
              style={{
                ...teamBoxStyle,
                width: "80px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={teamAssets[dummyMyTeam as keyof typeof teamAssets]}
                alt={dummyMyTeam}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: "bold", alignSelf: "center" }}>VS</div>
            <div
              style={{
                ...teamBoxStyle,
                width: "80px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => setIsTeamModalOpen(true)}
            >
              {selectedTeam ? (
                <img
                  src={teamAssets[selectedTeam as keyof typeof teamAssets]}
                  alt={selectedTeam}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                "선택해주세요"
              )}
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <NextButton text="검색하기" bgColor="red" width="100%" onClick={handleSearch} />
          </div>
          {isTeamModalOpen && (
            <div style={modalOverlayStyle}>
              <div style={modalStyle}>
                <h3 style={{ textAlign: "center", fontWeight: "bold" }}>팀 선택</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                    padding: "1rem",
                  }}
                >
                  {Object.keys(teamAssets)
                    .filter((team) => team !== "kbo")
                    .map((team) => (
                      <div
                        key={team}
                        onClick={() => {
                          setSelectedTeam(team);
                          setIsTeamModalOpen(false);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={teamAssets[team as keyof typeof teamAssets]}
                          alt={team}
                          style={{ width: "50px" }}
                        />
                        <span style={{ fontSize: "0.875rem", marginTop: "4px" }}>
                          {teamNames[team]}
                        </span>
                      </div>
                    ))}
                </div>
                <NextButton text="닫기" bgColor="gray" width="100%" onClick={() => setIsTeamModalOpen(false)} />
              </div>
            </div>
          )}
        </div>
      )}
      {view === "select" && (
        <div style={{ padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>검색 결과</h2>
            <span style={{ color: "red", fontWeight: "bold", fontSize: "1rem" }}>
              {gameResults.length}건
            </span>
          </div>
          {gameResults.map((game) => {
            const scores = game.score.split(" - ");
            const score1 = parseInt(scores[0]);
            const score2 = parseInt(scores[1]);
            const isTeam1Winner = score1 > score2;
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
                  border:
                    selectedGame && selectedGame.id === game.id
                      ? "2px solid red"
                      : "1px solid #E5E7EB",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedGame(game)}
              >
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
                    <p>{game.date}</p>
                    <p>{game.location}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                      <img
                        src={teamAssets[teamMapping[game.team1] as keyof typeof teamAssets]}
                        alt={game.team1}
                        style={{ width: "60px", height: "60px" }}
                      />
                      <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>{game.team1}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flex: 1,
                        textAlign: "center",
                      }}
                    >
                      <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
                        <span style={{ fontWeight: isTeam1Winner ? "800" : "400" }}>{score1}</span>
                        {" - "}
                        <span style={{ fontWeight: !isTeam1Winner ? "800" : "400" }}>{score2}</span>
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                      <img
                        src={teamAssets[teamMapping[game.team2] as keyof typeof teamAssets]}
                        alt={game.team2}
                        style={{ width: "60px", height: "60px" }}
                      />
                      <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>{game.team2}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <NextButton text="이전" bgColor="red" width="100%" onClick={() => setView("search")} />
            <NextButton
              text="선택하기"
              bgColor="red"
              width="100%"
              onClick={() => {
                if (selectedGame) {
                  setView("write");
                } else {
                  alert("경기를 선택해주세요");
                }
              }}
            />
          </div>
        </div>
      )}
      {view === "write" && selectedGame && (
        <div style={{ padding: "1rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", textAlign: "left" }}>경기내용</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: "2px solid red",
              marginBottom: "1rem",
            }}
          >
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
                <p>{selectedGame.date}</p>
                <p>{selectedGame.location}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                  <img
                    src={teamAssets[teamMapping[selectedGame.team1] as keyof typeof teamAssets]}
                    alt={selectedGame.team1}
                    style={{ width: "72px", height: "72px" }}
                  />
                  <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>{selectedGame.team1}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {(() => {
                    const scores = selectedGame.score.split(" - ");
                    const score1 = parseInt(scores[0]);
                    const score2 = parseInt(scores[1]);
                    return (
                      <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
                        <span style={{ fontWeight: score1 > score2 ? "800" : "400" }}>{score1}</span>
                        {" - "}
                        <span style={{ fontWeight: score1 > score2 ? "400" : "800" }}>{score2}</span>
                      </p>
                    );
                  })()}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                  <img
                    src={teamAssets[teamMapping[selectedGame.team2] as keyof typeof teamAssets]}
                    alt={selectedGame.team2}
                    style={{ width: "72px", height: "72px" }}
                  />
                  <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>{selectedGame.team2}</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ textAlign: "left", fontSize: "1rem", fontWeight: "bold" }}>일기내용</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div
              onClick={() => setAttendance("직관")}
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <img
                src={attendance === "직관" ? check : circle}
                alt="직관"
                style={{ width: "24px", height: "24px", marginRight: "0.5rem" }}
              />
              <p style={{ color: attendance === "직관" ? "#10B981" : "black", fontWeight: attendance === "직관" ? "bold" : "normal" }}>
                직관
              </p>
            </div>
            <div
              onClick={() => setAttendance("집관")}
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <img
                src={attendance === "집관" ? check : circle}
                alt="집관"
                style={{ width: "24px", height: "24px", marginRight: "0.5rem" }}
              />
              <p style={{ color: attendance === "집관" ? "#10B981" : "black", fontWeight: attendance === "집관" ? "bold" : "normal" }}>
                집관
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: "1px solid #E5E7EB",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {feelingAssets.map((feelingImg, index) => (
                <img
                  key={index}
                  src={feelingImg}
                  alt={`feeling${index + 1}`}
                  style={{
                    width: "4em",
                    height: "4rem",
                    border: feeling === index ? "2px solid red" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setFeeling(index)}
                />
              ))}
            </div>
          </div>
          <div>
            <p style={{ textAlign: "left", fontSize: "1rem", fontWeight: "bold", marginBottom: "0.5rem" }}>나의 감상평</p>
            <textarea
              style={{
                width: "100%",
                border: "1px solid gray",
                padding: "0.75rem",
                marginTop: "0.5rem",
                borderRadius: "8px",
                minHeight: "180px",
                resize: "vertical",
              }}
              placeholder="경기에 대한 감상평을 적어주세요."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <NextButton text="이전" bgColor="red" width="100%" onClick={() => setView("select")} />
            <NextButton
              text="작성하기"
              bgColor="red"
              width="100%"
              onClick={() => {
                if (!attendance) {
                  alert("직관/집관을 선택하세요");
                  return;
                }
                console.log("전송된 데이터:", {
                  selectedDate,
                  selectedTeam,
                  selectedGame,
                  attendance,
                  feeling,
                  review,
                });
                alert("전송되었습니다");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DiaryNew;