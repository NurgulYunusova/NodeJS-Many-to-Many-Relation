const express = require("express");
const { locationController } = require("../controllers/locationController");

const locationRoutes = express.Router();

locationRoutes.get("/", locationController.getAll);
locationRoutes.get("/:id", locationController.getById);
locationRoutes.post("/", locationController.add);
locationRoutes.put("/:id", locationController.put);
locationRoutes.delete("/:id", locationController.delete);

module.exports = {
  locationRoutes,
};
