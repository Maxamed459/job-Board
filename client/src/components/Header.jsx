import AuthContext from "../../context/AuthContext";
import React, { useContext } from "react";
import { Link } from "react-router";

const Header = () => {
  const { authUser, logout } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800 text-white">
      <h1 className="text-xl font-bold">
        <Link to="/">Job Board</Link>
      </h1>
      {authUser ? (
        <>
          <nav>
            <ul className="flex items-center gap-4 text-[18px]">
              <li>
                <Link to="/dashboard">dashboard</Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Welcome {authUser.username}</h1>
            <button
              onClick={() => logout()}
              className="bg-transparent border-1 border-white px-6 py-2"
            >
              logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            <button className="bg-transparent border-1 border-white px-6 py-2">
              <Link to="/login">login</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
