import styled from "styled-components";

interface ButtonProps {
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
    width?: string;
    onClick?: () => void;
    text?: string;
}

const NextButton: React.FC<ButtonProps> = ({
    text = "다음으로",
    bgColor = "red",
    textColor = "white",
    hoverColor = "#ff4d4d",
    width = "200px", // 기본 너비 설정
    onClick,
}) => {
    return (
        <StyledButton bgColor={bgColor} textColor={textColor} hoverColor={hoverColor} width={width} onClick={onClick}>
            {text}
        </StyledButton>
    );
};

export default NextButton;

const StyledButton = styled.button<ButtonProps>`
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.textColor};
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s ease;
    width: 341px; 

    &:hover {
        background-color: ${(props) => props.hoverColor};
    }
`;

