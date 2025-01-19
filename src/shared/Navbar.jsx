import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import useLoadUser from "../hooks/useLoadUser";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logOut, user } = useAuth();
  const [dbUser] = useLoadUser();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await logOut();
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropdownProfile = () => setProfileOpen(!profileOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navlinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-primary no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-primary no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          Community
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/trips"
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-primary no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          Trips
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-primary no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-primary no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-primary no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          Gallery
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`fixed z-50 top-0 w-full flex justify-center transition-all ${
        scrolled && "backdrop-blur-md"
      }`}
    >
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow list-none text-lg"
              >
                {navlinks}
              </ul>
            )}
          </div>
          <div className="flex items-center h-14">
            <a href="/" className="flex-shrink-0">
              <img
                className="h-14 w-auto"
                src={logo}
                alt="Elite Travels Logo"
              />
            </a>
            <span
              className={`text-2xl font-semibold transition-all duration-300 ${
                scrolled || pathname !== "/" ? "text-black" : "text-white"
              }`}
            >
              Elite Explore
            </span>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 list-none text-lg">{navlinks}</ul>
        </div>

        <div className="navbar-end  text-lg">
          {user ? (
            <div className="group relative inline-block">
              <img
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                src={dbUser?.photo}
                referrerPolicy="no-referrer"
                alt="Profile Image"
                onClick={toggleDropdownProfile}
              />

              {profileOpen && (
                <div className="absolute z-[1000] right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <div className="p-4">
                    <p className="text-sm font-medium text-black">
                      {dbUser?.name}
                    </p>
                    <p className="text-xs font-medium text-gray-400">
                      {dbUser?.email}
                    </p>
                  </div>

                  <div className="px-2">
                    <Link to="/dashboard">
                      <button className="w-full text-left py-2 px-2 text-sm hover:text-white rounded hover:bg-primary">
                        Dashboard
                      </button>
                    </Link>
                  </div>

                  <div className="px-2">
                    <Link to="/offer">
                      <button className="w-full text-left py-2 px-2 text-sm hover:text-white rounded hover:bg-primary">
                        Offer
                      </button>
                    </Link>
                  </div>

                  <hr />
                  <div className="px-2 py-4">
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 text-sm text-white bg-primary rounded hover:bg-secondary"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded no-underline ${
                  isActive
                    ? "font-semibold text-primary"
                    : scrolled
                    ? "hover:text-primary text-primary"
                    : pathname === "/" && "hover:text-primary text-white"
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
