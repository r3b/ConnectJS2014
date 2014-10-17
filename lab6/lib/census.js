'use strict';

var request=require("request");
var API_KEY="15c5886957f022003d0dc3a4c08ebb48fb5d745b";

exports.getEndpoint = function(endpoint, callback) {
  request(endpoint, function (error, response, body) {
    callback(JSON.parse(body));
  });
};
exports.lookupAddress=function(street, city, state, callback){
  var _url="http://geocoding.geo.census.gov/geocoder/geographies/address?"+
              "street="+encodeURIComponent(street)+
              "&city="+encodeURIComponent(city)+
              "&state="+encodeURIComponent(state)+
              "&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json";
  exports.getEndpoint(_url, callback);
};
exports.getStateList = function(callback) {
  var _url="http://api.census.gov/data/2010/sf1?get=P0010001,NAME&for=state:*&key="+API_KEY;
  exports.getEndpoint(_url, callback);
};
