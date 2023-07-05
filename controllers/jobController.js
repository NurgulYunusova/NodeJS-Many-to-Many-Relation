const { Job } = require("../models/Job");
const { Location } = require("../models/Location");

const jobController = {
  getAll: (req, res) => {
    Job.find()
      .populate("locations")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const job = await Job.findById(id).populate("locations");
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "Failed to get job" });
    }
  },
  add: async (req, res) => {
    try {
      const { title, summary, description, minSalary, maxSalary, locations } =
        req.body;

      const job = new Job({
        title,
        summary,
        description,
        minSalary,
        maxSalary,
        locations,
      });

      const createdJob = await job.save();

      await Location.updateMany(
        { _id: { $in: locations } },
        { $push: { jobs: createdJob._id } }
      );

      res.status(201).json(createdJob);
    } catch (error) {
      res.status(500).json({ error: "Failed to create job" });
    }
  },
  put: async (req, res) => {
    try {
      const jobId = req.params.id;
      const updateData = req.body;
      const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
        new: true,
      });
      res.json(updatedJob);
    } catch (error) {
      res.status(500).json({ error: "Failed to update job" });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const job = await Job.findById(id);

      console.log(job);
      const locationIds = job.locations;

      await Location.updateMany(
        { _id: { $in: locationIds } },
        { $pull: { jobs: id } }
      );

      const deletedJob = await Job.findByIdAndDelete(id);

      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json("Job deleted successfully");
    } catch (error) {
      res.status(500).json({ error: "Failed to delete job" });
    }
  },
};

module.exports = {
  jobController,
};
