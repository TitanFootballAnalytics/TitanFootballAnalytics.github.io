

// const standardset = ["Down","Distance","FieldZone","Personnel","Formation","PlayType","FormationFam","Cover","CoverFam"];
//["GameID",	"PosTeam",	"DefTeam",	"HomeTeam",	"AwayTeam",	"Down",	"Dist",	"DistStr",	"Qtr",	"Fieldpos100",	"YdsGained",	"Turnover", "Rush", "Pass", "SpecialTeams", "Interception", "Fumble", "Sack", "Touchdown", "Safety", "DriveNum", "PlayType", "ScoreDiff", "Completion", "TimeUnder", "DDstr", "Hash", "OffPers", "Motion", "Back", "Form"]
const standardset = ["offense","defense","pass","run","gain","td","gameid", "pos_team", "def_team", "home_team", "away_team", "down", "dist", "dist_str", "qtr", "fpos100", "gain", "turnover", "runpass", "specialteams", "int", "fum", "sack", "td", "safety", "drive_num", "playtype", "def_score", "off_score", "score_diff", "completion", "time_under", "dd_str", "hash", "off_pers", "motion", "back", "form"]
const hudlset = ["playnumber", "odk", "down", "distance", "hash", "yardline", "playtype", "result",
								"gain", "off_formation", "off_play", "off_strength", "backfield", "play_direction", "run_gap",
								"def_front", "coverage", "blitz", "quarter", "drive_num"];
const requiredSet = ["offense","defense"];
const requiredHudlSet = ["odk","down"];


var ourData;
var hudl = document.getElementById("hudldata");
var cstm = document.getElementById("cstmdata");

hudl.oninput = function() {
	if(hudl.checked == true){
		currentMapping = {};
		for(var i = 0; i< hudlset.length;i++){
			currentMapping[hudlset[i]] = NO_MAPPING;
		}
		// createRecepticle(hudlset);
		generateHoldingCell(hudlset);
		if(ourData){
			createRecepticle(ourData[0]);
		}
	}
}

cstm.oninput = function() {
	if(cstm.checked == true){
		currentMapping = {};
		for(var i = 0; i< standardset.length;i++){
			currentMapping[standardset[i]] = NO_MAPPING;
		}
		// createRecepticle(standardset);
		generateHoldingCell(standardset);
		if(ourData){
			createRecepticle(ourData[0]);
		}
	}
}





var uploadedfile;
var currentMapping = {};
const NO_MAPPING = 404;

if(cstm.checked == true) {
	currentMapping = {};
	for(var i = 0; i< standardset.length;i++){
		currentMapping[standardset[i]] = NO_MAPPING;
	}
	// createRecepticle(standardset);
	generateHoldingCell(standardset);
}

if(hudl.checked == true) {
	currentMapping = {};
	for(var i = 0; i< hudlset.length;i++){
		currentMapping[hudlset[i]] = NO_MAPPING;
	}
	// createRecepticle(hudlset);
	generateHoldingCell(hudlset);
}

function removeChildren(parent){
	while(parent.firstChild){
		parent.removeChild(parent.firstChild);
	}
}

document.getElementById("submitButton").addEventListener("click",submitHandler,false);

// d3.select("#mainDiv").append("svg")
// .attr("width", 2000)
// .attr("height", 2000)
// .attr("id", "graph")
// svg = d3.select("#graph");
function fitText(lBox,sourceText){
	var fSize = 32;
	removeChildren(lBox);
	var text = d3.select(lBox).append("svg")
								 .attr("width",150)
								 .attr("height",40)
								 .append("text")
								 .style("alignment-baseline","middle")
								 .style("z-index",4)
								 .style("text-anchor","middle")
								 .attr("x",69)
								 .attr("y",20)
								 .text(sourceText)
								 .style("font-size",""+fSize+"px");
	var bBox = text.node().getBBox();
	var currWidth = bBox.width;
	var currHeight = bBox.height;
	while(fSize > 1 && (currWidth > 130 || currHeight > 34)){
		fSize--;
		text.style("font-size",""+fSize+"px");
		bBox = text.node().getBBox();
		currWidth = bBox.width;
		currHeight = bBox.height;
	}
}

