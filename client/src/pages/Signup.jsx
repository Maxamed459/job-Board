import React, { useContext, useEffect } from "react";
import SignupComp from "../components/SignupComp";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <SignupComp />
      </div>
    </>
  );
};

export default Signup;
