
// Add CSV Headers Here
var targetlist = ["","FORM","PERS","PLAY TYPE"];
var situationlist = ["","DOWN","DIST","FIELD ZONE"];



// ADD USER ID AND REPORT ID HERE
var teamid = "MASTER";

var loadedMappings = {};
var checklst = [];

//
// <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
// <label for="vehicle1"> Penn VS Cornell - <i>3/11/19</i></label><br>
// <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
// <label for="vehicle1"> Penn VS Cornell - <i>3/11/19</i></label><br>
// <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
// <label for="vehicle1"> Penn VS Cornell - <i>3/11/19</i></label><br>

async function downloadMap(key,callback){
  if(key != undefined){
    cognitoUser.getSession(function(err, session) {
      if (err) {	alert(err.message || JSON.stringify(err)); return;}
      // console.log('session validity: ' + session.isValid());

      let team = "team";
      // NOTE: getSession must be called to authenticate user before calling getUserAttributes
      cognitoUser.getUserAttributes(function(err, attributes) {
        if (err) {alert(err);}
        else {
          // console.log(attributes)
          if(JSON.parse(JSON.stringify(attributes[1])).Name === "custom:Team"){
            team = JSON.parse(JSON.stringify(attributes[1])).Value;
          }
          else {
            alert("No team name detected")
          }
          // console.log("======================",team);

          var loginUrl = 'cognito-idp.'+_config.cognito.region+'.amazonaws.com/'+_config.cognito.userPoolId
          AWS.config.region = _config.cognito.region;
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: _config.identity.identityPoolId,
            Logins: {
              [`${loginUrl}`]: session
                .getIdToken()
                .getJwtToken(),
            }
          });
          //TODO error when multiple sign ins and outs (cookie issue?)
          AWS.config.credentials.refresh(error => {
            if (error) {console.error(error);	}
            else {
              // console.log(AWS.config.credentials)
              // console.log(AWS)
              var s3 = new AWS.S3({
                  apiVersion: "2006-03-01",
                  params: { Bucket: "titancommonstorage" }
              });



              //getting objects
              var params = {
              	Bucket: "titancommonstorage",
              	Key: key
              }
              s3.getObject(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {


            		var binArrayToJson = function(binArray) {
            	    var str = "";
            	    for (var i = 0; i < binArray.length; i++) {
            	        str += String.fromCharCode(parseInt(binArray[i]));
            	    }
            	    return str
            	   }
                output = JSON.parse(binArrayToJson(data.Body));
              	loadedMappings[key] = output;
                console.log(loadedMappings);
                callback();
               }

              });

            }
          });
        }
      });
    });
  }
  else{
    callback();
  }
}

function updateColList(callback){
  var newdisplaylst = [];

  for(var i = 0; i < checklst.length;i++){
    if(checklst[i].checked){
      newdisplaylst.push(checklst[i].key);
    }
  }
  var mapToComplete = undefined;
  var maplst = [];
  for(var i = 0; i < newdisplaylst.length;i++){
    if(newdisplaylst[i] in loadedMappings){
      maplst.push(loadedMappings[newdisplaylst[i]])
    }
    else{
      mapToComplete = newdisplaylst[i];
    }
  }

  downloadMap(mapToComplete,()=>{
    var loadedMaps = newdisplaylst.map(key => loadedMappings[key]);
    var validKeysOfMaps = loadedMaps.map(map =>{
      var outlst = [];
      for(var key of Object.keys(map)){
        if(map[key] != 404){
          outlst.push(key)
        }
      }
      return outlst
    });

    if(validKeysOfMaps.length>0){
      var intersection = validKeysOfMaps[0];
      for(var i = 1; i < validKeysOfMaps.length;i++){
        intersection = intersection.filter(value => validKeysOfMaps[i].includes(value))
      }
      console.log("intersection" ,intersection);

      var unionminusintersect = [];
      validKeysOfMaps.forEach(keylst => {
        keylst.forEach(key=>{
          if(!intersection.includes(key) && !unionminusintersect.includes(key)){
            unionminusintersect.push(key);
          }
        });
      });
      console.log("union/intersect",unionminusintersect);
      var selectors = document.getElementsByTagName("select");
      console.log(selectors)
      for( var i = 0; i < selectors.length;i++){
        if(selectors[i].id.includes("target") || selectors[i].id.includes("situation")){
          selectors[i].innerHTML = "";
          node = document.createElement("option");
          node.value = ""
          textnode = document.createTextNode("");
          node.appendChild(textnode);
          selectors[i].appendChild(node);
          //      if(tempid.includes("target")){ //TODO integrate target and situation cases once standard set of collumns has additional parameters to split collumns that should be grouped over
          //active options
          intersection.forEach(key=>{
            node = document.createElement("option");
            node.value = key;
            textnode = document.createTextNode(key);
            node.style.fontWeight = "bold";
            node.appendChild(textnode);
            selectors[i].appendChild(node);
          });

          //inactive options
          unionminusintersect.forEach((key,j)=>{
            node = document.createElement("option");
            node.value = key
            node.disabled = true;
            node.style.backgroundColor = "lightgray";
            // if(j == 0){
              // node.style.border = "solid";
              // console.log(node.style.borderTop)
            // }
            textnode = document.createTextNode(key);
            node.appendChild(textnode);
            selectors[i].appendChild(node);
          });


      }

    }
    callback()
    }
    else{
      console.log("NO FILES SELECTED");
      var selectors = document.getElementsByTagName("select");
      for( var i = 0; i < selectors.length;i++){
        selectors[i].innerHTML = "";
      }
      //callback()
    }
  });
}

