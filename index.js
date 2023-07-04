const express = require("express");
const { db } = require("./config/db");

const app = express();

const cors = require("cors");

const { jobRoutes } = require("./routes/jobRoutes");
const { locationRoutes } = require("./routes/locationRoutes");

require("dotenv").config();

db.connect();

app.use(express.json());
app.use(cors());

app.use("/api/jobs", jobRoutes);
app.use("/api/locations", locationRoutes);

app.listen(3300, () => {
  console.log("Server listening on port 3300");
});
