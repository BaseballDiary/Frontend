import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

// SVG 아이콘 import
import HomeActiveIcon from "../assets/icons/home-active.svg";
import HomeInactiveIcon from "../assets/icons/home-inactive.svg";
import GameActiveIcon from "../assets/icons/game-active.svg";
import GameInactiveIcon from "../assets/icons/game-inactive.svg";
import CommunityActiveIcon from "../assets/icons/community-active.svg";
import CommunityInactiveIcon from "../assets/icons/community-inactive.svg";
import DiaryActiveIcon from "../assets/icons/diary-active.svg";
import DiaryInactiveIcon from "../assets/icons/diary-inactive.svg";
import MyPageActiveIcon from "../assets/icons/more-active.svg";
import MyPageInactiveIcon from "../assets/icons/more-inactive.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        {({ isActive }) => (
          <img
            src={isActive ? HomeActiveIcon : HomeInactiveIcon}
            alt="홈"
            className="icon"
          />
        )}
      </NavLink>
      <NavLink to="/game">
        {({ isActive }) => (
          <img
            src={isActive ? GameActiveIcon : GameInactiveIcon}
            alt="경기정보"
            className="icon"
          />
        )}
      </NavLink>
      <NavLink to="/community">
        {({ isActive }) => (
          <img
            src={isActive ? CommunityActiveIcon : CommunityInactiveIcon}
            alt="커뮤니티"
            className="icon"
          />
        )}
      </NavLink>
      <NavLink to="/diary">
        {({ isActive }) => (
          <img
            src={isActive ? DiaryActiveIcon : DiaryInactiveIcon}
            alt="다이어리"
            className="icon"
          />
        )}
      </NavLink>
      <NavLink to="/mypage">
        {({ isActive }) => (
          <img
            src={isActive ? MyPageActiveIcon : MyPageInactiveIcon}
            alt="마이페이지"
            className="icon"
          />
        )}
      </NavLink>
    </nav>
  );
};

export default Navbar;