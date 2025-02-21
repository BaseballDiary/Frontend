import React, { useState } from "react";
import InputField from "../components/InputField";
import { requestVerificationCode, confirmVerificationCode,signup } from "../api/SignUpApi";
import "./SignUpPage.css"; // CSS 파일 적용

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState(""); // 이메일 입력
  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태확인
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호 입력 상태 추가
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 여부
  const [isRequestDisabled, setIsRequestDisabled] = useState(false); // 인증 번호 요청 버튼 비활성화 상태
  const [timer, setTimer] = useState(0); // 남은 시간 (초)
  const [isConfirmed, setIsConfirmed] = useState(false); // 본인 확인 여부 상태 추가
  
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  // ✅ 유효성 검사 상태
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail)); //
  };

  const handleRequestVerification = async () => {
    if (isRequestDisabled) return; // 버튼이 비활성화된 상태면 실행 안 함
  
    try {
      const response = await requestVerificationCode(email);
      
      if (response) {
        alert("✅ 인증번호가 발송되었습니다. 이메일을 확인하세요!");
        setIsVerified(true); // ✅ 인증번호가 정상적으로 발송되면 인증 상태 변경
  
        // ✅ 버튼을 1분(60초) 동안 비활성화
        setIsRequestDisabled(true);
        setTimer(60);
  
        // 1초마다 timer 감소
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsRequestDisabled(false); // 1분 후 버튼 활성화
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      alert("❌ 인증번호 요청 실패! 다시 시도해주세요.");
      console.error("❌ 인증번호 요청 실패:", error);
    }
  };
  
  //인증번호 입력 핸들러
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  // 인증번호 버튼 비활성화 핸들러
  const handleConfirmVerification = async () => {
    try {
      const response = await confirmVerificationCode(email, verificationCode);
      
      if (response) {
        alert("✅ 본인 확인이 완료되었습니다!");
        setIsConfirmed(true); // ✅ 본인 확인 완료 → 버튼 비활성화
        
        
      }
    } catch (error) {
      alert("❌ 인증번호가 일치하지 않습니다. 다시 시도하세요.");
      console.error("❌ 인증 실패:", error);
    }
  };

   // ✅ 비밀번호 입력 핸들러 (입력할 때마다 유효성 검사)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    setIsLengthValid(newPassword.length >= 8 && newPassword.length <= 16);
    setHasLetter(/[a-zA-Z]/.test(newPassword));
    setHasNumber(/\d/.test(newPassword));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
  };

  // PW 재입력 핸들러
  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    setIsPasswordMatched(e.target.value === password);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">안녕하세요!<br/> 회원가입 정보를 입력해주세요.</h1>
        <p className="sub-notice">모든 정보는 안전하게 보관되며 누구에게도 공개되지 않아요.</p>
        {/*이메일 입력 컨테이너 */}
        <div className="input-container">
          <label className="input-label">이메일</label>
          <InputField 
            type="text" 
            placeholder="이메일을 입력해주세요." 
            value={email} 
            onChange={handleEmailChange} 
            disabled={isVerified}
          />
          
          {!isEmailValid && email.length > 0 && (
            <p className="email-check-message" >
              유효하지 않은 이메일 형식입니다.
            </p>
          )}

          <button
            className={`
            sendVerificationCode-button 
            ${isConfirmed ? "confirmed" : ""}
            `}
            onClick={handleRequestVerification} 
            disabled={isConfirmed || !isEmailValid || isRequestDisabled }>
            {isConfirmed ? "인증완료" : isRequestDisabled ? `다시 요청 가능 (${timer}초)` : "인증번호받기"}
          </button>

          <InputField 
            type="text" 
            placeholder="인증번호를 입력해주세요." 
            value={verificationCode} 
            onChange={handleVerificationCodeChange}
          />

          <button 
          className= {`verify-button ${isConfirmed ? "confirmed" : ""}`} // 조건부 클래스 적용해서 스타일링 변화화
          onClick={handleConfirmVerification}
          disabled={isConfirmed}>
          {isConfirmed ? "본인확인완료" : "본인확인"}
          </button>

        </div>
        
        {/* 비밀번호 입력 컨테이너 */}
        <div className="input-container">
          <label className="input-label">비밀번호</label>
          <ul className="validation-list">
            <li className={isLengthValid ? "valid" : "invalid"}>✔ 8~16자</li>
            <li className={hasLetter ? "valid" : "invalid"}>✔ 영문</li>
            <li className={hasNumber ? "valid" : "invalid"}>✔ 숫자</li>
            <li className={hasSpecialChar ? "valid" : "invalid"}>✔ 특수문자</li>
          </ul>

          <InputField 
          type="password" 
          placeholder="비밀번호 입력해주세요." 
          value={password} 
          onChange={handlePasswordChange}/>

          <InputField 
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요."
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange} />
          {!isPasswordMatched && passwordConfirm.length > 0 && <p className="error-text">비밀번호가 일치하지 않습니다.</p>}
        </div>

        <button 
        className="signup-button"
        onClick={() => signup(email, password, passwordConfirm)}
        disabled={false}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
