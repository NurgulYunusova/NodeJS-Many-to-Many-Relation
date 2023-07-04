const { Job } = require("../models/Job");
const { Location } = require("../models/Location");

const locationController = {
  getAll: (req, res) => {
    Location.find()
      .populate("jobs")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: async (req, res) => {
    try {
      const locationId = req.params.id;
      const location = await Location.findById(locationId).populate("jobs");

      res.json(location);
    } catch (error) {
      res.status(500).json({ error: "Failed to get location" });
    }
  },
  add: async (req, res) => {
    try {
      const locationData = req.body;
      const newLocation = new Location(locationData);
      const createdLocation = await newLocation.save();

      res.status(201).json(createdLocation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create location" });
    }
  },
  put: async (req, res) => {
    try {
      const locationId = req.params.id;
      const updateData = req.body;
      const updatedLocation = await Location.findByIdAndUpdate(
        locationId,
        updateData,
        {
          new: true,
        }
      );

      res.json(updatedLocation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update location" });
    }
  },
  delete: async (req, res) => {
    try {
      const locationId = req.params.id;
      await Location.findByIdAndDelete(locationId);

      res.json({ message: "Location deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete location" });
    }
  },
};

module.exports = {
  locationController,
};
