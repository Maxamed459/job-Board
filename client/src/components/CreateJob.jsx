import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const CreateJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/job/create-job", jobData);
      if (data.success) {
        alert(data.message);
        setJobData({ title: "", description: "", deadline: "" }); // clear form
      }
    } catch (error) {
      console.error(
        "Job creation error:",
        error.response?.data?.message || error.message
      );
      alert("Failed to create job");
    }
  };

  return (
    <>
      <Header />

      <div className="border border-slate-300 shadow-lg p-6 rounded w-[400px] mx-auto mt-6">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="grid gap-1">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={jobData.title}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Enter job title"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={jobData.description}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Enter job description"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="deadline">Deadline</label>
            <input
              id="deadline"
              type="date"
              value={jobData.deadline}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-slate-800 text-white py-2 rounded hover:bg-slate-700"
          >
            Create Job
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateJob;
