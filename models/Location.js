const { default: mongoose } = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: String,
  icon: String,
  jobs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Job", autopopulate: true },
  ],
});

locationSchema.plugin(require("mongoose-autopopulate"));

const Location = new mongoose.model("Location", locationSchema);

module.exports = {
  Location,
};
