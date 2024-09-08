import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = ()=> {
    setUser(null);
  }
  return (
    <div className="navbar bg-[var(--secondary-color)] shadow-lg p-4">
      <div className="flex-1">
        <Link to="/">
          <img
            src="./images/home-icon.svg"
            alt="home icon"
            width="40px"
            height="40px"
          />
        </Link>
      </div>
      {user ? (
        <div className="flex-none gap-2">
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
  );
};

export default Navbar;
