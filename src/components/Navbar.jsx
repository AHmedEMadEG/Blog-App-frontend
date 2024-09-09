import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser({ ...loggedInUser });
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="navbar bg-[var(--secondary-color)] shadow-lg p-4 md:justify-between">
      <div className="flex-1 md:flex-none">
        <Link to="/">
          <img
            src="/images/home-icon.svg"
            alt="home icon"
            width="40px"
            height="40px"
          />
        </Link>
      </div>

      <div className="hidden md:flex justify-center items-center space-x-16">
        <Link to="videos">
          <img
            src="/images/navbar-videos-icon.png"
            alt="Icon 1"
            className="w-8 h-8"
          />
        </Link>
        <Link to="groups">
          <img
            src="/images/navbar-groups-icon.png"
            alt="Icon 2"
            className="w-8 h-8"
          />
        </Link>
        <Link to="gaming">
          <img
            src="/images/navbar-gaming-icon.png"
            alt="Icon 3"
            className="w-8 h-8"
          />
        </Link>
      </div>

      <div className="flex-none md:hidden">
        <Link to="notifications">
          <img
            src="/images/navbar-notifications-icon.png"
            alt="Icon 4"
            className="w-8 h-8"
          />
        </Link>
        <button onClick={toggleMenu} className="btn btn-ghost">
          <img
            src="/images/burger-menu.png"
            alt="burger menu"
            width="40px"
            height="40px"
          />
        </button>
      </div>

      <div
        className={`hidden md:flex md:items-center ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {user ? (
          <div className="flex items-center gap-2">
            <Link to="notifications">
              <img
                src="/images/navbar-notifications-icon.png"
                alt="Icon 4"
                className="w-8 h-8"
              />
            </Link>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="./images/navbar-avatar-icon.png" alt="Avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-6 z-[1] p-2 shadow bg-[var(--secondary-color)] rounded-xl w-52"
              >
                <li className="rounded-lg hover:bg-[var(--primary-color)]">
                  <Link to={`/profile/${user._id}`}>Profile</Link>
                </li>
                <li className="rounded-lg hover:bg-[var(--primary-color)]">
                  <Link to={`/settings/${user._id}`}>Settings</Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="rounded-lg hover:bg-[var(--primary-color)]"
                >
                  <p className="cursor-pointer">Logout</p>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="block md:hidden ">
          <div className="bg-[var(--secondary-color)] p-4 rounded-md absolute top-24 right-4 z-10">
            {user ? (
              <>
                <Link
                  to={`/profile/${user._id}`}
                  className="block rounded-lg hover:bg-[var(--primary-color)] p-2"
                >
                  Profile
                </Link>
                <Link
                  to={`/settings/${user._id}`}
                  className="block rounded-lg hover:bg-[var(--primary-color)] p-2"
                >
                  Settings
                </Link>
                <p
                  onClick={handleLogout}
                  className="block rounded-lg hover:bg-[var(--primary-color)] p-2 cursor-pointer"
                >
                  Logout
                </p>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="block rounded-lg hover:bg-[var(--primary-color)] p-2"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block rounded-lg hover:bg-[var(--primary-color)] p-2"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
