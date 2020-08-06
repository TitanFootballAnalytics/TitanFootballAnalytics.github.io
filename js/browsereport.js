

function openreport(reportid) {
  window.open("scorecards.html?reportid="+reportid)
}

function editreport(reportid) {
  window.open("customization.html?reportid="+reportid)
}


// function populatepage(tempuserid) {
//
//     // Using USERID call teamid
//     var teamid = fakeapi[tempuserid];
//
//     // Using teamid call reports list
//     var reports = fakeapi[teamid];
//
//     var firstblankone = document.getElementById("blank");
//     var tempcopy;
//
//
//     for (var i = 0; i < reports.length; i++) {
//       tempcopy = firstblankone.cloneNode(true);
//       tempcopy = setupcard(tempcopy,reports[i]);
//       mainholder.appendChild(tempcopy);
//     }
//     firstblankone.remove();
// }




// var userid = getUrlParam("userid","empty")


// var reportslist = [
//     {"reportid":"0001",
//      "targetteam" : "Penn",
//      "games" : ["Penn vs Harvard","Penn vs Cornell","Penn vs Princeton","Penn vs Yale"]},
//     {"reportid":"0002",
//     "targetteam" : "FSU",
//     "games" : ["FSU vs UM","FSU vs UF","FSU vs UCF"]},
//     {"reportid":"0003",
//     "targetteam" : "Alabama",
//     "games" : ["Alabama vs Texas"]}];

// var fakeapi = {"1111":"MASTER","MASTER":reportslist};



authAndRun((team)=>{
  listObjsAndRun(`${team}/reports`,"titancommonstorage",(data)=>{
    console.log(data);
    var keylst = [];
    for(var i = 0; i < data.Contents.length;i++){
       var tokenarr = data.Contents[i].Key.split("/");
       if(tokenarr[tokenarr.length-1] != "" &&
         tokenarr[3].split("_")[0] == "report")
        keylst.push(data.Contents[i].Key);
    }
    var mainholder = document.getElementById("holder");
    iteratedObjGet("titancommonstorage",keylst,[],(data)=>{
      data.forEach((d,i)=>{
        if(d.metadata){
          console.log(d.metadata)
          var card = mainholder.appendChild(document.createElement('div'));
          card.className = "report-card-holder col-md-2";
          var reportlst = card.appendChild(document.createElement('div'));
          reportlst.className = "report-card"
          var h5 = reportlst.appendChild(document.createElement('h5'));
          h5.style.margin = "0px";
          var h6 = reportlst.appendChild(document.createElement('h6'));
          h6.style.marginTop = "0px";
          var icon = h6.appendChild(document.createElement('i'));
          icon.innerHTML = "Games Included";
          var gamelst = reportlst.appendChild(document.createElement('ul'));
          gamelst.className = "gameslist";
          let boldtext = document.createElement('b');
          let othertext = document.createElement('o');
          boldtext.innerHTML = d.metadata["target_team"];
          h5.appendChild(boldtext);
          othertext.textContent  = " Scouting Report -"+d.metadata.reportid;
          h5.appendChild(othertext);

          for(var j = 0; j < d.metadata.files.length; j++){
            var listitem = document.createElement("li");
            listitem.innerHTML = d.metadata.files[j].split("/")[1];
            gamelst.appendChild(listitem);
          }

          var buttonDiv = document.createElement("div");
          buttonDiv.id = "buttons";
          buttonDiv.className = "buttonholder";
          buttonDiv.align = "right";
          reportlst.appendChild(buttonDiv);
          var openButton = document.createElement("button");
          openButton.innerHTML = "Open"
          openButton.style.marginBottom = "5px";
          openButton.type = "button";
          openButton.className = "btn btn-primary";
          openButton.addEventListener('click',(event)=>{openreport(d.metadata.reportid)},false);
          buttonDiv.appendChild(openButton);

          buttonDiv.appendChild(document.createElement("br"))

          var editButton = document.createElement("button");
          editButton.innerHTML = "Edit"
          editButton.type = "button";
          editButton.className = "btn btn-warning";
          editButton.addEventListener('click',(event)=>{editreport(d.metadata.reportid)},false);
          buttonDiv.appendChild(editButton);



          // <div class = "report-card-holder col-md-2" id="blank">
          //     <div class="report-card" >
          //       <h5 style="margin: 0px;"></h5>
          //       <h6 style="margin-top: 0px;"><i>Games Included</i></h6>
          //       <ul id="gameslist">
          //       </ul>
          //
          //       <div id="buttons" class="buttonholder" align="right">
                  // <button onclick="openreport(this.parentElement.parentElement.parentElement.id)"
                  //         style="margin-bottom: 5px;"
                  //         type="button"
                  //         class="btn btn-primary">
                  //         Open</button>
                  // <br>
                  // <button onclick="editreport(this.parentElement.parentElement.parentElement.id)"
                  //         type="button"
                  //         class="btn btn-warning">
                  //         Edit</button>
          //       </div>
          //     </div>
        }
      });
    });
  });
});



// populatepage("1111")
