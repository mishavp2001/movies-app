var fs = require('fs');
const path = require('path');
const movies = require('../data/movies.json');

module.exports = (app, io) => {
   let socketConnection;

   //console.log(movies);
   //Establishes socket connection.
   io.on("connection", socket => {
       console.log('Connected IO');
       socket.on('movies', function(temp){
           //console.log("Movies requested " + movies);
           io.emit('movies', movies);
       });
   });
};
