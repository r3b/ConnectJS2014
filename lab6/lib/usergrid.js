'use strict';

var request=require("request");
var API_URL="https://api.usergrid.com/rbridges/connectjs2014/";
var endpoint=API_URL+"cases/";
var GET = function(endpoint, callback) {
  request(endpoint, function (error, response, body) {
    callback(body);
  });
};
var POST=function(endpoint, data, callback){
  var options = { uri: endpoint, method: 'POST', json: data };
  request(options, function(error, response, body){
    callback(body);
  });
};
exports.saveCase=function(name, lat, lon, city, state, callback){
  var entity={
    type:"case",
    name: name,
    city:city,
    state:state,
    location:{
        "latitude": lat,
        "longitude": lon
    },
  };
  POST(endpoint, entity, callback);
};
exports.getCases=function(name, callback){
  if(name){
    name=encodeURIComponent(name);
  }else{
    name="";
  }
  GET(endpoint+name, callback);
};