cognitoUser.getSession(function(err, session) {
  if (err) {	alert(err.message || JSON.stringify(err)); return;}
  // console.log('session validity: ' + session.isValid());

  let team = "team";
  // NOTE: getSession must be called to authenticate user before calling getUserAttributes
  cognitoUser.getUserAttributes(function(err, attributes) {
    if (err) {alert(err);}
    else {
      // console.log(attributes)
      if(JSON.parse(JSON.stringify(attributes[1])).Name === "custom:Team"){
        team = JSON.parse(JSON.stringify(attributes[1])).Value;
      }
      else {
        alert("No team name detected")
      }
      // console.log("======================",team);

      var loginUrl = 'cognito-idp.'+_config.cognito.region+'.amazonaws.com/'+_config.cognito.userPoolId
      AWS.config.region = _config.cognito.region;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: _config.identity.identityPoolId,
        Logins: {
          [`${loginUrl}`]: session
            .getIdToken()
            .getJwtToken(),
        }
      });
      //TODO error when multiple sign ins and outs (cookie issue?)
      AWS.config.credentials.refresh(error => {
        if (error) {console.error(error);	}
        else {
          // console.log(AWS.config.credentials)
          // console.log(AWS)
          var s3 = new AWS.S3({
              apiVersion: "2006-03-01",
              params: { Bucket: "titancommonstorage" }
          });
          //
          // var filename = encodeURIComponent(file.name);
          var directory = ""+ encodeURIComponent(team)+"/datasets/";
          // s3.getCommonPrefixes(function(err,data){
          //   if(err)console.log(err)
          //   else console.log(data)
          // })

          var params ={
            // Delimiter: "/",
            Prefix:directory
          }
          // s3.listBucket(params,function(err,data){
          //     if(err)console.log(err)
          //     else console.log(data)
          // })

          s3.listObjectsV2(params, function(err, data) {
            if (err) console.log(err,err.stack);
            else {
              console.log(data.Contents);
              var currDirectory = data.Contents;
              var tokenlst = [];
              var keylst = [];
              for(var i = 0; i < currDirectory.length;i++){
                // console.log(currDirectory[i].Key)
                var tokens = currDirectory[i].Key.split("/")
                // console.log(tokens);
                if(tokens.length > 2 && tokens[0] === team && tokens [1] === "datasets"){
                  if(!tokenlst.includes(tokens[2])){
                    keylst.push(currDirectory[i].Key.substring(0,currDirectory[i].Key.lastIndexOf("."))+".json");
                    tokenlst.push(tokens[2]);
                  }
                }
                // if(currDirectory[i].Key === directory+filename){
                //   alert("please change file already exists in our system, please change filename");
                //   return;
                // }
              }
              console.log(tokenlst);
              console.log(keylst);
              var container = document.getElementById("FILEDISPLAY");
              for(var tokendex = 0; tokendex < tokenlst.length; tokendex++){
                var inp = container.appendChild(document.createElement('input'));
                inp.type = "checkbox";
                inp.id = "filelst"+tokendex;
                inp.key = keylst[tokendex];
                inp.addEventListener('change',()=>{
                  updateColList(()=>{

                  })},false);
                checklst.push(inp);
                var lbl = container.appendChild(document.createElement("label"))
                lbl.innerHTML = "&nbsp;&nbsp;"+tokenlst[tokendex];
                container.appendChild(document.createElement("br"))
              }
              //
              var reportid = getUrlParam("reportid","empty");
              if(reportid != "empty"){
                //awsrequest({},reportid,2)
                var key = team+"/reports/"+reportid+"/report_"+team+"_"+reportid+".json"
                getObjAndRun("titancommonstorage",key,(configjson)=>{

                  //setscorecardrequests start ============================================================================


                    //var configfilename = "configs/report_"+teamid+"_"+getUrlParam("reportid","empty")+".json";
                    //const configfile = await d3.json(configfilename);

                    const configfile = configjson;
                    document.getElementById("reportitle").value = configfile["metadata"]["reportid"]

                    var tempscorecardrequest;
                    var selectors;var node;var textnode;var inputs;

                    multiplyNode(document.getElementById("test1"),Object.keys(configfile).length-1,true);

                    console.log(configfile)

                    var dataholder = document.getElementById("FILEDISPLAY");
                    var selections = dataholder.getElementsByTagName("input");
                    var files = document.getElementById("FILEDISPLAY").getElementsByTagName("label");



                    var tempdir;
                    var dirlist = [];

                    for (var k = 0; k < selections.length; k++) {

                      for (var j = 0; j < configfile["metadata"].files.length; j++) {
                        if(String(configfile["metadata"].files[j]).includes(files[k].innerHTML.replace('&nbsp;&nbsp;',''))){

                          selections[k].checked = true;
                        }
                      }

                    }
                    updateColList(()=>{
                      for (var i in configfile) {
                          if(i != "metadata"){
                            tempscorecardrequest = document.getElementById("test"+(Number(i)+1));
                            selectors = tempscorecardrequest.getElementsByTagName("select");
                            inputs = tempscorecardrequest.getElementsByTagName("input");

                            for (var k = 0; k < configfile[i]["Targetcolumns"].length; k++) {
                              node = document.createElement("option");
                              node.selected = "selected";
                              node.value = configfile[i]["Targetcolumns"][k];
                              textnode = document.createTextNode(configfile[i]["Targetcolumns"][k]);
                              node.appendChild(textnode);
                              selectors[k].prepend(node);
                            }
                            for (var k = 0; k < configfile[i]["Situationcols"].length; k++) {
                              node = document.createElement("option");
                              node.selected = "selected"
                              node.value = configfile[i]["Situationcols"][k];
                              textnode = document.createTextNode(configfile[i]["Situationcols"][k]);
                              node.appendChild(textnode);
                              selectors[k+3].prepend(node);
                            }

                            for (var k = 0; k < configfile[i]["Charts"].length; k++) {
                              if(configfile[i]["Charts"][k] == "Bar Chart"){inputs[(k*2)+1].checked = true;}
                              if(configfile[i]["Charts"][k] == "Pie Chart"){inputs[(k*2)+2].checked = true;}
                            }
                            for (var k = 0; k < configfile[i]["Sankey"].length; k++) {
                              if(configfile[i]["Sankey"][k] == "Yes"){inputs[(k+7)].checked = true;}
                              if(configfile[i]["Sankey"][k] == "No"){inputs[(k+7)].checked = false;}
                            }
                          }
                      }
                    })



                  //SET SCREQ END =============================================================================



                });
              }







              // var params = {
              // 	Bucket: "cornellheavies",
              // 	Key: directory+photoKey,
              // 	Body: file
              // }
              //
              // s3.putObject(params, function(err, data) {
              // 	if (err) {
              // 		console.log(err);
              // 	} else {
              // 		console.log('Success');
              // 	}
              // });

            }

          });

          // var params = {
          //  Bucket: "cornellheaviesV2"
          // };
          // s3.createBucket(params, function(err, data) {
          // 	if (err) console.log(err, err.stack); // an error occurred
          // 	else     console.log(data);           // successful response
          // });
          // console.log(s3.listBuckets());





          // var upload = new AWS.S3.ManagedUpload({
          // 	 params : {
          // 		Bucket: "cornellheavies",
          // 		Key: photoKey,
          // 		Body: file,
          // 		ACL: "public-read"
          // 	}
          // });








          //getting objects
          // var params = {
          // 	Bucket: "cornellheavies",
          // 	Key: photoKey
          // }
          // var fileobj = s3.getObject(params, function(err, data) {
          //   if (err) console.log(err, err.stack); // an error occurred
          //   else {
          // 	 	console.log(data);           // successful response
          //
          // 		var binArrayToJson = function(binArray) {
          // 	    var str = "";
          // 	    for (var i = 0; i < binArray.length; i++) {
          // 	        str += String.fromCharCode(parseInt(binArray[i]));
          // 	    }
          // 	    return str
          // 	}
          // 	console.log(binArrayToJson(data.Body));
          //  }
          //
          // });




        }
      });
    }
  });
});






