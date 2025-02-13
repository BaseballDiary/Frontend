import styled from "styled-components";

interface ButtonProps {
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
    width?: string;
    onClick?: () => void;
    text?: string;
    disabled?: boolean;
}

const NextButton: React.FC<ButtonProps> = ({
    text = "다음으로",
    bgColor = "gray",
    textColor = "white",
    hoverColor = "#ff4d4d",
    width = "200px",
    onClick,
    disabled = false,
}) => {
    return (
        <StyledButton
            bgColor={disabled ? "gray" : bgColor}
            textColor={textColor}
            hoverColor={hoverColor}
            width={width}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </StyledButton>
    );
};

export default NextButton;

const StyledButton = styled.button<ButtonProps>`
    background-color: ${(props) => (props.disabled ? "gray" : props.bgColor)};
    color: ${(props) => props.textColor};
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s ease;
    width: 341px;

    &:hover {
        background-color: ${(props) => (props.disabled ? "gray" : props.hoverColor)};
    }

    &:active {
        background-color: red;
    }
`;
