import React, { useState }  from "react";
import styled from "styled-components"

const MyPage = () => {
    const [user] = useState({
        name: "사용자 이름",
        id: "아이디",
        team: "KIA 타이거즈",
        profileImage: "😀",
        posts: 10,
        entries: 10,
        following: 10,
        baseballTemperature: 88,
        winRate: 86,
        record: "6승 1패 0무 / 7 경기",
    });

    return (
        <Container>
            <Header>마이페이지</Header>

            <ProfileSection>
               <ProfileImage>{user.profileImage}</ProfileImage>
               <UserInfo>
                  <UserName>
                    {user.name} <span>({user.id})</span>
                </UserName>
                <UserTeam>
                    나의 구단 <span>{user.team}</span>
                </UserTeam>
                <EditButton>프로필 편집</EditButton>
               </UserInfo>
            </ProfileSection>

            <StatsContainer>
                <StatItem>
                    <StatNumber>
                        {user.following}
                    </StatNumber>
                    <StatLabel>
                        게시물
                    </StatLabel>
                </StatItem>
            </StatsContainer>

            <Card>
                <CardRow>
                    <CardTitle>야구온도</CardTitle>
                    <Temperature>{user.baseballTemperature}°</Temperature>
                </CardRow>
                <CardText>상위 28%</CardText>

                <Divider />

                <CardRow>
                    <CardTitle>최근 승률</CardTitle>
                    <WinRate>{user.winRate}%</WinRate>
                </CardRow>
                <CardText>{user.record}</CardText>
            </Card>
        </Container>
    );
};

export default MyPage;

const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 background: #fff;
 height: 100vh;
 `;

const Header = styled.div`
 width: 100%;
 background: #f8223b;
 color: white;
 font-size: 18px;
 font-weight: bold;
 text-align: center;
 padding: 15px 0;
 `;

 const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 90%;
  `;

  const ProfileImage = styled.div`
   width: 60px;
   height: 60px;
   border-radius: 50%;
   background: #f8223b;
   color: white;
   font-size: 24px;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-shrink: 0;
   `;

   const UserInfo = styled.div`
    margin-left: 15px;
    flex: 1;
    `;

   const UserName = styled.div`
   font-size: 16px;
   font-weight: bold;
   span {
   font-size: 14px;
   color: #888;
   }
   `;

   const UserTeam = styled.div`
    font-size: 14px;
    margin-top: 5px;
    color: #666;
    span {
     font-weight: bold;
     color: black;
     }
     `;

const EditButton = styled.button`
margin-top: 20px;
padding: 5px 10px;
border-radius: 5px;
border: 1px solid #ddd;
background: white;
font-size: 12px;
cursor: pointer;
&:hover {
  background: #f5f5f5;
}
text-align: center;
  width: 60%;
  max-width: 500px;
`;

const StatsContainer = styled.div`
display: flex;
justify-content: space-around;
width: 100%;
margin-top: 20px;
border-bottom: 1px solid #ddd;
padding-bottom: 15px;
`;

const StatItem = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const StatNumber = styled.div`
font-size: 16px;
font-weight: bold;
`;

const StatLabel = styled.div`
font-size: 12px;
color: #888;
`;

// 카드 스타일
const Card = styled.div`
width: 90%;
background: #fff;
border: 1px solid #f2338d;
border-radius: 10px;
padding: 15px;
margin-top: 20px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
display: flex;
flex-direction: column;
gap: 5px;
`;

const CardRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 5px;
`;

const CardTitle = styled.div`
font-size: 14px;
font-weight: bold;
color: #d32f2f;
`;

const Temperature = styled.div`
font-size: 20px;
font-weight: bold;
color: #f8223b;
`;

const WinRate = styled.div`
font-size: 20px;
font-weight: bold;
color: #f8223b;
`;

const CardText = styled.div`
font-size: 14px;
color: #666;
margin-bottom: 5px;
`;

const Divider = styled.div`
height: 1px;
background: #ddd;
margin: 10px 0;
`;
