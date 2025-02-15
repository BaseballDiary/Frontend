import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // 글쓰기 아이콘
import teamLogos from "../../assets/teamLogos"; // 팀 아이콘 배열
import lotte from "../../assets/team/lotte.png";
import doosan from "../../assets/team/doosan.png";
import samsung from "../../assets/team/samsung.png";
import kiwoom from "../../assets/team/kiwoom.png";
import hanhwa from "../../assets/team/hanhwa.png";
import kia from "../../assets/team/kia.png";
import kt from "../../assets/team/kt.png";
import nc from "../../assets/team/nc.png";
import lg from "../../assets/team/lg.png";
import ssg from "../../assets/team/ssg.png";
import kbo from "../../assets/team/KBO.png";
import { FaEllipsisH } from "react-icons/fa";
import { useEffect } from "react";

// ✅ 사용자가 회원가입 시 선택한 팀 (테스트용, 실제로는 Redux 또는 Context 사용)
const selectedTeam = "두산";

// ✅ 팀 데이터 예시
const teams = [
  { name: "KBO", logo: kbo },
  { name: "롯데", logo: lotte },
  { name: "두산", logo: doosan },
  { name: "삼성", logo: samsung },
  { name: "키움", logo: kiwoom },
  { name: "한화", logo: hanhwa },
  { name: "기아", logo: kia },
  { name: "KT", logo: kt },
  { name: "NC", logo: nc },
  { name: "LG", logo: lg },
  { name: "SSG", logo: ssg },
];

const CommunityPopular = () => {
  const navigate = useNavigate();
  const location = useLocation();
const [menuOpen, setMenuOpen] = useState<number | null>(null); // 현재 열린 메뉴의 ID 저장
  const [currentTab, setCurrentTab] = useState("/community/all");


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = document.getElementById("menu"); // ✅ 메뉴 요소 가져오기
      if (menuElement && menuElement.contains(event.target as Node)) {
        return; // ✅ 메뉴 내부를 클릭한 경우 닫히지 않도록 예외 처리
      }
      setMenuOpen(null);
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Container>
      {/* 상단 네비게이션 */}
      <Header>
        <Title>커뮤니티</Title>
        <SearchIcon>🔍</SearchIcon>
      </Header>

      {/* 탭 메뉴 */}
      <TabContainer>
        <Tab
          $active={location.pathname === "/community/all"}
          onClick={() => {
            setCurrentTab("/community/all");
            navigate("/community/all");
          }}
        >
          전체
        </Tab>
        <Tab
          $active={location.pathname === "/community/popular"}
          onClick={() => {
            setCurrentTab("/community/popular");
            navigate("/community/popular");
          }}
        >
          인기
        </Tab>
      </TabContainer>

      {/* 팀 버튼 스크롤 */}
      <TeamScroll>
        {teams.map((team, index) => (
          <TeamButton
            key={index}
            selected={team.name === selectedTeam}
            onClick={() => console.log(`${team.name} 선택됨`)}
          >
            <TeamLogo src={team.logo} alt={team.name} />
          </TeamButton>
        ))}
      </TeamScroll>

      {/* 게시글 목록 (현재 선택한 팀 관련 게시글만 표시) */}
      <PostList>
        {Array.from({ length: 10 }).map((_, index) => (
          <Post key={index}onClick={() => navigate(`/community/post/${index}`)}>
          <ProfileImage>😀</ProfileImage>
          <PostContent>
            <PostHeader>
              <Username>사용자 이름</Username>
              <PostTime>15분 전</PostTime>
            
              {/* 15분전과 점 세 개 버튼을 감싸는 컨테이너 */}
              <PostActions>
        {/* 점 3개 버튼 */}
        <OptionsButton
  onClick={(e) => {
    e.stopPropagation(); // ✅ 부모 이벤트 전파 방지
    setMenuOpen((prev) => (prev === index ? null : index)); // ✅ 현재 메뉴와 같은지 체크 후 토글
    //console.log("버튼 클릭됨, 변경될 menuOpen 상태:", menuOpen === index ? null : index);
  }}
>
  <FaEllipsisH size={18} />
</OptionsButton>

{/* 삭제 버튼 (메뉴) */}
{menuOpen === index && (
  <Menu id="menu" $isOpen={menuOpen === index} onClick={(e) => e.stopPropagation()}>
    <MenuItem className="delete" onClick={(e) => {
      e.stopPropagation(); // ✅ 삭제 버튼 클릭 시 이벤트 전파 방지
      console.log("삭제됨");
    }}>
      🗑 삭제하기
    </MenuItem>
  </Menu>
)}

      </PostActions>
            </PostHeader>
            <PostText>
              게시글 내용이 들어갑니다. 게시글 내용이 들어갑니다. 게시글 내용이 들어갑니다.
            </PostText>
            <PostMeta>
              <Icon>💬</Icon>
              <span>2</span>
              <Icon>❤️</Icon>
              <span>5</span>
            </PostMeta>
          </PostContent>
        </Post>
        ))}
      </PostList>

      {/* 글쓰기 버튼 */}
      <WriteButton>
        <FaEdit size={24} color="white" />
      </WriteButton>
    </Container>
  );
};

