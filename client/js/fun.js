var dummyList = [{id:"71", title:"Algorithms", description:"Something something", 
semester:[0,1,0,1], requirements: [78,60], 
prereq: ["Discrete Math", "Intro to CS"]}, 
{id:"54", title:"Data Stuctures", description:"Something other", 
semester:[0,1,0,1], requirements: [78,60,71], 
prereq: ["Discrete Math", "Intro to CS"]}]

var dummyCrit =
{title: null, semester: null, type: [76,77,78]}

function filter(list,criteria){
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

console.log(filter(dummyList,dummyCrit))
