import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  linkedin: String,

  education: [
    {
      school: String,
      degree: String,
      year: String,
    },
  ],

  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    },
  ],

  skills: [String],

  coverLetter: {
    type: String,
    maxlength: 2000,
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Applicant", applicantSchema);
