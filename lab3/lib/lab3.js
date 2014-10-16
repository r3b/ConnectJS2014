/*
 * lab3
 * https://github.com/ApigeeCorporation/lab3
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
  var answers=[];
  items.forEach(function(item){

    answers.push(""+item+(("string"===typeof item)?" is":" is not")+ " a string.");
  });
  return answers;
};
