import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

// SVG 아이콘 import
import HomeIcon from "./assets/icons/home.svg";
import GameIcon from "./assets/icons/game.svg";
import CommunityIcon from "./assets/icons/community.svg";
import DiaryIcon from "./assets/icons/diary.svg";
import MoreIcon from "./assets/icons/more.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <img src={HomeIcon} alt="홈" className="icon" />
        <span className="label">홈</span>
      </NavLink>
      <NavLink to="/game" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <img src={GameIcon} alt="경기정보" className="icon" />
        <span className="label">경기정보</span>
      </NavLink>
      <NavLink to="/community" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <img src={CommunityIcon} alt="커뮤니티" className="icon" />
        <span className="label">커뮤니티</span>
      </NavLink>
      <NavLink to="/diary" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <img src={DiaryIcon} alt="야구일기" className="icon" />
        <span className="label">야구일기</span>
      </NavLink>
      <NavLink to="/more" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <img src={MoreIcon} alt="더보기" className="icon" />
        <span className="label">더보기</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;