// import React from "react";
import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user.user);
  console.log(currentUser);
  return (
    <header className="bg-slate-900">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Family</span>
            <span className="text-slate-700">Fortune</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="search"
            placeholder="search.."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <ImSearch className="text-slate-600" />
        </form>
        <ul className="flex text-slate-50 gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>

          {/* <Link to="/sign-in">
            {currentUser ? (
              <img src={currentUser?.avatar} alt="user image" />
            ) : (
              <li className=" sm:inline hover:underline">Sign-in</li>
            )}
          </Link> */}
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
