import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  // signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

function SignIn() {
  const [formData, setFormData] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // console.log("formDat:=>", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div>
      <div className="p-3 max-w-lg items-center mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Sign-In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
          <input
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="border p-3 rounded lg"
            id="email"
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="border p-3 rounded lg"
            id="password"
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-slate-50 p-3 rounded uppercase hover:opacity-90 disabled:opacity-5"
          >
            {loading === true ? "loading.." : "Sign - In"}
          </button>
          <Oauth />
        </form>
        <div className="flex gap-3">
          <p className="">Dont have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500"> Sign up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}

export default SignIn;