function createRecepticle(set){
		var parent = document.getElementById("lefthalf");
		removeChildren(parent);
		var unit;
		var lBox;
		var rBox;
		var svg;
		var text;
		for(var i = 0; i < set.length;i++){
			unit = parent.appendChild(document.createElement('div'));
			unit.id = "unit"+i;
			unit.className = "unit";
			lBox = unit.appendChild(document.createElement('div'));
			lBox.className = "lBox";
			fitText(lBox,set[i])
			svg = d3.select("#unit"+i).append("svg")
												 .attr("width",100)
												 .attr("height",80)
												 .style("background","rgba(0,0,0,0)")
												 .attr("id","arrow"+i)
												 .attr("class","arrow");
			svg.append("path")
				 .attr("d","M 13 20 "+
			             "H 50 " +
								   "V 10 " +
								   "L 90 40 " +
								   "L 50 70 " +
								   "V 60 " +
								   "H 13 ")
				 .attr("stroke","Black")
				 .attr("stroke-width",2)
				 .attr("fill","white");
			 svg.append("path")
				 .attr("d","M 5 20 H 14")
				 .attr("stroke","Black")
				 .attr("stroke-width",2)
				 .attr("fill","white");
		  svg.append("path")
				 .attr("d","M 5 60 H 14")
				 .attr("stroke","Black")
				 .attr("stroke-width",2)
				 .attr("fill","white");
			rBox = unit.appendChild(document.createElement('div'));
			rBox.className = "rBox";
			// rBox.addEventListener('dragover', allowDrop, false);
			// rBox.addEventListener('drop', drop, false);
			// rBox.addEventListener('dragleave',dragLeave,false);
			// <label class="switch">
			// 	<input id="offdef" type="checkbox">
			// 	<span class="slider"></span>
			// </label>
			var switchElem = unit.appendChild(document.createElement("label"));
			switchElem.className = "switch";
			var inp = switchElem.appendChild(document.createElement("input"));
			inp.type = "checkbox";
			inp.className = "checkInp";
			inp.checked = true;
			inp.id = "switch"+i
			var slider = switchElem.appendChild(document.createElement("span"));
			slider.className = "slider";
			inp.addEventListener("change",disableRelationship,true);


			var hitbox = rBox.appendChild(document.createElement('div'));
			hitbox.addEventListener('dragover', allowDrop, false);
			hitbox.addEventListener('drop', drop, false);
			hitbox.addEventListener('dragleave',dragLeave,false);
			hitbox.style.height = "105px";
			hitbox.style.minWidth = "200px";
			// hitbox.style.backgroundColor = "rgba(100,0,0,.5)"
			hitbox.style.zIndex = "4";

			// svg = d3.select("#arrow")
			// console.log(svg)

		}
		var clearButt = d3.select("#clearAll");
		clearButt._groups[0][0].style.visibility = "visible";
		clearButt._groups[0][0].addEventListener("click",(event)=>{
		  var switchSelect =	d3.selectAll(".checkInp");
			var switchArr =  switchSelect._groups[0];
			for(var j = 0; j < switchArr.length; j++){
				if(switchArr[j].checked == true && switchArr[j].parentNode.getElementsByClassName("cover").length == 0){
					switchArr[j].checked = false;
					// console.log(d3.select(switchArr[j]));
					//====================================
					var unit = switchArr[j].parentNode.parentNode;
					// console.log(unit)
					// console.log(unit)
					// unit.style.border = "thick dashed grey";
					unit.children[0].style.borderLeft = "solid green 7px";
					unit.children[0].style.backgroundColor = "grey";
					unit.children[1].children[0].style.fill = "grey";
					unit.children[2].style.backgroundColor = "grey";
					removeChildren(unit.children[2]);
					// unit.children[2].removeEventListener('dragover', allowDrop);
					// unit.children[2].removeEventListener('dragleave',dragLeave);
					// unit.children[2].removeEventListener('drop', drop);tionship,true);
					switchArr[j].addEventListener("change",enableRelationship,true);
					//++++++++++++++++++++++++++++++++++++++
			  }
			}
		},false);

}



