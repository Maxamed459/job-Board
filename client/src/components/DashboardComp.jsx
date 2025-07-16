import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router";

const DashboardComp = () => {
  const { logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/job/get-jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleViewApplicants = async (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
      setApplicants([]);
      return;
    }

    try {
      const res = await axios.get(`/api/applicant/job/${jobId}`);
      setApplicants(res.data);
      setExpandedJobId(jobId);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="w-[20%] bg-slate-100 text-slate-800 relative">
        <h1 className="text-xl text-slate-500 text-center font-bold mt-9">
          Job Board Dashboard
        </h1>

        <button className="bg-slate-200 w-full p-2 font-bold mt-9">
          Create Job
        </button>
        <button
          onClick={logout}
          className="bg-slate-200 w-full p-2 font-bold mt-4 absolute bottom-0 left-0"
        >
          <i className="fa-solid fa-right-from-bracket px-3"></i>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-[80%] h-screen overflow-y-scroll">
        <div className="grid grid-cols-2 gap-4 w-[95%] mt-4 mx-auto">
          {jobs.map((job) => (
            <div key={job._id} className="p-4 shadow-xl bg-gray-200 rounded">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p>{job.description}</p>
              <p className="font-bold text-red-700">Deadline: {job.deadline}</p>

              <div className="flex justify-between gap-2 mt-4">
                <button
                  onClick={() => handleViewApplicants(job._id)}
                  className="bg-blue-500 w-full p-2 font-bold text-white rounded"
                >
                  {expandedJobId === job._id
                    ? "Hide Appliers"
                    : "View Appliers"}
                </button>

                <button className="bg-green-500 w-full p-2 font-bold text-white rounded">
                  Update Job
                </button>

                <button className="bg-red-500 w-full p-2 font-bold text-white rounded">
                  Delete Job
                </button>
              </div>

              {/* Applicants Section */}
              {expandedJobId === job._id && (
                <div className="mt-4 bg-white p-3 rounded border border-slate-300">
                  <h4 className="font-bold text-lg mb-2">Applicants</h4>

                  {applicants.length === 0 ? (
                    <p className="text-gray-500">No applicants yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {applicants.map((a) => (
                        <li
                          key={a._id}
                          className="border p-2 rounded bg-gray-50 shadow-sm"
                        >
                          <p>
                            <strong>Name:</strong> {a.fullName}
                          </p>
                          <p>
                            <strong>Email:</strong> {a.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {a.phone}
                          </p>
                          <p>
                            <strong>Skills:</strong> {a.skills.join(", ")}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
