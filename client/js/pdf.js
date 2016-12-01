// Default export is a4 paper, portrait, using milimeters for units
function savetoPDF(){
  var doc = new jsPDF()
  var counter=0;
  for (var i=0; i<4; i++){
    var planner = document.getElementById(i);
    console.log(planner.className);
    var planner_children = planner.childNodes;
    console.log(planner_children);
    for (var j=0; j<planner_children.length; j++){
      var text = planner_children[j].textContent;
      console.log(text);
      doc.text(text, 10, 10+(counter*10));
      counter++;
      var semester_children = planner_children[j].childNodes;
      for (var k=0; k<semester_children.length; k++){
        var text = semester_children[k].textContent;
        console.log(text);
        doc.text(text, 10, 10+(counter*10));
        counter++;
      }
    }
  }
  doc.save('FourYearPlan.pdf');
}
