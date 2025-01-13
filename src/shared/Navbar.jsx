import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
// import authContext from "../context/AuthContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  //   const { user, logOut } = useContext(authContext);
  const { pathname } = useLocation();

  //   const handleLogout = async () => {
  //     await logOut();
  //   };

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
          About Us
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
            <span className="text-2xl font-semibold text-white">
              Elite Travels
            </span>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 list-none text-lg">{navlinks}</ul>
        </div>

        <div className="navbar-end  text-lg">
          {/* {user ? ( */}
          <div className="group relative inline-block">
            <img
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              // src={user?.photoURL}
              referrerPolicy="no-referrer"
              alt="Profile Image"
              onClick={toggleDropdownProfile}
            />

            {profileOpen && (
              <div className="absolute z-[1000] right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                <div className="p-4">
                  <p className="text-sm font-medium text-black">
                    {/* {user?.displayName} */}
                  </p>
                </div>
                <hr />
                <div className="p-2">
                  <button
                    //   onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm  bg-primary rounded hover:bg-secondary hover:text-black"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* ) : ( */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? `font-black px-4 py-2 rounded no-underline ${
                    scrolled
                      ? "text-black"
                      : pathname === "/"
                      ? ""
                      : "text-black"
                  }`
                : `px-4 py-2 rounded hover:text-primary no-underline ${
                    scrolled
                      ? "text-black"
                      : pathname === "/"
                      ? ""
                      : "text-black"
                  }`
            }
          >
            Login
          </NavLink>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
