import React from "react";

function Header() {
  return (
    <header>
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
        <span className="text-slate-500">Sahand</span>
        <span className="text-slate-700">Estate</span>
      </h1>
      {/* <form>
        <input type="search" placeholder="search.." />
      </form> */}
    </header>
  );
}

export default Header;
