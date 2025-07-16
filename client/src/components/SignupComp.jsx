import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const SignupComp = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { registerUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(userData);
  };

  return (
    <div className="border-1 border-slate-700 shadow-lg p-4">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] p-4 flex flex-col space-y-3"
      >
        <div className="grid gap-2">
          <label>Username</label>
          <input
            onChange={handleChange}
            className="w-full border-1 px-4 py-1 rounded-md"
            type="text"
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="grid gap-2">
          <label>Email</label>
          <input
            onChange={handleChange}
            className="w-full border-1 px-4 py-1 rounded-md"
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="grid gap-2">
          <label>password</label>
          <input
            onChange={handleChange}
            className="w-full border-1 px-4 py-1 rounded-md"
            type="password"
            id="password"
            placeholder="Enter your username"
          />
        </div>
        <div className="grid gap-2">
          <button
            className="w-full mt-4 bg-slate-900 text-white border-1 px-4 py-1 rounded-md"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupComp;
