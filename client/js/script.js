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
