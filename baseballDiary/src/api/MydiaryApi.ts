import axios from "axios";

// 새 API 응답 형식 인터페이스
export interface GameRecord {
  gameId: number;
  team1: string;
  team2: string;
  team1Score: number;
  team2Score: number;
  gameDate: string;
  day: string;
  time: string;
  location: string;
  gameStatus: "승리" | "패배";
  feeling: number;
}

/**
 * 사용자가 설정한 내 구단을 가져오는 함수
 */
export const getMyClub = async (): Promise<string> => {
  try {
    const response = await axios.get("https://api.baseballdiary.shop/diary/fetchMyClub", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
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
        headers: { "Content-Type": "application/json" },
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
      { gameId, viewType, score, contents },
      {
        headers: { "Content-Type": "application/json" },
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
 * 선택한 연도의 팀 통계 정보를 가져오는 함수
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
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("팀 통계를 가져오는데 실패했습니다.", error);
    throw error;
  }
};

/**
 * 선택한 연도의 내 팀 통계(우리팀) 정보를 가져오는 함수
 */
export interface MyStat {
  myWins: number;
  myLosses: number;
  myDraws: number;
  myGames: number;
  myWinRate: number;
}

export const getMyStat = async (year: number): Promise<MyStat> => {
  try {
    const response = await axios.get(
      `https://api.baseballdiary.shop/diary/mystat/${year}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("내 팀 통계를 가져오는데 실패했습니다.", error);
    throw error;
  }
};

/**
 * 일기 데이터를 가져오는 API 함수
 * 직관 탭의 경우 "onSite", 집관 탭의 경우 "atHome"으로 구분
 */
export interface DiaryRecord {
  date: string;
  dayOfWeek: string;
  time: string;
  stadium: string;
  result: boolean;
  score: {
    myTeam: string;
    myScore: number;
    opponentTeam: string;
    opponentScore: number;
  };
  uploadImages: { uploadImage_id: number }[];
  content: string;
}

export interface DiaryResponseData {
  diaryList: DiaryRecord[];
}

export interface DiaryResponse {
  data: DiaryResponseData;
}

export const getDiary = async (
  year: string,
  attendanceType: "onSite" | "atHome"
): Promise<DiaryResponse> => {
  const endpoint = `https://api.baseballdiary.shop/diary/${year}/view?=${attendanceType}`;
  try {
    const response = await axios.get<DiaryResponse>(endpoint, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("일기 데이터를 가져오는데 실패했습니다.", error);
    throw error;
  }
};