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

const dummyGames: Array<{ 
  id: number; 
  date: string; 
  team1: string; 
  team2: string; 
  score: string; 
  location: string; 
}> = [
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
    <div className="p-4 max-w-md mx-auto">
      {view === "search" && (
        <div>
          <h2 className="text-lg font-bold">경기 검색</h2>
          <input
            type="date"
            className="w-full border p-2 mt-2"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {Object.keys(teamAssets).map((team) => (
              <img
                key={team}
                src={teamAssets[team as keyof typeof teamAssets]}
                alt={team}
                className={`w-16 h-16 p-1 border ${selectedTeam === team ? "border-red-500" : "border-gray-300"}`}
                onClick={() => setSelectedTeam(team)}
              />
            ))}
          </div>
          <button className="w-full bg-red-500 text-white p-2 mt-4" onClick={handleSearch}>검색하기</button>
        </div>
      )}

      {view === "select" && (
        <div>
          <h2 className="text-lg font-bold">검색 결과</h2>
          {gameResults.map((game) => (
            <div
              key={game.id}
              className="border p-2 mt-2 flex justify-between items-center cursor-pointer"
              onClick={() => handleSelectGame(game)}
            >
              <span>{game.date} {game.location}</span>
              <span>{game.team1} {game.score} {game.team2}</span>
            </div>
          ))}
          <button className="w-full bg-red-500 text-white p-2 mt-4" onClick={() => setView("search")}>변경</button>
        </div>
      )}

      {view === "write" && selectedGame && (
        <div>
          <h2 className="text-lg font-bold">일기 내용</h2>
          <div className="border p-2 mt-2">
            <span>{selectedGame.date} {selectedGame.location}</span>
            <span>{selectedGame.team1} {selectedGame.score} {selectedGame.team2}</span>
          </div>
          <div className="mt-4">
            <label className="block">경기를 보고 난 후 어땠나요?</label>
            <div className="flex space-x-2 mt-2">
              {feelingAssets.map((feelingImg, index) => (
                <img
                  key={index}
                  src={feelingImg}
                  alt={`feeling${index + 1}`}
                  className={`w-12 h-12 p-1 border ${feeling === index ? "border-red-500" : "border-gray-300"}`}
                  onClick={() => setFeeling(index)}
                />
              ))}
            </div>
          </div>
          <textarea
            className="w-full border p-2 mt-4"
            placeholder="경기에 대한 감상평을 적어주세요."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button className="w-full bg-red-500 text-white p-2 mt-4" onClick={() => alert("데이터 전송")}>작성하기</button>
        </div>
      )}
    </div>
  );
};
export default DiaryNew;