// function addselectoptions(){
//
//   var selectors = document.getElementsByTagName("select");
//   var node;var textnode;var tempid;
//
//   for (var i = 0; i < selectors.length; i++) {
//      tempid = selectors[i].id;
//      if(tempid.includes("target")){
//        for (var k = 0; k < targetlist.length; k++) {
//          node = document.createElement("option");
//          node.value = targetlist[k]
//          textnode = document.createTextNode(targetlist[k]);
//          node.appendChild(textnode);
//          selectors[i].appendChild(node);
//        }
//      }
//      if(tempid.includes("situation")){
//        for (var k = 0; k < situationlist.length; k++) {
//          node = document.createElement("option");
//          node.value = situationlist[k]
//          textnode = document.createTextNode(situationlist[k]);
//          node.appendChild(textnode);
//          selectors[i].appendChild(node);
//        }
//      }
//   }
// }





function returnreportid(){
    var reportid = getUrlParam("reportid","empty");
    if(reportid != "empty"){
      return reportid
    }
    else {
      var tempid = document.getElementById("reportitle")

      return tempid.value
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


  target1.innerHTML = mappings["target0"].concat(" Chart Selection");
  target2.innerHTML = mappings["target1"].concat(" Chart Selection");
  target3.innerHTML = mappings["target2"].concat(" Chart Selection");
  target4.innerHTML = mappings["target0"]+" to "+mappings["target1"]+" Chart";
  target5.innerHTML = mappings["target1"]+" to "+mappings["target2"]+" Chart";


}


function moveToBrowseReport(){

    var finalmapping = {};
    var requestcard = document.getElementsByClassName("reportrequest");
    for (var i = 0; i < requestcard.length; i++) {
      finalmapping[i] = grabscrequestsingle(requestcard[i].id);
    }

    var dataholder = document.getElementById("FILEDISPLAY");
    var selections = dataholder.getElementsByTagName("input");
    var files = dataholder.getElementsByTagName("label");

    var tempdir;
    var dirlist = [];

    for (var i = 0; i < selections.length; i++) {
      if(selections[i].checked == true){
        tempdir = files[i].innerHTML.replace('&nbsp;&nbsp;','') + "/" + files[i].innerHTML.replace('&nbsp;&nbsp;','') + ".csv";
        dirlist.push(tempdir);
      }
    }

    // TEAM IS HARD CODED HERE AND OFFDEF
    var offdef = document.getElementById("offdef");
    var scoutteam = document.getElementById("teamselect").value;
    console.log(scoutteam)
    var offdefres;
    if(offdef.checked){
      offdefres = "def"
    }
    else{
      offdefres = "off"
    }


    var reportid = returnreportid()

    finalmapping["metadata"] = {"files":dirlist,
                                "bucket":"titancommonstorage",
                                "target_team":scoutteam,
                                "offdef":offdefres,
                                "reportid":reportid};


    console.log(JSON.stringify(finalmapping))



    //PUT CODE HERE TO PASS REQUEST JSON
    //awsrequest(finalmapping,reportid,1);
    authAndRun((team)=>{
      finalmapping.metadata.team = team;
      var blob = new Blob([JSON.stringify(finalmapping)],{type:"text/json;charset=utf-8"});
      var filebody = new File([blob],`report_${team}_${reportid}.json`)
      var key = team+"/reports/"+reportid+"/report_"+team+"_"+reportid+".json";
      putObjAndRun("titancommonstorage",key,filebody,(data)=>{
        window.location.replace("reportbrowse.html?reportid="+returnreportid());
      });
    });




    //awsrequest(finalmapping,reportid,3);



}

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
          if(inputs[i+1+i].checked == true){mapping["Charts"][i] = "Bar Chart"}
          if(inputs[i+2+i].checked == true){mapping["Charts"][i] = "Pie Chart"}
        }
      }
      if(i >= 3){
        if(values[i].value != ""){
          mapping["Situationcols"].push(values[i].value)
        }
      }
    }


    // if(inputs[1].checked == true){mapping["Charts"][0] = "Bar Chart"}
    // if(inputs[2].checked == true){mapping["Charts"][0] = "Pie Chart"}
    // if(inputs[3].checked == true){mapping["Charts"][1] = "Bar Chart"}
    // if(inputs[4].checked == true){mapping["Charts"][1] = "Pie Chart"}
    // if(inputs[5].checked == true){mapping["Charts"][2] = "Bar Chart"}
    // if(inputs[6].checked == true){mapping["Charts"][2] = "Pie Chart"}

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
