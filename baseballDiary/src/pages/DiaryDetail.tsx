import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
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

// Styled Header
const Header = styled.header`
  background-color: #EF4444;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  margin-right: 1rem;
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

interface GameRecordDetail {
  id: number;
  result: "승리" | "패배";
  score: string;
  team1: string;
  team2: string;
  feeling: number;
  attendance: "직관" | "집관";
  // 새 필드들
  uploadImages?: string; // 일기 사진 URL
  content: string; // 일기 내용
  date: string; // 예: "2024-09-16"
  dayOfWeek: string; // 예: "월"
  time: string; // 예: "14:00"
  location: string; // 예: "잠실"
}

const DiaryDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // location.state.game 에 전달한 데이터를 사용합니다.
  const game: GameRecordDetail =
    (location.state && location.state.game) || {
      id: 0,
      result: "승리",
      score: "11 - 5",
      team1: "Hanwha",
      team2: "Lotte",
      feeling: 3,
      attendance: "직관",
      uploadImages: "https://dummyimage.com/600x400/000/fff",
      content: "오늘 경기는 정말 재미있었어!",
      date: "2024-09-16",
      dayOfWeek: "월",
      time: "14:00",
      location: "잠실",
    };

  // 감정 아이콘 매핑
  const feelingIcons: { [key: number]: string } = {
    1: feeling1,
    2: feeling2,
    3: feeling3,
    4: feeling4,
    5: feeling5,
  };

  const [score1, score2] = game.score.split(" - ").map(Number);
  const isTeam1Winner = score1 > score2;

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", color: "black", paddingBottom: "4rem" }}>
      {/* Header with Back Button */}
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </BackButton>
        야구일기
      </Header>

      {/* 경기 정보 카드 */}
      <div style={{ padding: "1rem", marginTop: "80px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            border: "1px solid #E5E7EB",
            marginBottom: "1rem",
          }}
        >
          <img
            src={feelingIcons[game.feeling] || feeling1}
            alt="feeling icon"
            style={{ width: "48px", height: "48px", marginRight: "12px" }}
          />
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {/* 날짜/시간/장소 정보를 별도 필드로 표시 */}
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

        {/* 일기 사진 (uploadImages 필드가 있으면 표시) */}
        {game.uploadImages && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img src={game.uploadImages} alt="Diary" style={{ maxWidth: "100%" }} />
          </div>
        )}

        {/* 일기 내용 (content 필드) */}
        <div style={{ padding: "1rem", backgroundColor: "#f9f9f9", borderRadius: "0.5rem" }}>
          <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>{game.content}</p>
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;