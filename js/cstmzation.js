
var counter = 1

function multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        copy.id = "test".concat(counter)
        counter = counter + 1
        node.parentNode.insertBefore(copy, node);
    }
}

function remove(el) {
  var element = el;
  element.remove();}


function opensetting(target) {
  var holder = target.parentElement
  mappings = grabscrequestsingle(target.parentElement.id);
  var requestcard = document.getElementById(target.parentElement.id);
  var headers = holder.getElementsByTagName("h5")


  var target1 = headers[0];
  var target2 = headers[1];
  var target3 = headers[2];

  var target4 = headers[4];
  var target5 = headers[5];

  target1.innerHTML = mappings["target0"].concat(" Chart Selection");
  target2.innerHTML = mappings["target1"].concat(" Chart Selection");
  target3.innerHTML = mappings["target2"].concat(" Chart Selection");
  target4.innerHTML = mappings["target0"]+" to "+mappings["target1"]+" Chart";
  target5.innerHTML = mappings["target1"]+" to "+mappings["target2"]+" Chart";


}


function submitscrequests() {
  var finalmapping = {};
  var requestcard = document.getElementsByClassName("reportrequest");
  for (var i = 0; i < requestcard.length; i++) {
    finalmapping[i] = grabscrequestsingle(requestcard[i].id);
  }

  return finalmapping;}

function grabscrequestsingle(id){
    var target = document.getElementById(id);
    var values = target.getElementsByClassName('reportcustominput');
    var inputs = target.getElementsByTagName("input");
    console.log(inputs)

    var mapping = {};
    for (var i = 0; i < values.length; i++) {
      if(i < 3){
        mapping["target".concat(i)] = values[i].value;
      }
      if(i >= 3){
        mapping["situation".concat(i-3)] = values[i].value;
      }
    }
    if(inputs[7].checked = true){mapping["chart1"] = "Bar Chart"}
    if(inputs[8].checked = true){mapping["chart1"] = "Pie Chart"}
    if(inputs[9].checked = true){mapping["chart2"] = "Bar Chart"}
    if(inputs[10].checked = true){mapping["chart2"] = "Pie Chart"}
    if(inputs[11].checked = true){mapping["chart3"] = "Bar Chart"}
    if(inputs[12].checked = true){mapping["chart3"] = "Pie Chart"}


console.log(mapping)


    return mapping;
}
