const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app=express();

//Api file for interacting with mongodb
const api =require('./server/routes/api');

//parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//angular dist output folder
app.use(express.static(path.join(__dirname,'dist')));

//api location
app.use('/api', api);

//Send all other request to angular app
app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//set port
const port = process.env.port || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`running on local host:${port}`));
