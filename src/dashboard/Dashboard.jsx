import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
