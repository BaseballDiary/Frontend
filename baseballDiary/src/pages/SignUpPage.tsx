import React, { useState } from "react";
import InputField from "../components/InputField";
import "./SignUpPage.css"; // CSS 파일 적용

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const checkEmailDuplication = () => {
    if (email.includes("@") && email.includes(".")) {
      setIsEmailChecked(true);
      alert("이메일 사용 가능!");
    } else {
      alert("올바른 이메일을 입력해주세요.");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(e.target.value.length >= 8 && e.target.value.length <= 16);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatched(e.target.value === password);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">안녕하세요!<br/> 회원가입 정보를 입력해주세요.</h1>
        <p className="sub-notice">모든 정보는 안전하게 보관되며 누구에게도 공개되지 않아요.</p>

        <div className="input-container">
          <label className="input-label">이메일*</label>
          <InputField type="text" placeholder="이메일을 입력해주세요." value={email} onChange={handleEmailChange} />
          <button className="signup-button" onClick={checkEmailDuplication} disabled={isEmailChecked}>
            {isEmailChecked ? "✔ 사용 가능" : "인증 받기"}
          </button>
        </div>
        
        <div className="input-container">
          <label className="input-label">비밀번호*</label>
          <p className="password-guidelines">영문,숫자,특수문자를 포함해 8~16자로 작성해주세요.</p>
          <InputField type="password" placeholder="비밀번호 입력해주세요." value={password} onChange={handlePasswordChange} />
          {!isPasswordValid && password.length > 0 && <p className="error-text">비밀번호는 8~16자여야 합니다.</p>}
          <InputField type="password" placeholder="비밀번호를 한 번 더 입력해주세요." value={confirmPassword} onChange={handleConfirmPasswordChange} />
          {!isPasswordMatched && confirmPassword.length > 0 && <p className="error-text">비밀번호가 일치하지 않습니다.</p>}
        </div>

        <button className="signup-button" disabled={!isEmailChecked || !isPasswordValid || !isPasswordMatched}>
          다음으로
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
