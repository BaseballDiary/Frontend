import React from 'react';
import { Outlet } from 'react-router-dom';

const PlayerRanking = () => {
  return (
    <div>
      <h1>개인순위 페이지입니다.</h1>
      <Outlet />
    </div>
  );
};

export default PlayerRanking;
