const vehicle = require('../models/vehicle.js');
const clearCache = require('../services/cache');


//Get all vehicle
exports.getAll = (req, res) => {
    vehicle.find({})
        .then((data) => {
            res.json({
                found: true,
                data: data
            });
        })
        .catch((err) => {
            console.log(err)
            res.json({
                found: false,
                data: null
            });
        })
};


//Create vehicle
exports.create = (req, res) => {
    new vehicle(req.body)
        .save()
        .then((v_data) => {
            console.log(v_data);
            res.json({
                save: true
            })
            clearCache(v_data.vehicleType)
        })
        .catch((err) => {
            console.log(err)
            res.json({
                save: false
            })
        })
}


//Get by Type
exports.getByType = (req, res) => {
    vehicle.find({
            vehicleType: req.params.vehicleType
        })
        .cache(req.params.vehicleType)
        .then((data) => {
            if (data) {
                res.json({
                    found: true,
                    data: data
                })
            } else {
                res.json({
                    found: false,
                    data: null
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.json({
                found: false,
                data: null
            })
        })
}


//Get by serial number
exports.getBySerial = (req, res) => {
    vehicle.findOne({
            serialno: req.params.sno,
            vehicleType: req.params.vehicleType
        })
        .cache(req.params.vehicleType)
        .then((data) => {
            if (data) {
                res.json({
                    found: true,
                    data: data
                })
            } else {
                res.json({
                    found: false,
                    data: null
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.json({
                found: false,
                data: null
            })
        })
}