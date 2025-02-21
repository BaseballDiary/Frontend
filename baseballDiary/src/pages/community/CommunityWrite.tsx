import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa"; // ✅ 가로 점 3개 아이콘 사용
import backButtonWhite from "../../assets/backButtonWhite.png";
import heart from "../../assets/heart.png";

const CommunityWrite = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { id: 1, username: "사용자 이름", content: "댓글 내용입니다." },
    { id: 2, username: "다른 사용자", content: "좋은 정보 감사합니다!" },
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, { id: Date.now(), username: "나", content: commentText }]);
      setCommentText("");
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('게시글 ${postId} 삭제');
    setShowDeleteModal(false);
    navigate(-1);
  };

  const handlePost = () => {
    console.log("게시글 내용:", content);
    navigate("/community/all");
  };

  return (
    <Container>
      <Header>
        <HeaderButton onClick={() => navigate(-1)}>
          <BackIcon src={backButtonWhite} alt="뒤로가기" />
        </HeaderButton>
        <Title>글쓰기</Title>
        <PostButton onClick={handlePost}>게시하기</PostButton>
      </Header>

      <PostContainer>
        <ProfileSection>
          <ProfileImage>😀</ProfileImage>
          <CategorySelect defaultValue="default">
            <option value="default" disabled>커뮤니티 카테고리</option>
            <option value="doosan">두산</option>
            <option value="lotte">롯데</option>
            <option value="samsung">삼성</option>
            <option value="kiwoom">키움</option>
            <option value="hanhwa">한화</option>
            <option value="kia">기아</option>
            <option value="kt">KT</option>
            <option value="nc">NC</option>
            <option value="lg">LG</option>
            <option value="ssg">SSG</option>
          </CategorySelect>
        </ProfileSection>
        <ContentInput
          placeholder="게시글 내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </PostContainer>
    </Container>
  );
};


export default CommunityWrite;

// 📌 스타일 정의
const HeaderButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.8;
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
  overflow-y: auto;
  padding-bottom: 60px; /* 하단 댓글 입력란 공간 확보 */
`;

/* 🔹 상단 네비게이션 스타일 개선 */
const Header = styled.div`
  width: 100%;
  height: 50px;
  background: #f8223b;
  display: flex;
  align-items: center;
  padding: 0 15px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  color: white;
`;



const BackIcon = styled.img`
  width: 12px;
  height: 15px;
`;

const PostButton = styled.div `
  background: white;
  color: #f8223b;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 12px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  margin-left: auto;
  `;

/* 🔹 게시글 스타일 개선 */
const PostContainer = styled.div`
  padding: 70px 15px 20px; /* ✅ 기존 padding + 상단 여백 추가 */
  background: #fafafa;
  border-bottom: 1px solid #ddd;
  min-height: 100px; /* ✅ 최소 높이 설정 */
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center; /* ✅ 프로필 이미지와 닉네임을 수직 중앙 정렬 */
  gap: 10px; /* ✅ 간격 추가 */
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
  flex-shrink: 0;
`;


const CategorySelect = styled.select`
  border: none;
  font-size: 14px;
  padding: 5px;
  background: #f8f8f8;
  border-radius: 5px;
  cursor: pointer;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 16px;
  border: none;
  outline: none;
  padding: 10px;
  resize: none;
  color: #aaa;
  background: transparent;
`;




// 📌 옵션 메뉴 (점 3개 버튼)

const Title = styled.h2`
  font-size: 18px;
  text-align: center;
`;











