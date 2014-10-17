/*
 * lab6
 * https://github.com/ApigeeCorporation/lab
 *
 * Copyright (c) 2014 ryan bridges
 * Licensed under the MIT license.
 */

'use strict';
exports.awesome = function() {
  return 'awesome';
};
exports.isString = function(items) {
  if (items===null || "undefined" === typeof items || items.length===0){
    return null;
  }
  if(!Array.isArray(items)){
    items=[items];
  }
  return items.map(function(item){
    return item+(("string"===typeof item)?" is a string.":" is not a string.");
  });
};

var census=require("./census.js");
var usergrid=require("./usergrid.js");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.get("/data/state/:state?", function(req, res){
  census.getStateList(function(data){
    if(req.params.state){
      res.json(data.filter(function(s){return (s[1].toLowerCase()===req.params.state.toLowerCase());}));
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
app.get("/data/cases/:name?", function(req, res){
  var name=req.query.name||req.params.name;
  usergrid.getCases(name, function(data){res.json(data.data);});
});
//curl -v -X POST http://localhost:3000/cases -d '{"name":"Not Sure", "street":"1572 Boulder Walk Drive", "city":"Atlanta", "state":"Georgia"}' -H "content-type: application/json"
app.post("/data/cases", function(req, res){
  console.log(req.body);
  var name=req.body.name,
      street=req.body.street,
      city=req.body.city,
      state=req.body.state,
      lat,lon;
  //get the lat/lon
  census.lookupAddress(street, city, state, function(ldata){
    var match=ldata.result.addressMatches.pop();
    if(match){
      lat=match.coordinates.x;
      lon=match.coordinates.y;
    }
    usergrid.saveCase(name, lat, lon, city, state, function(data){res.json(data.entities.pop());});
  });
});
app.get("/data/infectionrate/:state?", function(req, res){
  res.json({infection_rate: 0});
});
app.get("/data/timeremaining/:state?", function(req, res){
  res.json({time_remaining: Infinity});
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send("We're here because you broke something.\n"+err.stack);
  next();
});
var server = app.listen(3000, function () {
  var host = server.address().address,
      port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
});
