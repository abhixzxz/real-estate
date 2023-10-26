import { useRef } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user.user);
  const fileRef = useRef(null);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-6 ">Profile</h1>
      <form className="flex flex-col gap-2">
        <input type="file" ref={fileRef} hidden />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile image"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          id="username"
          type="text"
          className="rounded-lg p-3 "
          placeholder="Username"
        />
        <input
          id="email"
          type="text"
          className="rounded-lg p-3 "
          placeholder="email"
        />
        <input
          id="password"
          type="password"
          className="rounded-lg p-3 "
          placeholder="password"
        />
        <button className="bg-slate-800 p-3 text-white rounded uppercase hover:opacity-90 disabled:opacity-80">
          submit
        </button>
      </form>
      <div className=" flex m-2 justify-between">
        <span className="text-red-600">Delete Account</span>
        <span className="text-red-600">Sign-out Account</span>
      </div>
    </div>
  );
}

export default Profile;
