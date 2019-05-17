var fs = require('fs');
const path = require('path');
const insurance = require('../data/insurance.json');

module.exports = (app, io) => {
   let socketConnection;

   //console.log(movies);
   //Establishes socket connection.
   io.on("connection", socket => {
       console.log('Connected IO');
       socket.on('insurance', function(temp){
           //console.log("Movies requested " + movies);
           io.emit('insurance', insurance);
       });
   });
};
