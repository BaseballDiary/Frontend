import { Outlet } from "react-router-dom";

const PlayLayout = () => {
  return (
    <div>
      <Outlet /> {/* ✅ 이 부분이 중요! */}
    </div>
  );
};

export default PlayLayout;
