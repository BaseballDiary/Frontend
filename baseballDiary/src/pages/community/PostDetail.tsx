import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa"; // ✅ 가로 점 3개 아이콘 사용
import backButtonWhite from "../../assets/backButtonWhite.png";

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // ✅ URL에서 postId 가져오기
  const [menuOpen, setMenuOpen] = useState<number | null>(null); // 현재 열린 메뉴의 ID 저장
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { id: 1, username: "사용자 이름", content: "댓글 내용입니다." },
    { id: 2, username: "다른 사용자", content: "좋은 정보 감사합니다!" },
  ]);

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, { id: Date.now(), username: "나", content: commentText }]);
      setCommentText("");
    }
  };

    // ✅ 삭제 버튼 클릭 시 실행할 함수
    const handleDelete = () => {
      console.log(`게시글 ${postId} 삭제`);
      setMenuOpen(null); // 삭제 후 메뉴 닫기
    };

  

  return (

    <Container onClick={() => setMenuOpen(null)}> {/* ✅ 클릭하면 메뉴 닫힘 */}
    {/* 상단 네비게이션 */}
    <Header>
      <HeaderButton_back onClick={() => navigate(-1)}>
        <BackIcon src={backButtonWhite} alt="뒤로가기" />
      </HeaderButton_back>
      <Title>게시글 {postId}</Title>
    </Header>

    {/* 게시글 본문 */}
    <PostContainer onClick={(e) => e.stopPropagation()}> {/* ✅ 메뉴 닫힘 방지 */}
      <ProfileSection>
        <ProfileImage>😀</ProfileImage>
        <Username>사용자 이름</Username>
        <PostTime>15분 전</PostTime>

        {/* 점 3개 버튼 및 삭제 메뉴 */}
        <PostActions>
          <OptionsButton onClick={(e) => {
            e.stopPropagation(); // ✅ 부모 컨테이너 클릭 이벤트 방지
            setMenuOpen(menuOpen === Number(postId) ? null : Number(postId));
          }}>
            <FaEllipsisH size={18} />
          </OptionsButton>

          {/* 삭제 버튼 */}
          {menuOpen === Number(postId) && (
            <Menu>
              <MenuItem className="delete" onClick={handleDelete}>
                🗑 삭제하기
              </MenuItem>
            </Menu>
          )}
        </PostActions>
      </ProfileSection>

      <PostContent>
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
    </PostContainer>

    {/* 댓글 목록 */}
    <CommentSection>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <ProfileImage>😀</ProfileImage>
          <CommentContent>
            <Username>{comment.username}</Username>
            <CommentText>{comment.content}</CommentText>
          </CommentContent>
        </Comment>
      ))}
    </CommentSection>

    {/* 댓글 입력란 */}
    <CommentInputContainer>
      <CommentInput
        type="text"
        placeholder="댓글을 입력하세요..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <SendButton onClick={() => setComments([...comments, { id: Date.now(), username: "나", content: commentText }])}>
        게시
      </SendButton>
    </CommentInputContainer>
  </Container>
);
};

export default PostDetail;

// 📌 스타일 정의
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

const HeaderButton_back = styled.button`
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

const BackIcon = styled.img`
  width: 20px;
  height: 20px;
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

const UserInfo = styled.div`
  margin-left: 10px;
  flex: 1;
`;

const Username = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const PostTime = styled.div`
  font-size: 12px;
  color: #999;
`;

const PostText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

/* 🔹 댓글 스타일 개선 */
const CommentSection = styled.div`
  padding: 10px 15px;
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentText = styled.div`
  font-size: 14px;
  color: #333;
`;

/* 🔹 댓글 입력란 스타일 조정 */
const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  padding: 10px;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
`;

// 📌 옵션 메뉴 (점 3개 버튼)
const OptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

const Menu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 101;
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
  &.delete {
    color: red;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  flex: 1;
  text-align: center;
`;

const SendButton = styled.button`
  background: #f8223b;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background: #d91d32;
  }
`;

const PostContent = styled.div`
  
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between; /* ✅ 점 세 개 버튼을 우측으로 */
  align-items: center;
  margin-bottom: 5px;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* ✅ 15분 전과 점 세 개 버튼 사이의 간격 */
  margin-left: auto; /* ✅ 점 세 개 버튼을 우측 끝으로 이동 */
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

