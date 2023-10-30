import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

function SignUp() {
  const [formData, setFormData] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        setError(null);
        navigate("/sign-in");
      } else {
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  return (
    <div>
      <div className="p-3 max-w-lg items-center mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Sign-Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="bg-slate-700 text-slate-50 p-3 rounded uppercase hover:opacity-90 disabled:opacity-5"
          >
            {loading === true ? "loading.." : "Sign - Up"}
          </button>
          <Oauth />
        </form>
        <div className="flex gap-3">
          <p className="">Have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-500"> Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}

export default SignUp;
