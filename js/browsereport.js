


var userid = getUrlParam("userid","empty")


var reportslist = [
    {"reportid":"0001",
     "targetteam" : "Penn",
     "games" : ["Penn vs Harvard","Penn vs Cornell","Penn vs Princeton","Penn vs Yale"]},
    {"reportid":"0002",
    "targetteam" : "FSU",
    "games" : ["FSU vs UM","FSU vs UF","FSU vs UCF"]},
    {"reportid":"0003",
    "targetteam" : "Alabama",
    "games" : ["Alabama vs Texas"]}];

var fakeapi = {"1111":"MASTER","MASTER":reportslist};

var mainholder = document.getElementById("holder");


function setupcard(node,metadata) {

    node.id = metadata["reportid"];
    var teamname = node.getElementsByTagName("h5")[0];
    let boldtext = document.createElement('b');
    let othertext = document.createElement('o');
    boldtext.innerHTML = metadata["targetteam"];
    teamname.appendChild(boldtext);
    othertext.textContent  = " Scouting Report";
    teamname.appendChild(othertext);

    var listofgames = node.getElementsByTagName("ul")[0];
    var templi;
    for (var i = 0; i < metadata["games"].length; i++) {
       templi = document.createElement('li');
       templi.innerHTML = metadata["games"][i];
       listofgames.appendChild(templi)
    }
    return node
}

function openreport(reportid) {
  window.open("scorecards.html?reportid="+reportid)
}

function editreport(reportid) {
  window.open("customization.html?reportid="+reportid)
}


function populatepage(tempuserid) {

    // Using USERID call teamid
    var teamid = fakeapi[tempuserid];

    // Using teamid call reports list
    var reports = fakeapi[teamid];

    var firstblankone = document.getElementById("blank");
    var tempcopy;


    for (var i = 0; i < reports.length; i++) {
      tempcopy = firstblankone.cloneNode(true);
      tempcopy = setupcard(tempcopy,reports[i]);
      mainholder.appendChild(tempcopy);
    }
    firstblankone.remove();
}


populatepage("1111")