function allowDrop(ev) {
  ev.preventDefault();
	ev.target.parentElement.style.backgroundColor = "green"//parentElement.style.backgroundColor = "green";
}

function dragLeave(ev){
	ev.target.parentElement.style.backgroundColor = "white"//parentElement.style.backgroundColor = "white";
}

function drag(ev) {
	// ev.target.children[0].style.visibility = "hidden"
  ev.dataTransfer.setData("text", ev.target.id);
	// ev.target.style.cursor = 'move';
	// console.log(ev.target.id)
	// console.log("dataget");
}

function drop(ev) {

  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
	var sourceBoxD3;
	try {
   sourceBoxD3 = d3.select("#"+data);
	}
	catch(err) {
  	//no need to handle error
	}

	if(sourceBoxD3 && sourceBoxD3._groups[0][0] != null){
		sourceBoxD3.style("background-color","red").style("cursor","pointer");
		var sourceBox = document.getElementById(data);
		sourceBoxD3.attr("draggable","false");
		// console.log(sourceBox)
		var trueTarget = ev.target.parentElement;
		var targetBoxD3 = d3.select(trueTarget);
		ev.target.removeEventListener('dragover', allowDrop);
		ev.target.removeEventListener('dragleave',dragLeave);
		ev.target.removeEventListener('drop', drop);

		var parentid = trueTarget.parentElement.id
		var localid = parentid.substring(4,parentid.length);
		var switchElem = trueTarget.parentElement.getElementsByTagName("label")[0];
		switchElem.style.pointerEvents = "none"

		trueTarget.parentElement.children[0].style.borderLeft = "solid green 7px";
		var cover = switchElem.appendChild(document.createElement("div"));
		cover.className = "cover";

		targetBoxD3.style("z-index","3")
						 .style("background-color","green");
		fitText(trueTarget,sourceBoxD3._groups[0][0].labelTitan)

		sourceBox.addEventListener('click', function() {undoSelect(trueTarget,targetBoxD3,sourceBoxD3,sourceBox)}, false);
	}
	//console.log(info._groups[0][0].labelTitan);

  // ev.target.appendChild(document.getElementById(data));
}

// function createFunction(t3,s3,s){
//
// }


//TODO: reenable fbox:active{grabbing}
function undoSelect(target,targetD3,sourceD3,source){
	 targetD3.node().removeChild(targetD3.node().firstChild);




	 target.parentElement.children[0].style.borderLeft = "solid crimson 7px";
	 //var old_element = document.getElementById("btn");
	 sourceD3.style("background-color","white");
	 targetD3.style("background-color","white")
	         .style("z-index","");

	var hitbox = target.appendChild(document.createElement('div'));
 	hitbox.addEventListener('dragover', allowDrop, false);
 	hitbox.addEventListener('drop', drop, false);
 	hitbox.addEventListener('dragleave',dragLeave,false);
 	hitbox.style.height = "105px";
 	hitbox.style.minWidth = "200px";
 	// hitbox.style.backgroundColor = "rgba(100,0,0,.5)"
 	hitbox.style.zIndex = "10";



	var parentid = target.parentElement.id
	var localid = parentid.substring(4,parentid.length);
	var switchElem = target.parentElement.getElementsByTagName("label")[0];
	switchElem.style.pointerEvents = "Auto"
	var cover = switchElem.getElementsByClassName("cover")[0];
	cover.parentNode.removeChild(cover);


	 var new_element = source.cloneNode(true);
	 source.parentNode.replaceChild(new_element, source);
	 d3.select(new_element)
	 	 .attr("draggable","true")
		 .style("cursor","grab");
	 new_element.labelTitan = source.labelTitan;
	 // console.log(source.children[0].children[0].textContent);
	 currentMapping[source.children[0].children[0].textContent] = NO_MAPPING;
	 new_element.addEventListener('dragstart', drag, false);
}

