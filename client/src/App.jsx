import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Link, Outlet } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import axios from "axios";

const App = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default App;
