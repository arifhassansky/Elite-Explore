import { Outlet } from "react-router-dom";

import profileBg from "../assets/profile-bg.jpg";
import Sidebar from "../dashboard/sidebar";
import Footer from "../shared/Footer";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar Section */}
        <div>
          <Sidebar />
        </div>

        {/* Main Content Section */}
        <div
          className="flex-1"
          style={{
            backgroundImage: `url(${profileBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Outlet />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
