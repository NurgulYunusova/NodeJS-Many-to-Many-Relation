const { location } = require("../models/Location");


const locationController = {
    add: async (req, res) => {

        try {
            let location = new Location({
                name: req.body.name,
                icon: req.body.icon,
            });
            await location.save();

            res.status(201).json(location);
        } catch (error) {
            res.status(500).json(error)
        }

    },
    getAll: async (req,res) => {

        let data = await location.find();

        res.json(data)

    }
}


module.exports = {
    locationController
}