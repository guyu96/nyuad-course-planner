function dragstart_handler(ev) {
 console.log("dragStart");
 // Change the source element's background color to signify drag has started
 event.dataTransfer.dropEffect = "copy";
 console.log(ev.target.id);
 ev.dataTransfer.setData("text", ev.target.id);
}

function dragover_handler(ev) {
 console.log("dragOver");
 // Change the target element's border to signify a drag over event
 // has occurred
 ev.preventDefault();
}

function drop_handler(ev) {

  console.log(ev.target.nodeName);
  console.log(ev.target.parentElement);

 console.log("Drop");

 ev.preventDefault();
 var data = ev.dataTransfer.getData("text");
 var parent = ev.target.nodeName;
 ev.target.appendChild(document.getElementById(data));
}
