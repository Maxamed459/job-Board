import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router";

const ApplyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    education: [{ school: "", degree: "", year: "" }],
    experience: [{ company: "", role: "", duration: "", description: "" }],
    skills: "",
    coverLetter: "",
    jobId: "",
  });

  useEffect(() => {
    axios.get("/api/job/get-jobs").then((res) => setJobs(res.data));
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (index, field, value, section) => {
    const updated = [...form[section]];
    updated[index][field] = value;
    setForm({ ...form, [section]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
    };
    await axios.post("/api/applicant/apply", payload);
    alert("Application submitted!");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Job Application Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border p-2"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2"
        />
        <input
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn Profile (optional)"
          className="w-full border p-2"
        />

        <div>
          <label className="font-semibold">Education History</label>
          {form.education.map((edu, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input
                value={edu.school}
                onChange={(e) =>
                  handleNestedChange(i, "school", e.target.value, "education")
                }
                placeholder="School"
                className="border p-2"
              />
              <input
                value={edu.degree}
                onChange={(e) =>
                  handleNestedChange(i, "degree", e.target.value, "education")
                }
                placeholder="Degree"
                className="border p-2"
              />
              <input
                value={edu.year}
                onChange={(e) =>
                  handleNestedChange(i, "year", e.target.value, "education")
                }
                placeholder="Year"
                className="border p-2"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="font-semibold">Work Experience</label>
          {form.experience.map((exp, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 mb-2">
              <input
                value={exp.company}
                onChange={(e) =>
                  handleNestedChange(i, "company", e.target.value, "experience")
                }
                placeholder="Company"
                className="border p-2"
              />
              <input
                value={exp.role}
                onChange={(e) =>
                  handleNestedChange(i, "role", e.target.value, "experience")
                }
                placeholder="Role"
                className="border p-2"
              />
              <input
                value={exp.duration}
                onChange={(e) =>
                  handleNestedChange(
                    i,
                    "duration",
                    e.target.value,
                    "experience"
                  )
                }
                placeholder="Duration"
                className="border p-2"
              />
              <input
                value={exp.description}
                onChange={(e) =>
                  handleNestedChange(
                    i,
                    "description",
                    e.target.value,
                    "experience"
                  )
                }
                placeholder="Description"
                className="border p-2"
              />
            </div>
          ))}
        </div>

        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (comma-separated)"
          className="w-full border p-2"
        />
        <textarea
          name="coverLetter"
          value={form.coverLetter}
          onChange={handleChange}
          placeholder="Cover Letter / Personal Statement"
          className="w-full border p-2"
        />

        <select
          name="jobId"
          value={form.jobId}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="">Select Job</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-slate-800 text-white w-full p-2 rounded hover:bg-slate-600"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