function enableRelationship(event){
	// console.log("Enable!")
	var unit = event.target.parentNode;
	var tests = 2;
	while(tests > 0){
		tests--;
		if(unit.className == "unit"){
			//unit.parentNode.removeChild(unit);
			break;
		}
		else{
			unit = unit.parentNode;
		}
	}
	// console.log("pong")
	// unit.style.border = "thick dashed rgb(180,30,30)";
	unit.children[0].style.borderLeft = "solid crimson 7px";
	unit.children[0].style.backgroundColor = "white";
	unit.children[1].children[0].style.fill = "white";
	unit.children[2].style.backgroundColor = "white";
	var hitbox = unit.children[2].appendChild(document.createElement('div'));
	hitbox.addEventListener('dragover', allowDrop, false);
	hitbox.addEventListener('drop', drop, false);
	hitbox.addEventListener('dragleave',dragLeave,false);
	hitbox.style.height = "105px";
	hitbox.style.minWidth = "200px";
	// hitbox.style.backgroundColor = "rgba(100,0,0,.5)"
	hitbox.style.zIndex = "4";
	// unit.children[2].addEventListener('dragover', allowDrop,false);
	// unit.children[2].addEventListener('dragleave',dragLeave,false);
	// unit.children[2].addEventListener('drop', drop,false);
  event.target.removeEventListener("change",enableRelationship,true);
	event.target.addEventListener("change",disableRelationship,true);
}

function disableRelationship(event){
	// console.log("===================");
	// console.log(event.target)
	// console.log(event.target.parentNode.className);
	// console.log("last delete");
	// console.log("ping")
	//Removes element from list VVVVV
	console.log("Disable!")
	var unit = event.target.parentNode;
	var tests = 2;
	while(tests > 0){
		tests--;
		if(unit.className == "unit"){
			//unit.parentNode.removeChild(unit);
			break;
		}
		else{
			unit = unit.parentNode;
		}
	}
	// console.log(unit)
	// unit.style.border = "thick dashed grey";
	unit.children[0].style.borderLeft = "solid green 7px";
	unit.children[0].style.backgroundColor = "grey";
	unit.children[1].children[0].style.fill = "grey";
	unit.children[2].style.backgroundColor = "grey";
	removeChildren(unit.children[2]);
	// unit.children[2].removeEventListener('dragover', allowDrop);
	// unit.children[2].removeEventListener('dragleave',dragLeave);
	// unit.children[2].removeEventListener('drop', drop);
  event.target.removeEventListener("change",disableRelationship,true);
	event.target.addEventListener("change",enableRelationship,true);

	// console.log(unit);

}


function verifyMapping(){
	for (const [key, value] of Object.entries(currentMapping)) {
  	if(hudl.checked == true){
			// console.log(key,requiredHudlSet)
			if(requiredHudlSet.includes(key) && value === NO_MAPPING){
				console.log(`required key ${key} is not found, please map it`)
				return false;
			}
		}
		else if(cstm.checked == true){
			if(requiredSet.includes(key) && value === NO_MAPPING){
				console.log(`required key ${key} is not found, please map it`)
				return false;
			}
		}
	}
	return true;
}

