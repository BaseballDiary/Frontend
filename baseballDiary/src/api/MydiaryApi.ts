import axios from "axios";

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