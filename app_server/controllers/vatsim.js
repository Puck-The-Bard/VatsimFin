const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};

const Airports = [
    //Alabama
    "KMOB", //KMOB - MOBILE AIRPORT
    //Louisiana
    "KAEX", //KAEX - Alexandria Int Airport
    "KBTR", //KBTR - Baton Rouge Metropolitan Airport
    "KLFT", //KLFT - Lafayette Regional Airport
    "KLCH", //KLCH - Lake Charles Regional Airport
    "KMSY", //KMSY - Louis Armstrong New Orleans Int. Airport
    //Mississippi
    "KGPT", //KGPT - Gulport-Biloxi International Airport
    //Texas
    "KAUS", //KAUS - Austin Bergstorm International Airport
    "KBPT", //KBPT - Jack Brooks Regional Airport
    "KBRO", //KBRO - Brownsville/South Padre Island International Airport
    "KCLL", //KCLL - Easterwood Airport
    "KCRP", //KCRP - Corpus Christi INternational Airport
    "KDRT", //KDRT - Del Rio International Airport
    "KHRL", //KHRL - Valley International Airport
    "KIAH", //KIAH - George Bush INtercontinental Airport
    "KHOU", //KHOU - William P. Hobby Airport
    "KLRD", //KLRD - Laredo International Airport
    "KMFE", //KMFE - McAllen Miller Internaional Airport
    "KSAT", //KSAT - San Antonio International Airport
    "KGLS", //KGLS - Scholes International Airport at Galveston
    "KVCT"  //Victoria Regional Airport
  ];

// Airports.forEach((airport) => {
//     console.log(airport);
// })

let selectedAirport = "KCLT";

const vatsimAirportSelection = (req, res) => {
    console.log(req.body);
    selectedAirport = req.body.selectedAirport;
    console.log(`Selected Airport: ${selectedAirport}`);
    vatsimArrivals(req, res);
}

const vatsimArrivals = (req, res) => {
    // /arrived/:airport/:howMany/:offset
    console.log(`Selected Airport: ${selectedAirport}`);
    const path = `/api/arrived/${selectedAirport}/15/0`;
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {},
    };
    request(
      requestOptions,
      (err, {statusCode}, body) => {
        let data = [];
        if (statusCode === 200 && body.length) {
            data = body;
        }
        renderArrivalsPage(req, res, data);
      }
    );
};
  
const renderArrivalsPage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)) {
      message = 'API lookup error';
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = 'No results for this airport';
      }
    }
    res.render('arrivals', 
        {
            airports: Airports,
            clients: responseBody,
            message,
            selectedAirport
        }
    );
};

  module.exports = {
    vatsimArrivals,
    vatsimAirportSelection
  };