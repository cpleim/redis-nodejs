module.exports = (app) => {
    const vehicle = require('../controllers/VehicleController');

    //Get all
    app.get('/', vehicle.getAll);

    //Create vehicle
    app.post('/vehicle', vehicle.create);

    //Get by Type
    app.get('/:vehicleType/', vehicle.getByType);

    //Get by Type and Serial Number
    app.get('/:vehicleType/:sno', vehicle.getBySerial);
}