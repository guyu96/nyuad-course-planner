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
    while (node !== null && node.className !== 'course' && node.className !=='course small-course') {
      console.log('node is not outercontainer', node.nodeName);
      node = node.parentElement;
    }
    if (!node) return;
    new_parent = node.parentNode;
    if (new_parent.id == 'course-box') {
      sem_match = true;
    } else {
      sem_match = semester_does_match(new_parent.className, course_sem);
    }
  }

  if (!sem_match) return;
  if (original_src === new_parent.className) return;

  var course_node = document.getElementById(original_id);
  if (new_parent.id === 'course-box') {
    course_node.setAttribute('class', 'course');
  } else {
    course_node.setAttribute('class', 'course small-course');
  }
  new_parent.appendChild(course_node);
}