export default CommunityPopular;

// ✅ 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 80px; /* 네비게이션 바 공간 확보 */
  padding-top: 130px; /* 🔹 기존보다 더 큰 값으로 변경 (Header + TabContainer 높이만큼) */
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  background: #f8223b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Title = styled.h2`
  color: white;
  font-size: 18px;
`;

const SearchIcon = styled.div`
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: fixed;
  top: 50px;
  left: 0;
  background: white;
  z-index: 99;
  padding: 10px 0;
`;

const Tab = styled.div<{ $active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  font-size: 16px;
  color: ${({ $active }) => ($active ? "#f8223b" : "#999")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  border-bottom: ${({ $active }) => ($active ? "3px solid #f8223b" : "none")};
`;

// ✅ 팀 버튼 스타일 추가
const TeamScroll = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden; /* 🔹 세로 스크롤 방지 */
  padding: 10px 15px;
  gap: 10px;
  white-space: nowrap;
  background: white;
  position: fixed;
  top: 110px;
  left: 0;
  width: 100%;
  z-index: 98;
  scrollbar-width: thin; /* 🔹 스크롤바 크기 조절 */
  scrollbar-color: #ddd transparent; /* 🔹 스크롤바 색상 */

  &::-webkit-scrollbar {
    height: 5px; /* 🔹 크롬, 사파리용 스크롤바 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ddd; /* 🔹 스크롤바 색상 */
    border-radius: 5px;
  }
`;

const TeamButton = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ selected }) => (selected ? "#f8223b" : "#ddd")};
  border: none;
  cursor: pointer;
  flex-shrink: 0; /* 🔹 스크롤이 되도록 크기 고정 */
  min-width: 50px; /* 🔹 스크롤 가능한 최소 크기 */
`;



const TeamLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;


const Menu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 9999; /* ✅ 다른 요소 위로 배치 */
  overflow: hidden;
  width: 100px;
  margin-right: 5px;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")}; // ✅ $isOpen 사용
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const MenuItem = styled.div`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #f1f1f1;
  }
  &.delete {
    color: red;
    font-weight: bold;
  }
`;



const PostList = styled.div`
  padding: 65px 10px 10px; /* ✅ 게시글이 팀 버튼 아래에서 시작되도록 조정 */
`;

const Post = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  gap: 10px;
  cursor: pointer; /* ✅ 클릭 가능하게 변경 */
  &:hover {
    background: #f9f9f9;
  }
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f8223b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0; /* ✅ 프로필 이미지 크기 유지 */
`;

const PostContent = styled.div`
  flex: 1; /* ✅ 남은 공간 차지 */
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* ✅ 15분전과 점 세 개 버튼 사이의 간격 */
  margin-left: auto; /* ✅ 점 세 개 버튼을 우측 끝으로 이동 */
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;


const Username = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const PostTime = styled.div`
  font-size: 12px;
  color: #999;
`;

const PostText = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: flex-end; /* ✅ 좋아요, 댓글 오른쪽 정렬 */
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #999;
  margin-top: 8px;
`;

const Icon = styled.span`
  font-size: 14px;
`;

// ✅ 글쓰기 버튼 항상 보이도록 수정
const WriteButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #f8223b;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;
