
// Add CSV Headers Here
var targetlist = ["","FORM","PERS","PLAY TYPE"];
var situationlist = ["","DOWN","DIST","FIELD ZONE"];



// ADD USER ID AND REPORT ID HERE
var teamid = "MASTER";

checkifnewreport()

function addselectoptions(){

  var selectors = document.getElementsByTagName("select");
  var node;var textnode;var tempid;

  for (var i = 0; i < selectors.length; i++) {
     tempid = selectors[i].id;
     if(tempid.includes("target")){
       for (var k = 0; k < targetlist.length; k++) {
         node = document.createElement("option");
         node.value = targetlist[k]
         textnode = document.createTextNode(targetlist[k]);
         node.appendChild(textnode);
         selectors[i].appendChild(node);
       }
     }
     if(tempid.includes("situation")){
       for (var k = 0; k < situationlist.length; k++) {
         node = document.createElement("option");
         node.value = situationlist[k]
         textnode = document.createTextNode(situationlist[k]);
         node.appendChild(textnode);
         selectors[i].appendChild(node);
       }
     }
  }


}



function checkifnewreport(){
  var reportid = getUrlParam("reportid","empty");
  if(reportid != "empty"){
    console.log(reportid)
    setscorecardrequests(reportid);
  }
  else {
    addselectoptions()
  }



}

async function setscorecardrequests(reportid) {

    var configfilename = "configs/report_"+teamid+"_"+getUrlParam("reportid","empty")+".json";
    const configfile = await d3.json(configfilename);

    for (var i = 0; i < configfile.length; i++) {
      for (var k = 0; k < array.length; k++) {




        array[k]
      }


      console.log(configfile[i])
    }





}



var counter = 2;

function multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        copy.id = "test".concat(counter)
        for (var i = 0; i < copy.getElementsByTagName("input").length; i++) {

          if(copy.getElementsByTagName("input")[i].type == "radio"){
            copy.getElementsByTagName("input")[i].name = "barpie"+weirdidmapper(i)+copy.id
          }

        }

        counter = counter + 1
        node.parentNode.insertBefore(copy, node);
    }
}

function weirdidmapper(num){
  var mapper = {1:1,2:1,3:2,4:2,5:3,6:3}
  return mapper[num]
}

function remove(el) {
  var reportrequestscounts = document.getElementsByClassName("reportrequest");
  if(el.id != "test1"){
    var element = el;
    element.remove();
  }
}


function opensetting(target) {
  var holder = target.parentElement
  mappings = grabscrequestsingle(target.parentElement.id);
  var requestcard = document.getElementById(target.parentElement.id);
  var headers = holder.getElementsByTagName("h5");

  var target1 = headers[0];
  var target2 = headers[1];
  var target3 = headers[2];

  var target4 = headers[4];
  var target5 = headers[5];

  for (var i = 0; i < mappings.Targetcolumns.length; i++) {

  }

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
  console.log(finalmapping)

  //PUT CODE HERE TO PASS REQUEST JSON



  return finalmapping;}

function grabscrequestsingle(id){
    var target = document.getElementById(id);
    var values = target.getElementsByClassName('reportcustominput');
    var inputs = target.getElementsByTagName("input");

    var mapping = {"Targetcolumns":[],"Situationcols":[],"Charts":[],"Sankey":[]};
    for (var i = 0; i < values.length; i++) {
      if(i < 3){
        mapping["target"+i] = values[i].value;
        if(values[i].value != ""){
          mapping["Targetcolumns"].push(values[i].value)
          mapping["Charts"].push("Bar Chart")
        }
      }
      if(i >= 3){
        if(values[i].value != ""){
          mapping["Situationcols"].push(values[i].value)
        }
      }
    }


    if(inputs[1].checked == true){mapping["Charts"][0] = "Bar Chart"}
    if(inputs[2].checked == true){mapping["Charts"][0] = "Pie Chart"}
    if(inputs[3].checked == true){mapping["Charts"][1] = "Bar Chart"}
    if(inputs[4].checked == true){mapping["Charts"][1] = "Pie Chart"}
    if(inputs[5].checked == true){mapping["Charts"][2] = "Bar Chart"}
    if(inputs[6].checked == true){mapping["Charts"][2] = "Pie Chart"}
    if(mapping["Targetcolumns"].length > 1){
      if(inputs[7].checked == true){mapping["Sankey"].push("Yes")}
      else{mapping["Sankey"].push("No")}
    }
    else {mapping["Sankey"].push("No")}
    if(mapping["Targetcolumns"].length > 2){
      if(inputs[8].checked == true){mapping["Sankey"].push("Yes")}
      else{mapping["Sankey"].push("No")}
    }
    else {mapping["Sankey"].push("No")}

    return mapping;
}
