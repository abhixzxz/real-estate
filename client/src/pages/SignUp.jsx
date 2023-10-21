import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div>
      <div className="p-3 max-w-lg items-center mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Sign-Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="border p-3 rounded lg"
            id="username"
          />
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
            {loading === true ? "loading.." : "Sign - Up"}
          </button>
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
