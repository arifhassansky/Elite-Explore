import { useState } from "react";
import logo from "../assets/logo.png";

// react icons
import {
  MdAddAPhoto,
  MdAddToPhotos,
  MdManageAccounts,
  MdOutlineAssignmentReturned,
} from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { FaAddressBook, FaHandshakeAngle, FaUsers } from "react-icons/fa6";
import { FaHistory, FaHome, FaUserEdit, FaUsersCog } from "react-icons/fa";
import useLoadUser from "../hooks/useLoadUser";

const Sidebar = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const { logOut } = useAuth();
  const [user] = useLoadUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <aside
      className={`bg-secondary transition-all duration-300 ease min-h-screen ${
        isCollapse && "w-56 md:w-64 lg:w-72"
      }`}
    >
      {/* logo and collapse */}
      <div
        className={` ${
          isCollapse ? "px-[20px]" : "px-[10px]"
        } transition-all duration-300 ease-in-out`}
      >
        {isCollapse ? (
          <div className="flex items-center justify-between gap-2 pt-6">
            {/* logo */}
            <div className="grid place-items-center">
              <img
                className="w-20 flex justify-center items-center"
                src={logo}
                alt="Elite Travels Logo"
              />
              <span className="text-2xl font-semibold transition-all duration-300 text-gray-200">
                Elite Explore
              </span>
            </div>

            {/* collapse icon */}
            <div className="relative group mb-8">
              <GoSidebarCollapse
                className="text-2xl cursor-pointer text-gray-400"
                onClick={() => setIsCollapse(false)}
              />

              {/*colapse icon tooltip */}
              <div
                className={`absolute -top-1 right-[-115px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Collapse
                </p>
              </div>
            </div>
          </div>
        ) : (
          <img
            src={logo}
            alt="logo"
            className={`${
              isCollapse ? "w-16" : "w-12"
            } mx-auto cursor-pointer pt-8`}
            onClick={() => setIsCollapse(!isCollapse)}
          />
        )}
      </div>

      {/* profile section */}
      <div
        className={`${
          isCollapse ? "justify-between" : "justify-center"
        }  py-3 px-[20px] flex items-center mt-10`}
      >
        <div className="flex items-center justify-center gap-2">
          <img
            src={user?.photo}
            alt="avatar"
            className={`${
              isCollapse ? "w-14" : "w-8"
            } cursor-pointer rounded-full object-cover`}
          />

          <h3
            className={`${
              isCollapse ? "inline" : "hidden"
            }  text-gray-300 font-[500]`}
          >
            {user?.name}
          </h3>
          <h3
            className={`${
              isCollapse ? "inline" : "hidden"
            }  text-gray-300 bg-primary text-center ml-4 px-2 text-sm rounded-3xl font-meduim`}
          >
            {user?.role}
          </h3>
        </div>
      </div>

      {/* general section */}
      <div
        className={`mt-6 ${
          isCollapse ? "px-[20px]" : "px-[10px]"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Gerneral user routes */}
        {user?.role === "user" && (
          <div className="mt-3 flex flex-col gap-[5px]">
            {/* manage profile */}
            <NavLink
              to="/dashboard"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <FaUserEdit className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Manage Profile
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Profile
                </p>
              </div>
            </NavLink>

            {/* my bookings */}
            <NavLink
              to="my-bookings"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <FaAddressBook className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  My Bookings
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  My Bookings
                </p>
              </div>
            </NavLink>

            {/* add stories */}
            <NavLink
              to="add-stories"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <MdAddAPhoto className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Add Stories
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Add Stories
                </p>
              </div>
            </NavLink>

            {/* manage stories */}
            <NavLink
              to="manage-stories"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <MdManageAccounts className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Manage Stories
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Stories
                </p>
              </div>
            </NavLink>

            {/* Join as Tour Guide */}
            {/* manage stories */}
            <NavLink
              to="join-guide"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <FaHandshakeAngle className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Join as Tour Guide
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Join as Tour Guide
                </p>
              </div>
            </NavLink>
            <NavLink
              to="payment-history"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <FaHistory className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Payment History
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Payment History
                </p>
              </div>
            </NavLink>
          </div>
        )}

        {/* guide routes */}
        {user?.role === "guide" && (
          <div className="mt-3 flex flex-col gap-[5px]">
            {/* manage profile */}
            <NavLink
              to="/dashboard"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <FaUserEdit className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Manage Profile
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Profile
                </p>
              </div>
            </NavLink>

            {/* My assigned tours*/}
            <NavLink
              to="my-assigned-tours"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <MdOutlineAssignmentReturned className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  My Assigned Tours
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  My Assigned Tours
                </p>
              </div>
            </NavLink>

            {/* add stories */}
            <NavLink
              to="add-stories"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <MdAddAPhoto className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Add Stories
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Add Stories
                </p>
              </div>
            </NavLink>

            {/* manage stories */}
            <NavLink
              to="manage-stories"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <MdManageAccounts className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Manage Stories
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Stories
                </p>
              </div>
            </NavLink>
          </div>
        )}

        {/* admin routes */}
        {user?.role === "admin" && (
          <div className="mt-3 flex flex-col gap-[5px]">
            {/* manage profile */}
            <NavLink
              to="/dashboard"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <FaUserEdit className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Manage Profile
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Profile
                </p>
              </div>
            </NavLink>

            {/* Add Package */}
            <NavLink
              to="add-package"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <MdAddToPhotos className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Add Package
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-130px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Add Package
                </p>
              </div>
            </NavLink>

            {/* Manage Users */}
            <NavLink
              to="manage-users"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <FaUsers className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Manage Users
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Users
                </p>
              </div>
            </NavLink>

            {/* Manage Candidates */}
            <NavLink
              to="manage-candidates"
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-2">
                <FaUsersCog className="text-[1.3rem" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}
                >
                  Manage Candidates
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-170px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Candidates
                </p>
              </div>
            </NavLink>
          </div>
        )}
      </div>

      {/* setting section */}
      <div
        className={`${
          isCollapse ? "px-[20px]" : "px-[10px]"
        } mt-6 border-t border-gray-200  transition-all duration-300 ease-in-out`}
      >
        <div className="mt-3 flex flex-col gap-[5px]">
          {/* Home */}
          <NavLink
            to="/"
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-2">
              <FaHome className="text-[1.3rem" />
              <p className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}>
                Home
              </p>
            </div>

            {/* tooltip */}
            <div
              className={`${
                isCollapse ? "hidden" : "inline"
              } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
            >
              <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                Home
              </p>
            </div>
          </NavLink>
        </div>

        {/* logot button */}
        <div className="mt-3 flex flex-col gap-[5px]">
          <NavLink
            onClick={handleLogout}
            to="manage-stories"
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-2">
              <CiLogout className="text-[1.3rem" />
              <p className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}>
                Logout
              </p>
            </div>

            {/* tooltip */}
            <div
              className={`${
                isCollapse ? "hidden" : "inline"
              } absolute top-0 right-[-85px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
            >
              <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                <CiLogout /> Logout
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
