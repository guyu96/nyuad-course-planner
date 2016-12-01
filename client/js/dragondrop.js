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
  var node = ev.target;
  var accepted_classes = [
    'fall-planner',
    'jterm-planner',
    'spring-planner',
    'summer-planner'
  ];

  console.log('original dropped node with id ', node.id);
  if (accepted_classes.includes(node.className) || node.id === 'course-box') {
    console.log('dropping directly to container');
    node.appendChild(document.getElementById(data));
  } else {
    while (node !== null && node.className !== 'course') {
      console.log('node is not outercontainer', node.nodeName);
      node = node.parentElement;
    }
    if (node !== null) {
      console.log('final parent', node.parentElement.nodeName);
      node.parentElement.appendChild(document.getElementById(data));
    }
  }
}
