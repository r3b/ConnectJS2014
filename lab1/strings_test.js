var items=[ 1, 2, "three" ];

for(var i=0;i<items.length;i++){
  var item=items[i], message="";
  message += item + " ";
  if("string"===typeof item){
    message += "is a string.";
  }else{
    message += "is not a string.";

  }
  console.log(message);
}

items.forEach(function(item){
  console.log(""+item, ("string"===typeof item)?"is":"is not", "a string.");
});
