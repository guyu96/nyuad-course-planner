// Default export is a4 paper, portrait, using milimeters for units
function savetoPDF(){
  years=["Freshman", "Sophomore", "Junior", "Senior"]
  var doc = new jsPDF()
  var counter=0;
  for (var i=0; i<4; i++){
    doc.setFontSize(14);
    doc.text(years[i], 10, 10+(counter*5));
    counter++;
    var planner = document.getElementById(i);
    console.log(planner.className);
    var planner_children = planner.childNodes;
    console.log(planner_children);
    for (var j=0; j<planner_children.length; j++){
      var text = planner_children[j].textContent;
      var semester_children = planner_children[j].childNodes;
      for (var k=0; k<semester_children.length; k++){

        var innertext = semester_children[k].textContent;
        console.log(innertext);
        doc.setFontSize(10);
        doc.text(innertext, 10, 10+(counter*5));
        console.log(counter);
        counter++;
        if (counter > 56){
          doc.addPage('a4');
          counter=0;
        }
      }
    }
  }
  doc.save('FourYearPlan.pdf');
}