function submitHandler(){
	var mappingSelect = d3.selectAll(".unit");
	var mapObjs = mappingSelect._groups[0];
	var leftBox;
	var rightBox;
	var key;
	var value;
	var firstToScroll = null;
	// console.log("=============================")
	for(var i = 0; i < mapObjs.length;i++){
		leftBox = mapObjs[i].children[0];
		rightBox = mapObjs[i].children[2];
		value = leftBox.children[0].children[0].textContent;
		// console.log(rightBox.children)
		if(rightBox.children[0] != undefined && rightBox.children[0].tagName === "DIV"){
			// console.log("missing mapping for " + key);

			if(mapObjs[i].children[3]===undefined){
				// mapObjs[i].style.border = "thick dashed rgb(180,30,30)";
				// if(firstToScroll === null){
				// 	firstToScroll = mapObjs[i];
				// }
				// var button = mapObjs[i].appendChild(document.createElement("button"));
				// var icon = button.appendChild(document.createElement("i"));
				// button.className = "btn default";
				// button.style.backgroundColor="rgb(255,0,0)";
				// icon.className = "fa fa-trash";
				// icon.style.color="rgb(255,255,255)";
				// // button.textContent = "Remove";
				// button.type = "submit";
				// button.addEventListener("click",disableRelationship,false);
				// console.log(button);
			}
			else{
				if(firstToScroll === null && mapObjs[i].children[2].style.backgroundColor != "grey"){
					// console.log("set",mapObjs[i])
					firstToScroll = mapObjs[i];
				}
			}
		}
		else if(rightBox.children[0] != undefined && rightBox.children[0].tagName === "svg"){
			key = rightBox.children[0].children[0].textContent;
			currentMapping[key] = value;

		}

	}
	//TODO: "HANDLE CASE OF BOTH"
  if(firstToScroll){
		// console.log("hit")

		// console.log()
		alert("Unsuccesful mapping (Missing some collumn, please disable collumns you cannot match with)")
		$([document.documentElement, document.body]).animate({
        scrollTop: $("#"+firstToScroll.id).offset().top
    }, 1000);
	}
	else if(!verifyMapping()){
		alert("missing required fields");

	}
	else if(firstToScroll == null && verifyMapping() && uploadedfile){
		console.log("Succesful Map!")
		console.log(currentMapping);
		authAndRun((team)=>{
			var filename = encodeURIComponent(uploadedfile.name);
			filename = filename.substring(0,filename.lastIndexOf('.'));
			var directory = ""+ encodeURIComponent(team);

			var blob = new Blob([JSON.stringify(currentMapping)], {type: "text/json;charset=utf-8"});
			var jsonfile = new File([blob],filename+".json")

			putObjAndRun("titancommonstorage",directory+"/datasets/"+filename+"/"+filename+".json",jsonfile,(response1)=>{
				putObjAndRun("titanrawdata",directory+"/"+filename+".csv",uploadedfile,(response2)=>{
					console.log(doublysuccess);
				});
			});
		});

		///END OF FUNCITON==============================
	}


}

function generateHoldingCell(data){
	var parent = document.getElementById("headerContainer");
	removeChildren(parent);
	var unit;
	var lBox;
	var svg;
	var text;
	for(var i = 0; i < data.length;i++){

		box = parent.appendChild(document.createElement('div'));
		box.className = "col-md-3 fBox";
		box.draggable = "true";
		box.id = "coachHeader"+i;
		box.labelTitan = data[i];
		box.addEventListener('dragstart', drag, false);
		// box.ondragstart = drag(event);
		fitText(box,data[i])



		// svg = d3.select("#arrow")
		// console.log(svg)

	}
}

