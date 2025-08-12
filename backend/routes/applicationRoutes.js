const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  applyToJob,
  getMyApplications,
  getApplicationsForJob,
  downloadCV,
} = require("../controllers/applicationController");
const upload = require("../middleware/uploadMiddleware");

router.post("/:jobId", protect, upload.single("cv"), applyToJob);

router.get("/", protect, getMyApplications);

router.get("/job/:jobId", protect, getApplicationsForJob);

router.get("/download/:filename", protect, downloadCV);

module.exports = router;
