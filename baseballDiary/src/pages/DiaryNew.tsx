import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyClub, fetchGame } from "../api/MydiaryApi"; // API 함수 임포트
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
const teamAssets: { [key: string]: string } = {
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

// 새 API 응답 형식 인터페이스
interface GameRecord {
  gameId: number;
  team1: string;       // 내 팀 (API로 받아온 내 구단)
  team2: string;       // 팀모달에서 선택한 팀과 일치해야 함
  team1Score: number;
  team2Score: number;
  gameDate: string;    // 예: "2025-02-17"
  day: string;         // 요일 (예: "월요일")
  time: string;        // 예: "18:00"
  location: string;
  gameStatus: "승리" | "패배";
  feeling: number;
}

// 한글 팀 이름 매핑 (KBO 제외)
const teamNames: { [key: string]: string } = {
  lotte: "롯데",
  doosan: "두산",
  samsung: "삼성",
  kiwoom: "키움",
  hanhwa: "한화",
  kia: "KIA",
  kt: "KT",
  nc: "NC",
  lg: "LG",
  ssg: "SSG",
  kbo: "KBO"
};

// 헬퍼 함수: 백엔드에서 받은 한글 구단명(예: "두산 베어스")와 일치하는 팀 자산의 key(예: "Doosan") 반환
const getTeamAssetKey = (clubName: string): string | null => {
  for (const [key, value] of Object.entries(teamNames)) {
    if (value === clubName) {
      // teamAssets의 key는 첫 글자가 대문자입니다.
      return key.charAt(0).toUpperCase() + key.slice(1);
    }
  }
  return null;
};

// GameRecord 인터페이스는 MydiaryApi 파일에 있다고 가정합니다.

function DiaryNew() {
  const navigate = useNavigate();

  // 내 구단 정보를 API로 받아오기 위한 상태
  const [myClub, setMyClub] = useState<string | null>(null);
  const myTeamAssetKey = myClub ? getTeamAssetKey(myClub) : "";

  // 기타 상태들
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [gameResults, setGameResults] = useState<GameRecord[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameRecord | null>(null);
  const [view, setView] = useState("search"); // "search", "select", "write"
  const [feeling, setFeeling] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [attendance, setAttendance] = useState<string | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // 스타일 객체들
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

  // 내 구단 정보를 API를 통해 가져오기
  useEffect(() => {
    getMyClub()
      .then((club) => {
        setMyClub(club);
      })
      .catch((error) => {
        console.error("내 구단 정보를 가져오는 데 실패했습니다.", error);
      });
  }, []);

  // GET 방식으로 날짜만 query parameter로 전송하여 경기 정보를 가져오는 API 호출
  const handleSearch = async () => {
    if (!selectedDate) {
      alert("경기날짜를 선택하세요");
      return;
    }
    if (!selectedTeam) {
      alert("경기대상을 선택하세요");
      return;
    }
    if (!myClub) {
      alert("내 구단 정보를 불러오는 중입니다. 잠시만 기다려주세요.");
      return;
    }
    try {
      // fetchGame API 호출: date만 query parameter로 전송합니다.
      const games = await fetchGame(selectedDate);
      // 만약 반환된 값이 배열이 아니라면 배열로 감싸줍니다.
      const gamesArray = Array.isArray(games) ? games : [games];
      // 선택된 팀이 "KBO"이면 전체 게임, 아니면 상대팀(team2)이 선택된 팀과 일치하는 게임만 필터링
      const filteredGames =
        selectedTeam === "KBO"
          ? gamesArray
          : gamesArray.filter((game) => game.team2 === selectedTeam);
      setGameResults(filteredGames);
      setSelectedGame(null);
      setView("select");
    } catch (error) {
      alert("경기 정보를 가져오는데 실패했습니다.");
    }
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", color: "black", position: "relative", paddingBottom: "4rem" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#EF4444", color: "white", textAlign: "center", padding: "1rem", fontSize: "1.25rem", fontWeight: "bold" }}>
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
            style={{ width: "90%", border: "1px solid gray", padding: "0.5rem", marginTop: "0.5rem", borderRadius: "8px" }}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div style={{ textAlign: "left", marginTop: "1.5rem" }}>
            <span style={{ fontWeight: "normal" }}>경기대상</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
            {/* 내 팀 로고: 내 구단 정보를 기반으로 표시 */}
            <div style={{ ...teamBoxStyle, width: "80px", height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {myTeamAssetKey ? (
                <img
                  src={teamAssets[myTeamAssetKey as keyof typeof teamAssets]}
                  alt={myClub || ""}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                "로딩중..."
              )}
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: "bold", alignSelf: "center" }}>VS</div>
            {/* 팀 모달: 내 구단은 선택할 수 없도록 필터링 */}
            <div
              style={{ ...teamBoxStyle, width: "80px", height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}
              onClick={() => setIsTeamModalOpen(true)}
            >
              {selectedTeam ? (
                <img
                  src={teamAssets[selectedTeam as keyof typeof teamAssets]}
                  alt={selectedTeam}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <div style={{ textAlign: "center", lineHeight: "1.2" }}>
                  <div>선택해주세요</div>
                  <div style={{ fontSize: "0.75rem", fontWeight: "normal" }}>
                    *모든 경기를 확인하고싶으면 KBO를 선택해주세요
                  </div>
                </div>
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", padding: "1rem" }}>
                  {Object.keys(teamAssets)
                    .filter((team) => team !== myTeamAssetKey)
                    .map((team) => (
                      <div
                        key={team}
                        onClick={() => {
                          setSelectedTeam(team);
                          setIsTeamModalOpen(false);
                        }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                      >
                        <img
                          src={teamAssets[team as keyof typeof teamAssets]}
                          alt={teamNames[team.toLowerCase()]}
                          style={{ width: "50px" }}
                        />
                        <span style={{ fontSize: "0.875rem", marginTop: "4px" }}>
                          {teamNames[team.toLowerCase()]}
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
            <span style={{ color: "red", fontWeight: "bold", fontSize: "1rem" }}>{gameResults.length}건</span>
          </div>
          {gameResults.length === 0 ? (
            <p style={{ textAlign: "center", color: "#999" }}>검색된 경기가 없습니다.</p>
          ) : (
            gameResults.map((game) => (
              <div
                key={game.gameId}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: selectedGame && selectedGame.gameId === game.gameId ? "2px solid red" : "1px solid #E5E7EB",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedGame(game)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280", fontSize: "0.875rem", marginBottom: "8px" }}>
                  <p>
                    {game.gameDate} ({game.day}) {game.time}
                  </p>
                  <p>{game.location}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                    <img
                      src={teamAssets[getTeamAssetKey(myClub || "") as keyof typeof teamAssets]}
                      alt={myClub || ""}
                      style={{ width: "60px", height: "60px" }}
                    />
                    <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>{myClub}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center" }}>
                    <p style={{ fontWeight: "bold", color: game.gameStatus === "승리" ? "#10B981" : "#EF4444" }}>
                      {game.gameStatus}
                    </p>
                    <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                      <span style={{ fontWeight: game.team1Score > game.team2Score ? "800" : "400" }}>
                        {game.team1Score}
                      </span>
                      {" - "}
                      <span style={{ fontWeight: game.team1Score > game.team2Score ? "400" : "800" }}>
                        {game.team2Score}
                      </span>
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                    <img
                      src={teamAssets["Lotte"]}
                      alt="Lotte"
                      style={{ width: "60px", height: "60px" }}
                    />
                    <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>
                      {teamNames["lotte"]}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
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
              <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280", fontSize: "0.875rem", marginBottom: "8px" }}>
                <p>
                  {selectedGame.gameDate} ({selectedGame.day}) {selectedGame.time}
                </p>
                <p>{selectedGame.location}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                  <img
                    src={teamAssets[getTeamAssetKey(myClub || "") as keyof typeof teamAssets]}
                    alt={myClub || ""}
                    style={{ width: "72px", height: "72px" }}
                  />
                  <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>{myClub}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center" }}>
                  <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
                    <span style={{ fontWeight: selectedGame.team1Score > selectedGame.team2Score ? "800" : "400" }}>
                      {selectedGame.team1Score}
                    </span>
                    {" - "}
                    <span style={{ fontWeight: selectedGame.team1Score > selectedGame.team2Score ? "400" : "800" }}>
                      {selectedGame.team2Score}
                    </span>
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80px" }}>
                  <img
                    src={teamAssets["Lotte"]}
                    alt="Lotte"
                    style={{ width: "72px", height: "72px" }}
                  />
                  <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "4px" }}>
                    {teamNames["lotte"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ textAlign: "left", fontSize: "1rem", fontWeight: "bold" }}>일기내용</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div onClick={() => setAttendance("직관")} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <img
                src={attendance === "직관" ? check : circle}
                alt="직관"
                style={{ width: "24px", height: "24px", marginRight: "0.5rem" }}
              />
              <p style={{ color: attendance === "직관" ? "#10B981" : "black", fontWeight: attendance === "직관" ? "bold" : "normal" }}>
                직관
              </p>
            </div>
            <div onClick={() => setAttendance("집관")} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
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
              {[feeling1, feeling2, feeling3, feeling4, feeling5].map((feelingImg, index) => (
                <img
                  key={index}
                  src={feelingImg}
                  alt={`feeling${index + 1}`}
                  style={{ width: "4em", height: "4rem", border: feeling === index ? "2px solid red" : "none", cursor: "pointer" }}
                  onClick={() => setFeeling(index)}
                />
              ))}
            </div>
          </div>
          <div>
            <p style={{ textAlign: "left", fontSize: "1rem", fontWeight: "bold", marginBottom: "0.5rem" }}>나의 감상평</p>
            <textarea
              style={{ width: "100%", border: "1px solid gray", padding: "0.75rem", marginTop: "0.5rem", borderRadius: "8px", minHeight: "180px", resize: "vertical" }}
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
                console.log("전송된 데이터:", { selectedDate, selectedTeam, selectedGame, attendance, feeling, review });
                alert("전송되었습니다");
                navigate("/diary");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DiaryNew;