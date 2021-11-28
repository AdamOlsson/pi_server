const http = require('http');
const fs = require('fs');
const config = require('./config.json')
const express = require('express')

const server = express();

server.use(express.static('public'));

config.projects.forEach(project => {
    console.log("Creating endpoint " + project.route);
    server.get(project.route, (req, res) => {

        let rawdata = fs.readFileSync(project.response_file);
        let jsondata = JSON.parse(rawdata);
    
        res.statusCode = 200;
        res.setHeader('Content-Type', project['content-type']);
        res.setHeader('Access-Control-Allow-Origin', project['access-control-allow-origin']);
        res.end(JSON.stringify(jsondata))
        
    })
});

server.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}/`);
  });