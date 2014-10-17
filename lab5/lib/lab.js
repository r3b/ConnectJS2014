/*
 * lab4
 * https://github.com/ApigeeCorporation/lab
 *
 * Copyright (c) 2014 ryan bridges
 * Licensed under the MIT license.
 */

'use strict';
var census=require("./census.js");
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.send('<html>'+
             '<head><title>Zombie Apocolypse Countdown</title></head>'+
             '<body>'+
                '<header>'+
                    '<h1>Zombie Apocolypse Countdown</h1>'+
                '</header>'+
              '</body>'+
            '</html>');
});
app.get("/data/state/:state?", function(req, res){
  census.getStateList(function(data){
    if(req.params.state){
      res.json(data.filter(function(s){return (s[1].toLowerCase()===req.params.state.toLowerCase())}));
    }else{
      res.json(data);
    }
  });
});
app.get("/data/address/:state?/:city?/:street?", function(req, res){
  var street=req.query.street||req.params.street,
      city=req.query.city||req.params.city,
      state=req.query.state||req.params.state;
  census.lookupAddress(street, city, state, function(data){res.json(data);});
});
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send("We're here because you broke something.\n"+err.stack);
});
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
})
