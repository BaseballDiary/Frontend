import React from 'react';
import './InputField.css';

interface InputFieldProps {
  type: 'text' | 'password'; // 입력 필드의 타입 (text 또는 password)
  placeholder: string; // 필드의 힌트 텍스트
  value: string; // 현재 입력된 값
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 값 변경 이벤트 핸들러
  disabled?: boolean; // 이메일 유효성 검사를 위한 선택적 속성
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, disabled = false }) => {
  return (
    <div className="input-field">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled} // 비활성화 기능능
        className="input-field__input"
      />
    </div>
  );
};

export default InputField;