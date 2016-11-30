function getChildrenIDs (node, list) {
  node.childNodes.forEach(function(childNode) {
    if (childNode.id !== undefined) {
      list.push(childNode.id);
    }
    getChildrenIDs(childNode, list);
  });
}

var xhr = new XMLHttpRequest();

xhr.onload = function () {
  var result = {};
  var xml = xhr.responseXML.documentElement;
  xml.childNodes.forEach(function(node) {
    if (node.nodeName === "category" && node.id !== "2") {
      if (node.id !== "54") {
        // deal with non-majors
        var title = node.getAttribute("title");
        result[title] = [node.id];
        getChildrenIDs(node, result[title]);
      } else {
        node.childNodes.forEach(function(childNode) {
          // console.log(childNode);
          if (childNode.nodeName === "category") {
            var title = childNode.getAttribute("title");
            result[title] = [childNode.id];
            getChildrenIDs(childNode, result[title]);
          }
        });
      }
    }
  });
  console.log(JSON.stringify(result));
}

xhr.onerror = function() {
  console.error("Error while getting XML.");
}
xhr.open("GET", "http://services.nyuad.nyu.edu/academics/categories");
xhr.responseType = "document";
xhr.send();
