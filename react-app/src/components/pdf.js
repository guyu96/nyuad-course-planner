// Default export is a4 paper, portrait, using milimeters for units
var pdfConverter = require('jspdf');

const PDF = {
    savetoPDF(){
      var years = ["Freshman", "Sophomore", "Junior", "Senior"]
      var doc = new pdfConverter();
      var counter=0;
      for (var i=0; i<4; i++){
        doc.setFontSize(14);
        counter++;
        doc.text(years[i], 10, 10+(counter*10));
        counter++;
        var planner = document.getElementById(i+"");
        // console.log(planner.className);
        var planner_children = planner.childNodes;
        // console.log(planner_children);
        for (var j=0; j<planner_children.length; j++){
        //   var text = planner_children[j].textContent;
          var semester_children = planner_children[j].childNodes;

        //   console.log(semester_children);

          for (var k=0; k<semester_children.length; k++){
                var node = semester_children[k];
                console.log(node.childNodes);
                // if it's course name, print with a smaller font & add additional constraints
                if (node.childNodes[0] && node.childNodes[0].nodeName === "LI") {
                    doc.setFontSize(10);
                    let courseList = node.childNodes;
                    console.log(courseList);
                    for (let i=0; i < courseList.length; i++) {
                        let textContent = courseList[i].childNodes[1].textContent + courseList[i].childNodes[2].textContent;
                        doc.text(textContent, 10, 10+(counter*10));
                        console.log(courseList[i].childNodes[2].textContent);
                        counter ++;
                    }

                }
                // print semester title with a larger font
                else {
                    doc.setFontSize(12);
                    doc.text(node.textContent, 10, 10+(counter*10));
                }
                counter++;
                if (counter > 25){
                  doc.addPage('a4');
                  counter = 0;
                }
          }
        }
      }
      doc.save('FourYearPlan.pdf');
    }

}

export {PDF as default};
