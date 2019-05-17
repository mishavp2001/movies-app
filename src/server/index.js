const express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var movies = require('./data/movies.json');
var insurance = require('./data/insurance.json');

const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('dist'));
app.use(bodyParser.json());
app.get('/api/movies', function(req, res){
    res.send(movies);
});

app.get('/api/insurance', function(req, res){
    res.send(insurance);
});

require('./routes/movies.js')(app, io);
require('./routes/insurance.js')(app, io);

http.listen(8080, () => console.log('Listening on port 8080!'));
