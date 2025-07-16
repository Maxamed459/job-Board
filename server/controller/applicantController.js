import Applicant from "../model/Applicant.js";

export const submitApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      linkedin,
      education,
      experience,
      skills,
      coverLetter,
      jobId,
    } = req.body;

    // Optional: Prevent duplicate application
    const existing = await Applicant.findOne({ email, jobId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    const applicant = new Applicant({
      fullName,
      email,
      phone,
      linkedin,
      education,
      experience,
      skills,
      coverLetter,
      jobId,
    });

    await applicant.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      applicant,
    });
  } catch (error) {
    console.error("Error submitting application:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while submitting your application.",
    });
  }
};

export const getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applicants = await Applicant.find({ jobId });

    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error.message);
    res.status(500).json({
      success: false,
      message: "Could not fetch applicants.",
    });
  }
};

export const getTotalApplicants = async (req, res) => {
  try {
    const total = await Applicant.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: "Failed to count applicants" });
  }
};
