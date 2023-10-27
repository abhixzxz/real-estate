import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(
    (state) => state.user.user
  );
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // const [updateSuccess, setUpdateSuccess] = useState(false);
  // const [showListingsError, setShowListingsError] = useState(false);
  // const [userListings, setUserListings] = useState([]);
  // const dispatch = useDispatch();
  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-6 ">Profile</h1>
      <form className="flex flex-col gap-2">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile image"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
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
