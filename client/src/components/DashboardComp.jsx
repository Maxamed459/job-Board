import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const DashboardComp = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios.get("/api/job/get-jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="w-[20%] bg-slate-100 text-slate-800">
        <h1 className="text-xl text-center font-bold mt-9">Dashboard</h1>
        <button className="bg-slate-200 w-full p-2 font-bold mt-9">
          <Link to="/create-job">create job</Link>
        </button>
      </div>
      <div className="w-[80%] h-screen ">
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
    </div>
  );
};

export default DashboardComp;
