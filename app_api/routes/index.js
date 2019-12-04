const express = require('express');
const router = express.Router();
const ctrlVatsim = require('../controllers/vatsim');

// vatsim
router
  //based on https://flightaware.com/commercial/flightxml/explorer/#op_Departed
  .route('/departed/:airport/:howMany/:offset')
  .get(ctrlVatsim.departed);

router
  //based on https://flightaware.com/commercial/flightxml/explorer/#op_Arrived  
  .route('/arrived/:airport/:howMany/:offset')
  .get(ctrlVatsim.arrived);

router
  //based on https://flightaware.com/commercial/flightxml/explorer/#op_FlightInfo
  .route('/flightinfo/:callsign')
  .get(ctrlVatsim.flightinfo);

module.exports = router;