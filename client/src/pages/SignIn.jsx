import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="p-3 max-w-lg items-center mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign-Up</h1>
      <form className="flex flex-col gap-3 ">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded lg"
          id="password"
        />
        <button className="bg-slate-700 text-slate-50 p-3 rounded uppercase hover:opacity-90 disabled:opacity-5">
          Sign-Up
        </button>
      </form>
      <div className="flex gap-3">
        <p className="">Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500"> Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
