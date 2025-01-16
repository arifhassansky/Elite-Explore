import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import profileBg from "../assets/profile-bg.jpg";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          backgroundImage: `url(${profileBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
        className="w-full"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
