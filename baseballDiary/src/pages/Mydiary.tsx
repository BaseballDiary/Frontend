import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMyClub } from "../api/MydiaryApi";

const Mydiary: React.FC = () => {
  const [myClub, setMyClub] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyClub = async () => {
      try {
        const team = await getMyClub();
        setMyClub(team);
      } catch (error) {
        console.error("내 구단 정보를 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyClub();
  }, []);

  return (
    <Container>
      <Title>내 구단</Title>
      {loading ? (
        <TeamName>불러오는 중...</TeamName>
      ) : (
        <TeamName>{myClub}</TeamName>
      )}
    </Container>
  );
};

export default Mydiary;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const TeamName = styled.p`
  font-size: 18px;
  color: #333;
`;