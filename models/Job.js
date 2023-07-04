const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  minSalary: Number,
  maxSalary: Number,
  addDate: { type: Date, default: Date.now },
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
});

const Job = new mongoose.model("Job", jobSchema);

module.exports = {
  Job,
};
