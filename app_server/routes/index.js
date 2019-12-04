var express = require('express');
var router = express.Router();
const ctrlVatsim = require('../controllers/vatsim');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ZHU Trainer' });
});

/* doing departures the client-side (Angular) way */
router.get('/departures', function(req, res, next) {
  res.render('departures', { title: 'ZAB Depatures' });
});

/* doing arrivals the server-side (Express and Pug) way */
router.get('/arrivals', ctrlVatsim.vatsimArrivals);
router.post('/arrivals', ctrlVatsim.vatsimAirportSelection);

module.exports = router;
