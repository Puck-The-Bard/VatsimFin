const mongoose = require('mongoose');
const Client = mongoose.model('Client');


/**
 * Convert from a VATSIm time login value to a JS date
 * @param {string} time_logon 
 */
const vatsimTimeLogonToDate = (time_logon) => {

    //20191023002813
    // console.log(time_logon);
    let year = parseInt(time_logon.slice(0,4));
    // console.log(`year: ${year}`);
    let month = parseInt(time_logon.slice(4,6));
    // console.log(`month: ${month}`);
    let day = parseInt(time_logon.slice(6,8));
    // console.log(`day: ${day}`);
    let hour = parseInt(time_logon.slice(8,10));
    // console.log(`hour: ${hour}`);
    let minute = parseInt(time_logon.slice(10,12));
    // console.log(`minute: ${minute}`);
    let second = parseInt(time_logon.slice(12,14));
    // console.log(`second: ${second}`);

    //creating a new date in Zulu Time: https://stackoverflow.com/questions/439630/create-a-date-with-a-set-timezone-without-using-a-string-representation
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second, 0));

    return date;

}

/**
 * check to see if the record is within the last day 
 * @param {JS Date} date 
 */
const isOlderThanADay = (date) => {
    //one day in milliseconds
    const day = 1000 * 60 * 60 * 24;

    //grab current time
    let rightnow = Date.now();

    return rightnow - date > day ? true : false;
}

/**
 * PILOT client has departed
 * @param {http request} req 
 * @param {http response} res 
 */
const departed = (req, res) => {
    console.log(req.params.airport);
    const airport = req.params.airport;
    const offset = parseInt(req.params.offset);
    const howMany = parseInt(req.params.limit);
    Client.find(
        {
            planned_depairport: req.params.airport,
        },
        null,
        {
            skip: offset,
            limit: howMany
        },
        //callback
        (err, docs) => {

            let records = [];

            docs.forEach( (document) => {
                if (!isOlderThanADay(vatsimTimeLogonToDate(document.time_logon))){
                    records.push(document);
                }
            });
            //send records back
            if(!err){
                res.send(records);
            }else{
                res.send(err);
                console.log(err);
            }
        }
    );
}

/**
 * Client has arrived at an airport
 * @param {http request} req 
 * @param {http response} res 
 */
const arrived = (req, res) => {

    console.log(req.params.airport);
    const airport = req.params.airport;
    const offset = parseInt(req.params.offset);
    const howMany = parseInt(req.params.limit);

    Client.find(
        {
            planned_destairport: airport,
        },
        null,
        {
            skip: offset,
            limit: howMany
        },
        //callback
        (err, docs) => {
            let records = [];

            docs.forEach( (document) => {
                if (!isOlderThanADay(vatsimTimeLogonToDate(document.time_logon))){
                    records.push(document);
                }
            });
            //send records back
            if(!err){
                res.send(records);
            }else{
                res.send(err);
                console.log(err);
            }
        }
    );
}

const flightinfo = (req, res) => {
    console.log(req.params.callsign);
    const callsign = req.params.callsign;

    Client.find(
        {
            callsign: callsign,
        },
        //callback
        (err, docs) => {
            //send records back
            if(!err){
                res.send(docs);
            }else{
                res.send(err);
                console.log(err);
            }
        }
    );    

}

module.exports = {
  arrived,
  departed,
  flightinfo,
};