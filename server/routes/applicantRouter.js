import express from "express";
import {
  submitApplication,
  getApplicantsByJob,
  getTotalApplicants,
} from "../controller/applicantController.js";

const applicantRouter = express.Router();

applicantRouter.post("/apply", submitApplication); // Public CV submission
applicantRouter.get("/job/:jobId", getApplicantsByJob); // Admin view by job
applicantRouter.get("/count", getTotalApplicants); // Optional total count

export default applicantRouter;