$(document).ready(function() {
	function StatsProcessor() {
		// var newStats = new Stats();
    //     newStats.processNames();
		//Update View
		updateDom();
	};

	//Create Stats class
	var Stats = function(columnNames){
        this.columnNames = columnNames
	};

    function getNames(){
        return this.columnNames;
    }

    // Stats.prototype.processNames = function(){
    //     columnNames = data[0];
    //     console.log(d3.select("#main"))
    //     drawColumns(svg, columnNames, 50, 50, 40, 150, 70);
		//
    // }

	//Update DOM with stat values
	var updateDom = function() {
		function viewModel() {
			// this.countOfIntegers = ko.observable(columnNames);
		};
		ko.applyBindings(new viewModel());
	};

	// Upload selected file and create array
	var uploadFile = function(evt) {
		var file = evt.target.files[0];
		uploadedfile = evt.target.files[0];
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(event) {
			console.log(event)
			//Jquery.csv
			console.log(file)



			cognitoUser.getSession(function(err, session) {
				if (err) {	alert(err.message || JSON.stringify(err)); return;}
				// console.log('session validity: ' + session.isValid());

				let team = "team";
				// NOTE: getSession must be called to authenticate user before calling getUserAttributes
				cognitoUser.getUserAttributes(function(err, attributes) {
					if (err) {alert(err);}
					else {
						// console.log(attributes)
						if(JSON.parse(JSON.stringify(attributes[1])).Name === "custom:Team")
			        team = JSON.parse(JSON.stringify(attributes[1])).Value;
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

				    AWS.config.credentials.refresh(error => {
							if (error) {console.error(error);	}
							else {
								// console.log(AWS.config.credentials)
								// console.log(AWS)
								var s3 = new AWS.S3({
									  apiVersion: "2006-03-01",
									  params: { Bucket: "titanrawdata" }
								});


							  var filename = encodeURIComponent(file.name);
								var directory = ""+ encodeURIComponent(team)+"/";
								var params ={
								  Delimiter: "/",
								  Prefix:directory
						    }
							  s3.listObjectsV2(params, function(err, data) {
								  if (err) console.log(err,err.stack);
								  else {
										console.log(data.Contents);
										var currDirectory = data.Contents;
										for(var i = 0; i < currDirectory.length;i++){
											// console.log(currDirectory[i].Key,directory+photoKey)
											if(currDirectory[i].Key === directory+filename){
												alert("please change file already exists in our system, please change filename");
												return;
											}
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


			// console.log("Work location===========================")
			// console.log(_config.identity.identityPoolId);
			//
			// // console.log(AWS.config);
			// // AWS.config.crendentials.refresh((err)=>{
			// // 	console.log(err)
			// // 	console.log(AWS.credentials);
			// // })
			// console.log("Work location===========================")
			// var s3 = new AWS.S3({
			//   apiVersion: "2006-03-01",
			//   params: { Bucket: "cornellheavies" }
			// });
			//
			// console.log(s3);
			// s3.listObjects({ Delimiter: "/" },(err, data) => {
			// 	console.log(err);
			// 	console.log(data);
			// });








			// const xhr = new XMLHttpRequest();
			// console.log(xhr);
			// const formData = new FormData();
			//
			// formData.append("myFiles[]",file);
			// xhr.open("post","https://399j7jpqkf.execute-api.us-east-1.amazonaws.com/indevdeployment")
			// xhr.send(formData);
			// $.ajax({
      //       method: 'POST',
      //       url: "http://127.0.0.1:3000/",
      //       headers: {
      //           // Authorization: authToken
			// 					contentType :
      //       },
      //       data: JSON.stringify({
      //           PickupLocation: {
      //               Latitude: pickupLocation.latitude,
      //               Longitude: pickupLocation.longitude
      //           }
      //       }),
      //       contentType: 'application/json',
      //       success: completeRequest,
      //       error: function ajaxError(jqXHR, textStatus, errorThrown) {
      //           console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
      //           console.error('Response: ', jqXHR.responseText);
      //           alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
      //       }
      //   });
			createArray($.csv.toArrays(event.target.result));
		};
	};

	// Validate file import
	var createArray = function(data) {
		if(data !== null && data !== "" && data.length > 1) {

			this.data = data;
			ourData = data;
			// generateHoldingCell(data[0]);
			createRecepticle(data[0])

			StatsProcessor(data);

			$("#statOutPut").removeClass( "hidden" );
			$("#errorOutPut").addClass( "hidden" );
		} else {
			$("#errorOutPut").removeClass( "hidden" );
			$("#statOutPut").addClass( "hidden" );
			$("#errorOutPut li").html('There is no data to import');
		}
	};
	document.getElementById('txtFileUpload').addEventListener('change', uploadFile, false);


});
