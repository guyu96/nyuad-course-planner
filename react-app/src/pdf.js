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

                if (node.childNodes.length > 1) {
                    doc.setFontSize(10);
                    let courseList = node.childNodes;

                    courseList.forEach(function(li) {
                        let textContent = li.childNodes[0].textContent + li.childNodes[1].textContent;
                        doc.text(textContent, 10, 10+(counter*10));
                        console.log(textContent);
                        counter ++;
                    })

                }
                else {
                    doc.setFontSize(12);
                    doc.text(node.textContent, 10, 10+(counter*10));
                }
                counter++;
                if (counter > 36){
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
