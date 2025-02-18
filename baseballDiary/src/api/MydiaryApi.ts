import axios from "axios";
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
/**
 * 사용자가 설정한 내 구단을 가져오는 함수
 * @returns 내 구단 이름 (string)
 */
export const getMyClub = async (): Promise<string> => {
  try {
    const response = await axios.get("https://api.baseballdiary.shop/diary/fetchMyClub", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // 세션 쿠키와 인증 정보를 함께 전송
    });
    // 백엔드에서 { "myClub": "두산" } 형태로 반환할 때,
    // 내 구단 이름은 response.data.myClub에 담겨 있음.
    return response.data.myClub;
  } catch (error) {
    console.error("내 구단 정보를 가져오는데 실패했습니다.", error);
    throw error;
  }
};

export const fetchGame = async (date: string): Promise<GameRecord[]> => {
  try {
    const response = await axios.get(
      `https://api.baseballdiary.shop/diary/create/fetchgame?date=${date}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("경기 정보를 가져오는데 실패했습니다.", error);
    throw error;
  }
};

/**
 * 사용자가 작성한 일기를 생성하는 함수
 * @param gameId - 선택한 경기의 ID
 * @param viewType - "직관" 또는 "집관"
 * @param score - 사용자가 선택한 점수 (문자열 "1" ~ "5")
 * @param contents - 사용자의 감상평
 * @returns 생성된 일기 데이터 (백엔드 응답)
 */
export const createDiary = async (
  gameId: number,
  viewType: string,
  score: string,
  contents: string
): Promise<any> => {
  try {
    const response = await axios.post(
      "https://api.baseballdiary.shop/diary/create",
      {
        gameId,
        viewType,
        score,
        contents,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("일기를 생성하는데 실패했습니다.", error);
    throw error;
  }
};

/**
 * 선택한 연도를 기반으로 팀 통계 정보를 가져오는 함수
 * @param year - 선택한 연도 (예: 2024)
 * @returns 팀 통계 데이터 (예: { teamWins, teamLosses, teamDraws, teamGames, teamWinRate })
 */
export interface TeamStat {
  teamWins: number;
  teamLosses: number;
  teamDraws: number;
  teamGames: number;
  teamWinRate: number;
}

export const getTeamStat = async (year: number): Promise<TeamStat> => {
  try {
    const response = await axios.get(
      `https://api.baseballdiary.shop/diary/teamstat/${year}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("팀 통계를 가져오는데 실패했습니다.", error);
    throw error;
  }
};

export interface MyStat {
  myWins: number;
  myLosses: number;
  myDraws: number;
  myGames: number;
  myWinRate: number;
}
/**
 * 선택한 연도의 내 팀 통계(우리팀) 정보를 가져오는 함수
 * @param year - 선택한 연도 (예: 2024)
 * @returns MyStat 데이터
 */

export const getMyStat = async (year: number): Promise<MyStat> => {
  try {
    const response = await axios.get(
      `https://api.baseballdiary.shop/diary/mystat/${year}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("내 팀 통계를 가져오는데 실패했습니다.", error);
    throw error;
  }
};