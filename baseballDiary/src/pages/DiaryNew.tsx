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

const teamAssets = { lotte, doosan, samsung, kiwoom, hanhwa, kia, kt, nc, lg, ssg, kbo };
const feelingAssets = [feeling1, feeling2, feeling3, feeling4, feeling5];

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

  const handleSearch = () => {
    setGameResults(dummyGames);
    setView("select");
  };

  const handleSelectGame = (game: typeof dummyGames[number]) => {
    setSelectedGame(game);
    setView("write");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "28rem", margin: "auto" }}>
      {view === "search" && (
        <div>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>경기 검색</h2>
          <input
            type="date"
            style={{ width: "100%", border: "1px solid gray", padding: "0.5rem", marginTop: "0.5rem" }}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", overflowX: "auto" }}>
            {Object.keys(teamAssets).map((team) => (
              <img
                key={team}
                src={teamAssets[team as keyof typeof teamAssets]}
                alt={team}
                style={{
                  width: "4rem",
                  height: "4rem",
                  padding: "0.25rem",
                  border: selectedTeam === team ? "2px solid red" : "2px solid gray",
                  cursor: "pointer"
                }}
                onClick={() => setSelectedTeam(team)}
              />
            ))}
          </div>
          <button
            style={{
              width: "100%",
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem",
              marginTop: "1rem",
              border: "none",
              cursor: "pointer"
            }}
            onClick={handleSearch}
          >
            검색하기
          </button>
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
                cursor: "pointer"
              }}
              onClick={() => handleSelectGame(game)}
            >
              <span>{game.date} {game.location}</span>
              <span>{game.team1} {game.score} {game.team2}</span>
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
              cursor: "pointer"
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
            <span>{selectedGame.date} {selectedGame.location}</span>
            <span>{selectedGame.team1} {selectedGame.score} {selectedGame.team2}</span>
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
                    cursor: "pointer"
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
              cursor: "pointer"
            }}
            onClick={() => alert("데이터 전송")}
          >
            작성하기
          </button>
        </div>
      )}
    </div>
  );
}

export default DiaryNew;