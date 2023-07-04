const express = require("express");
const { jobController } = require("../controllers/jobController");

const jobRoutes = express.Router();

jobRoutes.get("/", jobController.getAll);
jobRoutes.get("/:id", jobController.getById);
jobRoutes.post("/", jobController.add);
jobRoutes.put("/:id", jobController.put);
jobRoutes.delete("/:id", jobController.delete);

module.exports = {
  jobRoutes,
};
