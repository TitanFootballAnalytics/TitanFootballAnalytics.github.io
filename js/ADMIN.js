


function submitPowerBIReport() {

  var nameofreport = document.getElementById("titleofreport").value;
  var linkofreport = document.getElementById("linktoreport").value;
  var teamaccount = document.getElementById("teamaccount").value;

  var contentjson = {"title":nameofreport,"link":linkofreport}
  var blob = new Blob([JSON.stringify(contentjson)],{type:"text/json;charset=utf-8"});


  var filepath = teamaccount+"/customreports/"+nameofreport+".json";
  var filebody = new File([blob],nameofreport+".json")

  putObjAndRun("titancommonstorage",filepath,filebody,(data)=>{
    console.log(data)
    console.log("put this object")
    console.log(contentjson)
    console.log("here ==> "+filepath)
  });






  //putObjAndRun(bucket,key,filebody,callback)
}


function updateSelectorWithList(teamlst,id){
  var teamselect = document.getElementById(id);
  teamselect.innerHTML = "";
  for (var i = 0; i < teamlst.length; i++) {

    tempnode = document.createElement("option");
    tempnode.value = teamlst[i];                    //*******************
    textnode = document.createTextNode(teamlst[i]); //********************
    tempnode.appendChild(textnode);
    teamselect.appendChild(tempnode);
  }

}


function previewLink() {

  var link = document.getElementById("linktoreport");
  var reportlink = link.value;
  var iframe = document.getElementById('preview');
  iframe.src = reportlink;
  console.log("Updated")
}




authAndRun((team)=>{
  listObjsAndRun(``,"titancommonstorage",(data)=>{
    console.log(data);
    var teamlst = [];
    for (var i = 0; i <  data.Contents.length; i++) {
      var tokenarr = data.Contents[i].Key.split("/");
      if(!(teamlst.includes(tokenarr[0]))){
        teamlst.push(tokenarr[0])
      }

    }
    updateSelectorWithList(teamlst,"teamaccount")

  });
});
