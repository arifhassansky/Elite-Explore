import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Dashboard = () => {
  return (
    <div className="flex gap-4">
      <div>
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
