import { Outlet } from "react-router-dom";

const GameLayout = () => {
  return (
    <div>
      <Outlet /> {/* ✅ 이 부분이 중요! */}
    </div>
  );
};

export default GameLayout;
