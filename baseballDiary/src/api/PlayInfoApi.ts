import axios from "axios";

// ✅ 경기 데이터 응답 타입 정의
interface GameRecord {
  gameCertificateId: number;
  gameStatus: string;
  team1: string;
  team2: string;
  team1Score: string;
  team2Score: string;
  gameDate: string;  // "YYYY-MM-DD" 형식
  place: string | null;
  time: string;
  diary: string | null;
}

// ✅ API 응답 데이터 타입 정의
interface GameDataResponse {
  message: string;
  data: GameRecord[];
}

/**
 * 오늘의 경기 정보를 가져오는 함수
 * @param date - 조회할 날짜 (YYYY-MM-DD 형식)
 * @returns 경기 데이터 배열
 */
const fetchGameData = async (date: string): Promise<GameDataResponse | null> => {
  const url = `https://api.baseballdiary.shop/game/today?date=${date}`;

  try {
    const response = await axios.get<GameDataResponse>(url);
    console.log("오늘의 경기 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("API 요청 실패:", error);
    return null;
  }
};

// ✅ 날짜를 입력해서 호출
fetchGameData("2024-08-18");
