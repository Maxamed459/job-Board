import React, { useEffect, useState } from "react";
// import Header from "./components/Header";
import { Link, Outlet } from "react-router";
// import { AuthProvider } from "../context/AuthContext";
import axios from "axios";
import Header from "../components/Header";

const JobLists = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios.get("/api/job/get-jobs").then((res) => setJobs(res.data));
  }, []);
  return (
    <div className="w-[90%] mx-auto">
      <button className="w-full p-2 bg-slate-800 text-white mt-4">
        <Link to="/apply-job">Apply Job</Link>
      </button>
      <div className="grid grid-cols-3 gap-4 w-[90%] mt-9 mx-auto">
        {jobs.map((job, index) => (
          <div index={index} className="p-2 shadow-lg bg-gray-100">
            <h3 className="text-xl font-bold ">{job.title}</h3>
            <p>{job.description}</p>
            <p className="font-bold text-red-700">{job.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobLists;
