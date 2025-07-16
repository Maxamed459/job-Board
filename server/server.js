import express, { json } from "express";
import { PORT } from "./config/config.js";
import connectDb from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import applicantRouter from "./routes/applicantRouter.js";
import jobRouter from "./routes/jobRouter.js";

const app = express();
app.use(json());

app.use("/api/user", userRouter);
app.use("/api/applicant", applicantRouter);
app.use("/api/job", jobRouter);

await connectDb();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
