var _=require("underscore"),
    items=[ 1, 2, "three" ];

_.each(items, function(item){
  console.log(""+item, _.isString(item), "a string.");
});
