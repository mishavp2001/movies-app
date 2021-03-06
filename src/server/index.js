const express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var movies = require('./data/movies.json');

const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('dist'));
app.use(bodyParser.json());
app.get('/api/movies', function(req, res){
    res.send(movies);
});

require('./routes/movies.js')(app, io);

http.listen(8080, () => console.log('Listening on port 8080!'));
