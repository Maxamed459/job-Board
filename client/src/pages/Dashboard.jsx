import React, { useContext, useEffect } from "react";
import DashboardComp from "../components/DashboardComp";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <div>
        <DashboardComp />
      </div>
    </>
  );
};

export default Dashboard;
