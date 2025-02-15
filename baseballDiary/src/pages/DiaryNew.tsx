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

function DiaryNew() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [gameResults, setGameResults] = useState<typeof dummyGames>([]);
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
    setView("select");
  };

  const handleSelectGame = (game: typeof dummyGames[number]) => {
    setSelectedGame(game);
    setView("write");
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
            {/* 오른쪽: 모달에서 선택된 팀이 있으면 해당 팀의 아이콘을 보여줌 */}
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
        <div>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>검색 결과</h2>
          {gameResults.map((game) => (
            <div
              key={game.id}
              style={{
                border: "1px solid gray",
                padding: "0.5rem",
                marginTop: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleSelectGame(game)}
            >
              <span>
                {game.date} {game.location}
              </span>
              <span>
                {game.team1} {game.score} {game.team2}
              </span>
            </div>
          ))}
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
            onClick={() => setView("search")}
          >
            변경
          </button>
        </div>
      )}

      {view === "write" && selectedGame && (
        <div>
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