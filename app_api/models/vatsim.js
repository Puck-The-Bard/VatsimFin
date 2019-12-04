const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clientSchema = new Schema({
    callsign: String,
    cid: String,
    realname: String,
    clienttype: String,
    frequency: String,
    latitude: String,
    longitude: String,
    heading: String,
    altitude: String,
    groundspeed: String,        
    /*osition: [{
        timestamp: Date,
        frequency: String,
        latitude: String,
        longitude: String,
        heading: String,
        altitude: String,
        groundspeed: String,        
    }], */
    planned_tascruise: String,
    planned_depairport: String,
    planned_altitude: String,
    planned_destairport: String,
    server: String,
    protrevision: String,
    rating: String,
    transponder: String,
    facilitytype: String,
    visualrange: String,
    planned_flighttype: String,
    planned_deptime: String,
    planned_actdeptime: String,
    planned_hrsenroute: String,
    planned_minenroute: String,
    planned_hrsfuel: String,
    planned_minfuel: String,
    planned_altairport: String,
    planned_remarks: String,
    planned_route: String,
    planned_depairport_lat: String,
    planned_depairport_lon: String,
    planned_destairport_lat: String,
    planned_depairport_lon: String,
    atis_message: String,
    time_last_atis_received: String,
    time_logon: String,
    QNH_iHg: String,
    QNH_Mb: String,
});

mongoose.model('Client', clientSchema);

//const Client = mongoose.model('Client', clientSchema);