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
import NextButton from "../components/Next-button";

const teamAssets = { lotte, doosan, samsung, kiwoom, hanhwa, kia, kt, nc, lg, ssg, kbo };
const feelingAssets = [feeling1, feeling2, feeling3, feeling4, feeling5];
const dummyMyTeam = "hanhwa";

const dummyGames = [
  { id: 1, date: "25.01.45", team1: "한화", team2: "롯데", score: "5 - 11", location: "잠실" },
  { id: 2, date: "25.01.45", team1: "한화", team2: "롯데", score: "5 - 11", location: "잠실" },
  { id: 3, date: "25.01.45", team1: "한화", team2: "롯데", score: "5 - 11", location: "잠실" },
  { id: 4, date: "25.01.45", team1: "한화", team2: "롯데", score: "5 - 11", location: "잠실" }
];

// 팀 이름(한글)을 teamAssets의 키(영문)로 매핑
const teamMapping: { [key: string]: string } = {
  "한화": "hanhwa",
  "롯데": "lotte",
};

function DiaryNew() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [gameResults, setGameResults] = useState<typeof dummyGames>([]);
  // 선택한 게임은 select view에서 카드 터치 시 저장됨
  const [selectedGame, setSelectedGame] = useState<typeof dummyGames[number] | null>(null);
  const [view, setView] = useState("search"); // search, select, write
  const [feeling, setFeeling] = useState<number | null>(null);
  const [review, setReview] = useState("");

  // 팀 선택 모달 상태 관리
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // teamBoxStyle 정의
  const teamBoxStyle = {
    flex: 1,
    border: "1px solid gray",
    padding: "0.5rem",
    textAlign: "center" as const,
    cursor: "pointer",
    borderRadius: "8px",
  };

  // 모달 관련 스타일 정의
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

  // 수정: 모달 크기를 늘림 (maxWidth: "600px")
  const modalStyle = {
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "600px",
  };

  const handleSearch = () => {
    setGameResults(dummyGames);
    // 초기에는 선택된 게임이 없도록 함
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
      {view === "search" && (
        <div style={{ padding: "1rem" }}>
          {/* 경기 검색 제목 좌측 정렬 */}
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", textAlign: "left" }}>경기 검색</h2>

          {/* 경기날짜 레이블 (굵지 않게, 좌측 정렬) */}
          <div style={{ textAlign: "left", marginTop: "1rem" }}>
            <span style={{ fontWeight: "normal" }}>경기날짜</span>
          </div>
          {/* 날짜 선택 input의 너비 축소 */}
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

          {/* 경기대상 레이블 (좌측 정렬, 약간의 여백) */}
          <div style={{ textAlign: "left", marginTop: "1.5rem" }}>
            <span style={{ fontWeight: "normal" }}>경기대상</span>
          </div>
          {/* 경기 대상 선택 영역 */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
            {/* 왼쪽: dummyMyTeam의 팀 아이콘 */}
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
            {/* 오른쪽: 모달에서 선택된 팀 아이콘 */}
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

          {/* 팀 선택 모달 */}
          {isTeamModalOpen && (
            <div style={modalOverlayStyle}>
              <div style={modalStyle}>
                <h3 style={{ textAlign: "center", fontWeight: "bold" }}>팀 선택</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", padding: "1rem" }}>
                  {Object.keys(teamAssets).map((team) => (
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
                      <img src={teamAssets[team as keyof typeof teamAssets]} alt={team} style={{ width: "50px" }} />
                      <span style={{ fontSize: "0.875rem", marginTop: "4px" }}>{team}</span>
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
          {/* 헤더에 경기 건수 표시 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>검색 결과</h2>
            <span style={{ color: "red", fontWeight: "bold", fontSize: "1rem" }}>
              {gameResults.length}건
            </span>
          </div>

          {/* 경기 결과 카드 */}
          {gameResults.map((game) => {
            // 점수 파싱
            const scores = game.score.split(" - ");
            const score1 = parseInt(scores[0]);
            const score2 = parseInt(scores[1]);
            const isTeam1Winner = score1 > score2;
            // resultText는 제거합니다.

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
                    <p>{game.date}</p>
                    <p>{game.location}</p>
                  </div>

                  {/* 경기 내용 */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* 팀 1 (좌측) */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                      <img
                        src={teamAssets[teamMapping[game.team1] as keyof typeof teamAssets]}
                        alt={game.team1}
                        style={{ width: "60px", height: "60px" }}
                      />
                      <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>
                        {game.team1}
                      </p>
                    </div>

                    {/* 점수 표시 (승리/패배 텍스트 제거, 폰트 크기 확대) */}
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

                    {/* 팀 2 (우측) */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                      <img
                        src={teamAssets[teamMapping[game.team2] as keyof typeof teamAssets]}
                        alt={game.team2}
                        style={{ width: "60px", height: "60px" }}
                      />
                      <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>
                        {game.team2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 하단 버튼 영역 - 버튼 순서 변경: 왼쪽 "이전", 오른쪽 "선택하기" */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              style={{
                flex: 1,
                backgroundColor: "red",
                color: "white",
                padding: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setView("search")}
            >
              이전
            </button>
            <button
              style={{
                flex: 1,
                backgroundColor: "red",
                color: "white",
                padding: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                if (selectedGame) {
                  setView("write");
                } else {
                  alert("경기를 선택해주세요");
                }
              }}
            >
              선택하기
            </button>
          </div>
        </div>
      )}

      {view === "write" && selectedGame && (
        <div style={{ padding: "1rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>일기 내용</h2>
          <div style={{ border: "1px solid gray", padding: "0.5rem", marginTop: "0.5rem" }}>
            <span>
              {selectedGame.date} {selectedGame.location}
            </span>
            <span>
              {selectedGame.team1} {selectedGame.score} {selectedGame.team2}
            </span>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label>경기를 보고 난 후 어땠나요?</label>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              {feelingAssets.map((feelingImg, index) => (
                <img
                  key={index}
                  src={feelingImg}
                  alt={`feeling${index + 1}`}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    padding: "0.25rem",
                    border: feeling === index ? "2px solid red" : "2px solid gray",
                    cursor: "pointer",
                  }}
                  onClick={() => setFeeling(index)}
                />
              ))}
            </div>
          </div>
          <textarea
            style={{ width: "100%", border: "1px solid gray", padding: "0.5rem", marginTop: "1rem" }}
            placeholder="경기에 대한 감상평을 적어주세요."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            style={{
              width: "100%",
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem",
              marginTop: "1rem",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              // 전송된 데이터 로그 출력
              console.log("전송된 데이터:", {
                selectedDate,
                selectedTeam,
                selectedGame,
                feeling,
                review,
              });
              alert("전송되었습니다");
            }}
          >
            작성하기
          </button>
        </div>
      )}
    </div>
  );
}

export default DiaryNew;