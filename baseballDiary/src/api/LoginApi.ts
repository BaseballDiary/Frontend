import axios from "axios";

// 로그인 API 호출 함수
export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(
      "https://api.baseballdiary.shop/login", // 백엔드 로그인 엔드포인트 (URL 필요시 수정)
      { email, password }, // 요청 바디에 email과 password 전달
      {
        headers: {
          "Content-Type": "application/json", // 요청 헤더 지정
        },
        withCredentials: true, // 세션 쿠키와 인증 정보를 함께 전송
      }
    );
    return response.data; // 응답 데이터를 반환
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error; // 호출한 곳에서 에러 처리할 수 있도록 재던짐
  }
};