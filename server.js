const fs        = require('fs');
// const config    = require('./config.json;')
const express   = require('express');
const csv       = require('csvtojson');

const server = express();

server.use(express.static('public'));

const port = 3000;

console.log("Creating endpoint " + "/weatherData");
server.get("/weatherData", (req, res) => {
    const weather_data_file = "/home/pi/projects/weather/data.json";

    let rawdata = fs.readFileSync(weather_data_file);
    let jsondata = JSON.parse(rawdata);

    res.statusCode = 200;
    res.setHeader('Content-Type', "application/json");
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.end(JSON.stringify(jsondata))
    
});

console.log("Creating endpoint " + "/cryptoTraderLogs");
server.get("/cryptoTraderLogs", (req, res) => {
    const crypto_trader_logs = "/home/adam/Documents/projects/crypto_trader/logs/log.csv"

    res.statusCode = 200;
    res.setHeader('Content-Type', "application/json");
    res.setHeader('Access-Control-Allow-Origin', "*");
    
    csv()
        .fromFile(crypto_trader_logs)
        .then(function(jsonArrayObj) {
            res.end(JSON.stringify(jsonArrayObj));
    })
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });