import React, { useState } from "react";
import InputField from "../components/InputField";
import { requestVerificationCode, confirmVerificationCode,signup } from "../api/SignUpApi";
import "./SignUpPage.css"; // CSS 파일 적용

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState(""); // 이메일 입력
  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태확인
  const [isEmailChecked, setIsEmailChecked] = useState(false); 
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호 입력 상태 추가
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 전송 여부
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 여부
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

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
  
  //인증번호 입력 핸들러
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  // PW 입력 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(e.target.value.length >= 8 && e.target.value.length <= 16);
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
          <label className="input-label">이메일*</label>
          <InputField 
            type="text" 
            placeholder="이메일을 입력해주세요." 
            value={email} 
            onChange={handleEmailChange} 
            disabled={isVerified}
          />
          
          {!isEmailValid && email.length > 0 && (
            <p className="email-check-message">
              유효하지 않은 이메일 형식입니다.
            </p>
          )}

          <button
            className="verify-button"
            onClick={() => requestVerificationCode(email)} 
            disabled={!isEmailValid}>
            인증번호받기
            {/* {isVerified ? "✔ 인증완료" : "인증번호받기"} */}
          </button>

          <InputField 
            type="text" 
            placeholder="인증번호를 입력해주세요." 
            value={verificationCode} 
            onChange={handleVerificationCodeChange}
          />

          <button 
          className="verify-button"
          onClick={() => confirmVerificationCode(email, verificationCode)}>
            본인확인
          </button>

        </div>
        
        {/* 비밀번호 입력 컨테이너 */}
        <div className="input-container">
          <label className="input-label">비밀번호*</label>
          <p className="password-guidelines">영문,숫자,특수문자를 포함해 8~16자로 작성해주세요.</p>

          <InputField 
          type="password" 
          placeholder="비밀번호 입력해주세요." 
          value={password} 
          onChange={handlePasswordChange} />
          {!isPasswordValid && password.length > 0 && <p className="error-text">비밀번호는 8~16자여야 합니다.</p>}
          <InputField type="password" placeholder="비밀번호를 한 번 더 입력해주세요." value={passwordConfirm} onChange={handlePasswordConfirmChange} />
          {!isPasswordMatched && passwordConfirm.length > 0 && <p className="error-text">비밀번호가 일치하지 않습니다.</p>}
        </div>

        <button 
        className="signup-button"
        onClick={() => signup(email, password, passwordConfirm)}
        // disabled={!isEmailChecked || !isPasswordValid || !isPasswordMatched}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
