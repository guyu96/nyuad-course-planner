function dragstart_handler(ev) {
 console.log("dragStart");
 // Change the source element's background color to signify drag has started
 event.dataTransfer.dropEffect = "copy";
 ev.dataTransfer.setData("text", ev.target.id);
}

function dragover_handler(ev) {
 console.log("dragOver");
 // Change the target element's border to signify a drag over event
 // has occurred
 ev.preventDefault();
}

function dragleave_handler(ev) {
 console.log("dragLeave");
 // Change the source element's border back to white
 ev.currentTarget.style.background = "white";
}

function drop_handler(ev) {
 console.log("Drop");
 ev.preventDefault();
 var data = ev.dataTransfer.getData("text");
 ev.target.appendChild(document.getElementById(data));
}


// function init() {
//  // Set handlers for the source's enter/leave/end/exit events
//  var el=document.getElementById("source");
//  el.ondragenter = dragenter_handler;
//  el.ondragleave = dragleave_handler;
//  el.ondragend = dragend_handler;
//  el.ondragexit = dragexit_handler;
// }
