import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backButtonWhite from "../../assets/backButtonWhite.png";
import searchIcon from "../../assets/search.png";
import closeButton from "../../assets/closeButton.png";

const CommunitySearch = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "최근 검색내용이 들어갑니다.",
    "최근 검색내용이 들어갑니다.",
    "최근 검색내용이 들어갑니다.",
    "최근 검색내용이 들어갑니다."
  ]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleDeleteSearch = (index: number) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Header>
        <HeaderButton onClick={() => navigate(-1)}>
          <BackIcon src={backButtonWhite} alt="뒤로가기" />
        </HeaderButton>
        <SearchInputContainer>
          <SearchIcon src={searchIcon} alt="search" />
          <SearchInput
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchText}
            onChange={handleSearchChange}
          />
        </SearchInputContainer>
      </Header>

      <Content>
        <RecentTitle>최근 검색어</RecentTitle>
        {recentSearches.map((item, index) => (
          <RecentSearchItem key={index}>
            <SearchText>{item}</SearchText>
            <SearchMeta>
              <SearchTime>1.14</SearchTime>
              <DeleteButton onClick={() => handleDeleteSearch(index)}>
                <DeleteIcon src={closeButton} alt="delete" />
              </DeleteButton>
            </SearchMeta>
          </RecentSearchItem>
        ))}
      </Content>
    </Container>
  );
};

export default CommunitySearch;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
  overflow-y: auto;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #ddd;
`;

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

const BackIcon = styled.img`
  width: 12px;
  height: 15px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 8px;
  border-radius: 20px;
  flex: 1;
  margin-left: 10px;
`;

const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: #aaa;
`;

const Content = styled.div`
  margin-top: 60px;
  padding: 15px;
`;

const RecentTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const RecentSearchItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const SearchText = styled.div`
  font-size: 14px;
`;

const SearchMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchTime = styled.div`
  font-size: 12px;
  color: #999;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const DeleteIcon = styled.img`
  width: 16px;
  height: 16px;
`;






