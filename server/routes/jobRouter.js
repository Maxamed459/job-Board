import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
} from "../controller/jobController.js";

const jobRouter = express.Router();

jobRouter.post("/create-job", createJob); // POST /api/jobs
jobRouter.get("/get-jobs", getAllJobs); // GET /api/jobs
jobRouter.get("/getJob-by:id", getJobById); // GET /api/jobs/:id
jobRouter.delete("/delete-job:id", deleteJob); // DELETE /api/jobs/:id

export default jobRouter;
