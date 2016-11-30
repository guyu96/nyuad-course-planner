function dragstart_handler (event) {
  // event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  console.log("dragstart");
}


function dragover_handler (event) {
  // event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  console.log("dragging over");
}

function drop_handler (event) {
  event.preventDefault();
  console.log("dropped");
}

function previous_year(){
  var i;
  for( i=0; i<4; i++){
    if (!(($("#"+i).hasClass('disabled')))){
      break;
    }
  }
  console.log(i);
  if(i===0){
    return;
  }
  else {
    for(var j=0; j<4; j++){
      if(j===i-1){
        $("#"+j).removeClass('disabled');
      }
      if(j===i){
        $("#"+j).addClass('disabled');
      }
    }
  }
}

function next_year(){
  var i;
  for( i=0; i<4; i++){
    if (!(($("#"+i).hasClass('disabled')))){
        break;
    }
  }
  console.log(i);
  if(i===3){
    return;
  }
  else {
    for(var j=0; j<4; j++){
      if(j===i+1){
        $("#"+j).removeClass('disabled');
      }
      if(j===i){
        $("#"+j).addClass('disabled');
      }
    }
  }
}
