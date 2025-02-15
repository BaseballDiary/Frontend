import { Outlet } from "react-router-dom";

const CommunityLayout = () => {
  return (
    <div>
      <Outlet /> {/* ✅ 이 부분이 중요! */}
    </div>
  );
};

export default CommunityLayout;
