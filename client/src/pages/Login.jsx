import React, { useContext, useEffect } from "react";
import SignupComp from "../components/SignupComp";
import Header from "../components/Header";
import LoginComp from "../components/LoginComp";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <LoginComp />
      </div>
    </>
  );
};

export default Login;
