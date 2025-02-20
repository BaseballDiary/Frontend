import axios from "axios";

// 이메일 인증 번호 요청 API 호출 함수
export const requestVerificationCode = async (email: string): Promise<void> => {
  try {
    const response = await axios.post("https://api.baseballdiary.shop/auth", {
      email
    });
    return response.data;
  } catch (error) {
    console.error("인증번호 요청 실패:", error);
    throw error;
  }
};

// 인증번호 확인 API 호출 함수
export const confirmVerificationCode = async (email: string, authNumber: string): Promise<any> => {
  try {
    const response = await axios.post("https://api.baseballdiary.shop/auth/confirm", {
      email,
      authNumber
    });
    return response.data;
  } catch (error) {
    console.error("인증번호 확인 실패:", error);
    throw error;
  }
};

// 회원가입 API 호출 함수
export const signup = async (email: string, password: string, passwordConfirm: string): Promise<any> => {
  try {
    const response = await axios.post(
      "https://api.baseballdiary.shop/user",
      {
        email,
        password,
        passwordConfirm,
      },
      {
        withCredentials: true,
      }
    );
    return response.data; // 응답 데이터를 반환
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};
