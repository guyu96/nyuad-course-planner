function dragstart_handler(ev) {
  // console.log("dragStart");
  // Change the source element's background color to signify drag has started
  event.dataTransfer.dropEffect = "copy";
  // console.log(ev.target.id);
  ev.target.childNodes.forEach(function(childNode) {
    if (childNode.nodeName === 'P') {
      ev.dataTransfer.setData("semester", childNode.textContent);
    }
  });
  ev.dataTransfer.setData("id", ev.target.id);
  ev.dataTransfer.setData("src", ev.target.parentElement.className);
}

function dragover_handler(ev) {
  // console.log("dragOver");
  ev.preventDefault();
}

function semester_does_match(planner_semester, course_semesters) {
  var sem_map = {
    'fall-planner': 'Fall',
    'jterm-planner': 'J-term',
    'spring-planner': 'Spring',
    'summer-planner': 'Summer'
  }
  return course_semesters.indexOf(sem_map[planner_semester]) !== -1;
}

function drop_handler(ev) {

  console.log(ev.target.nodeName);
  console.log(ev.target.parentElement);
  console.log("Drop");

  ev.preventDefault();

  var original_id = ev.dataTransfer.getData("id");
  var original_src = ev.dataTransfer.getData('src');
  var course_sem = ev.dataTransfer.getData('semester');
  var node = ev.target;
  var new_parent;

  var sem_match = false;

  // case 1: drop to course-box directly
  if (node.id === 'course-box') {
    console.log('case 1');
    new_parent = node;
    sem_match = true;
  // case 2: drop to a planner directly
  } else if (node.className.indexOf('planner') !== -1) {
    console.log('case 2');
    new_parent = node;
    sem_match = semester_does_match(new_parent.className, course_sem);
  // dropped to neither
  } else {
    console.log('case 3');
    while (node !== null && node.className !== 'course') {
      console.log('node is not outercontainer', node.nodeName);
      node = node.parentElement;
    }
    if (node === undefined) return;
    new_parent = node.parentNode;
    if (new_parent.id == 'course-box') {
      sem_match = true;
    } else {
      sem_match = semester_does_match(new_parent.className, course_sem);
    }
  }

  if (!sem_match) return;
  if (original_src === new_parent.className) return;

  console.log(new_parent.className);
  new_parent.appendChild(document.getElementById(original_id));


  // // if neither planner area or course-box
  // if (idx === -1 && node.id !== 'course-box') {
  //   while (node !== null && node.className !== 'course') {
  //     console.log('node is not outercontainer', node.nodeName);
  //     node = node.parentElement;
  //   }

  //   if (node === null)
  //     return

  //   node = node.parentElement;
  //   if (node.className === ev.dataTransfer.getData('src'))
  //     return;

  //   idx = accepted_classes.indexOf(node.className)
  //   if (idx === 3) {
  //   if (semester.indexOf('Summer') !== -1)
  //     node.appendChild(document.getElementById(data));
  //   } else if (idx === 2) {
  //     if (semester.indexOf('Spring') !== -1)
  //       node.appendChild(document.getElementById(data));
  //   } else if (idx === 1) {
  //     if (semester.indexOf('J-term') !== -1)
  //       node.appendChild(document.getElementById(data));
  //   } else if (idx === 0) {
  //     if (semester.indexOf('Fall') !== -1)
  //       node.appendChild(document.getElementById(data));
  //   } else if (node.id === 'course-box') {
  //     node.appendChild(document.getElementById(data));
  //   }
  // } else {

  // }
  


  // if (idx === 3) {
  //   if (semester.indexOf('Summer') !== -1)
  //     node.appendChild(document.getElementById(data));
  // } else if (idx === 2) {
  //   if (semester.indexOf('Spring') !== -1)
  //     node.appendChild(document.getElementById(data));
  // } else if (idx === 1) {
  //   if (semester.indexOf('J-term') !== -1)
  //     node.appendChild(document.getElementById(data));
  // } else if (idx === 0) {
  //   if (semester.indexOf('Fall') !== -1)
  //     node.appendChild(document.getElementById(data));
  // } else if (node.id === 'course-box') {
  //   node.appendChild(document.getElementById(data));
  // } else {
  //   while (node !== null && node.className !== 'course') {
  //     console.log('node is not outercontainer', node.nodeName);
  //     node = node.parentElement;
  //   }
  //   if (node !== null) {
  //     node = node.parentElement;
  //     console.log('final parent', node.nodeName);
  //     var finalidx = accepted_classes.indexOf(node.className);
  //     if (finalidx === 3) {
  //       if (semester.indexOf('Summer') !== -1)
  //         node.appendChild(document.getElementById(data));
  //     } else if (finalidx === 2) {
  //       if (semester.indexOf('Spring') !== -1)
  //         node.appendChild(document.getElementById(data));
  //     } else if (finalidx === 1) {
  //       if (semester.indexOf('J-term') !== -1)
  //         node.appendChild(document.getElementById(data));
  //     } else if (finalidx === 0) {
  //       if (semester.indexOf('Fall') !== -1)
  //         node.appendChild(document.getElementById(data));
  //     } else if (node.id === 'course-box') {
  //       node.appendChild(document.getElementById(data));
  //     }
  //   }
  // }



  // if (accepted_classes.indexOf(node.className) || node.id === 'course-box') {
  //   console.log('dropping directly to container');
  //   node.appendChild(document.getElementById(data));
  // } else {
  //   while (node !== null && node.className !== 'course') {
  //     console.log('node is not outercontainer', node.nodeName);
  //     node = node.parentElement;
  //   }
  //   if (node !== null) {
  //     console.log('final parent', node.parentElement.nodeName);
  //     node.parentElement.appendChild(document.getElementById(data));
  //   }
  // }
}
