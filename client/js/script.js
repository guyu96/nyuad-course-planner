var category = JSON.parse('{"Previous Core Curriculum":["42","43","44","45","46","47","48"],"Islamic Studies":["49"],"Language":["50","51","52","53","161"],"Art and Art History":["59","60","61","62","159","160"],"Arts and Humanities Colloquia":["63"],"Biology":["64","65","66","67"],"Chemistry":["68","69"],"Civil Engineering":["70","71"],"Computer Engineering":["72"],"Computer Science":["73","74"],"Economics":["75","76","77","78"],"Electrical Engineering":["79","80"],"Film and New Media":["81","82","83","84","85"],"Foundations of Science":["86"],"General Engineering":["87","88","89","90"],"History":["91","92","93","94","95","96","97","98","162"],"Literature and Creative Writing":["99","100","101","102","103","158"],"Mathematics":["104","105"],"Mechanical Engineering":["106","107"],"Music":["108","109","110","111","112","113","114","115","116","117"],"Philosophy":["118","119","120","121","122","123","124"],"Physics":["125"],"Political Science":["126","127","128","129","130","131","132"],"Psychology":["134","135","136","137"],"Social Research and Public Policy":["138","139","140"],"Theater":["141","142","143"],"Visual Arts":["144","145","146","147"],"Arab Crossroads":["55","56","57","58","157"],"Physical Education":["148"],"Pre-Professional Courses":["149","150","151","152","154","155","156"],"Core Curriculum":["163","164","165","166","167","168"]}');

function populate_course_list() {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var courses = JSON.parse(this.responseText);
    console.log(courses);
  }
  xhr.open("GET", '/course-ad');
  xhr.send();
}

function populate_type_dropdown() {
  var dropdown = document.getElementById('course-type');
  var types = Object.keys(category);
  types.forEach(function(type) {
    var option = document.createElement('option');
    // todo: add value to element
    var text = document.createTextNode(type);
    option.appendChild(text);
    dropdown.append(option);
  });
  console.log(types);
}

function get_criteria () {
  var type = document.getElementById('course-type').value;
  var semester = document.getElementById('course-semester').value;
  var keyword = document.getElementById('course-name').value;

  return {'title': keyword, 'semester': parseInt(semester), 'type': category[type]}
}

function filter(list, criteria){
  var courses = new Array();

  list.forEach(function(c) {
    var req = true;

    if (criteria.title !== null && c.title.indexOf(criteria.title) === -1) {
      req = false;
    }

    if (criteria.semester !== null && c.semester[criteria.semester-1] !== 1){
      req = false;
    }

    var check = 0;
    c.requirements.forEach(function(r) {
      if (criteria.type.indexOf(r) > -1){
        check = 1;
      }
    });

    if (req && check !== 0){
      courses.push(c);
    }
  });

  return courses;
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


populate_type_dropdown();
populate_course_list();