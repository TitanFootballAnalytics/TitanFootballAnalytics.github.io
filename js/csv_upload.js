

// const standardset = ["Down","Distance","FieldZone","Personnel","Formation","PlayType","FormationFam","Cover","CoverFam"];
//["GameID",	"PosTeam",	"DefTeam",	"HomeTeam",	"AwayTeam",	"Down",	"Dist",	"DistStr",	"Qtr",	"Fieldpos100",	"YdsGained",	"Turnover", "Rush", "Pass", "SpecialTeams", "Interception", "Fumble", "Sack", "Touchdown", "Safety", "DriveNum", "PlayType", "ScoreDiff", "Completion", "TimeUnder", "DDstr", "Hash", "OffPers", "Motion", "Back", "Form"]
const standardset = ["offense","defense","pass","run","gain","td","gameid", "pos_team", "def_team", "home_team", "away_team", "down", "dist", "dist_str", "qtr", "fpos100", "gain", "turnover", "runpass", "specialteams", "int", "fum", "sack", "td", "safety", "drive_num", "playtype", "def_score", "off_score", "score_diff", "completion", "time_under", "dd_str", "hash", "off_pers", "motion", "back", "form"]
const hudlset = ["playnumber", "odk", "down", "distance", "hash", "yardline", "playtype", "result",
								"gain", "off_formation", "off_play", "off_strength", "backfield", "play_direction", "run_gap",
								"def_front", "coverage", "blitz", "quarter", "drive_num"];


var hudl = document.getElementById("hudldata");
var cstm = document.getElementById("cstmdata");

hudl.oninput = function() {
	if(hudl.checked = true){
		currentMapping = {};
		for(var i = 0; i< hudlset.length;i++){
			currentMapping[hudlset[i]] = "";
		}
		createRecepticle(hudlset);
	}
}

cstm.oninput = function() {
	if(cstm.checked = true){
		currentMapping = {};
		for(var i = 0; i< standardset.length;i++){
			currentMapping[standardset[i]] = "";
		}
		createRecepticle(standardset);
	}
}





var uploadedfile;
var currentMapping = {};
const NO_MAPPING = 404;

if(cstm.checked = true) {
	currentMapping = {};
	for(var i = 0; i< standardset.length;i++){
		currentMapping[standardset[i]] = "";
	}
	createRecepticle(standardset);
}

if(hudl.checked = true) {
	currentMapping = {};
	for(var i = 0; i< hudlset.length;i++){
		currentMapping[hudlset[i]] = "";
	}
	createRecepticle(hudlset);
}


document.getElementById("submitButton").addEventListener("click",submitHandler,false);

// d3.select("#mainDiv").append("svg")
// .attr("width", 2000)
// .attr("height", 2000)
// .attr("id", "graph")
// svg = d3.select("#graph");
function fitText(lBox,sourceText){
	var fSize = 32;

	var text = d3.select(lBox).append("svg")
								 .attr("width",150)
								 .attr("height",40)
								 .append("text")
								 .style("alignment-baseline","middle")
								 .style("text-anchor","middle")
								 .attr("x",69)
								 .attr("y",20)
								 .text(sourceText)
								 .style("font-size",""+fSize+"px");

	var bBox = text.node().getBBox();
	var currWidth = bBox.width;
	var currHeight = bBox.height;
	while(fSize > 1 && (currWidth > 134 || currHeight > 34)){
		// console.log(currWidth)
		fSize--;
		text.style("font-size",""+fSize+"px");
		bBox = text.node().getBBox();
		currWidth = bBox.width;
		currHeight = bBox.height;
	}
}

function createRecepticle(set){
		var parent = document.getElementById("lefthalf");
		while (parent.firstChild) {
    	parent.removeChild(parent.lastChild);
  	}
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
			rBox.addEventListener('dragover', allowDrop, false);
			rBox.addEventListener('drop', drop, false);
			// svg = d3.select("#arrow")
			// console.log(svg)

		}

}



function allowDrop(ev) {
  ev.preventDefault();
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
		var targetBoxD3 = d3.select(ev.target);
		ev.target.removeEventListener('dragover', allowDrop);
		ev.target.removeEventListener('drop', drop);
		ev.target.parentNode.style.border = "none";
		if(ev.target.parentNode.children[3])
			ev.target.parentNode.removeChild(ev.target.parentNode.children[3]);
		targetBoxD3.style("z-index","3")
						 .style("background-color","limegreen");
		fitText(ev.target,sourceBoxD3._groups[0][0].labelTitan)
		sourceBox.addEventListener('click', function() {undoSelect(ev.target,targetBoxD3,sourceBoxD3,sourceBox)}, false);
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
	 target.addEventListener('dragover', allowDrop, false);
	 target.addEventListener('drop', drop, false);
	 //var old_element = document.getElementById("btn");
	 sourceD3.style("background-color","white");
	 targetD3.style("background-color","white")
	         .style("z-index","0");
	 var new_element = source.cloneNode(true);
	 source.parentNode.replaceChild(new_element, source);
	 d3.select(new_element)
	 	 .attr("draggable","true")
		 .style("cursor","grab");
	 new_element.labelTitan = source.labelTitan;

	 new_element.addEventListener('dragstart', drag, false);
}

function enableRelationship(event){
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
	unit.style.border = "thick dashed rgb(180,30,30)";
	unit.children[0].style.backgroundColor = "white";
	var key = unit.children[0].children[0].children[0].textContent;
	currentMapping[key] = "";
	unit.children[1].children[0].style.fill = "white";
	unit.children[2].style.backgroundColor = "white";
	unit.children[2].addEventListener('dragover', allowDrop,false);
	unit.children[2].addEventListener('drop', drop,false);
	unit.children[3].style.backgroundColor = "red";
	unit.children[3].children[0].className = "fa fa-trash";
  unit.children[3].removeEventListener("click",enableRelationship,false);
	unit.children[3].addEventListener("click",disableRelationship,false);
}

function disableRelationship(event){
	// console.log("===================");
	// console.log(event.target)
	// console.log(event.target.parentNode.className);
	// console.log("last delete");
	// console.log("ping")
	//Removes element from list VVVVV
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
	// console.log(unit);
	unit.style.border = "thick dashed grey";
	unit.children[0].style.backgroundColor = "grey";
	var key = unit.children[0].children[0].children[0].textContent;
	currentMapping[key] = NO_MAPPING;
	unit.children[1].children[0].style.fill = "grey";
	unit.children[2].style.backgroundColor = "grey";
	unit.children[2].removeEventListener('dragover', allowDrop);
	unit.children[2].removeEventListener('drop', drop);
	unit.children[3].style.backgroundColor = "green";
	unit.children[3].children[0].className = "fa fa-undo";
  unit.children[3].removeEventListener("click",disableRelationship,false);
	unit.children[3].addEventListener("click",enableRelationship,false);

	// console.log(unit);

}


function verifyMapping(){
	for (const [key, value] of Object.entries(currentMapping)) {
  	if(value === ""){
			return false;
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
		key = leftBox.children[0].children[0].textContent;
		if(rightBox.children[0]===undefined){
			// console.log("missing mapping for " + key);

			if(mapObjs[i].children[3]===undefined){
				mapObjs[i].style.border = "thick dashed rgb(180,30,30)";
				if(firstToScroll === null){
					firstToScroll = mapObjs[i];
				}
				var button = mapObjs[i].appendChild(document.createElement("button"));
				var icon = button.appendChild(document.createElement("i"));
				button.className = "btn default";
				button.style.backgroundColor="rgb(255,0,0)";
				icon.className = "fa fa-trash";
				icon.style.color="rgb(255,255,255)";
				// button.textContent = "Remove";
				button.type = "submit";
				button.addEventListener("click",disableRelationship,false);
				// console.log(button);
			}
			else{
				if(firstToScroll === null && mapObjs[i].children[2].style.backgroundColor != "grey"){
					// console.log("set",mapObjs[i])
					firstToScroll = mapObjs[i];
				}
			}
		}
		else{
			value = rightBox.children[0].children[0].textContent;
			currentMapping[key] = value;
			// console.log(currentMapping);


		}
	}

	if(verifyMapping() && uploadedfile){
		console.log("Succesful Map!")
		console.log(currentMapping);
		cognitoUser.getSession(function(err, session) {
			if (err) {	alert(err.message || JSON.stringify(err)); return;}
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
							var titancommon = new AWS.S3({
									apiVersion: "2006-03-01",
									params: { Bucket: "titancommonstorage" }
							});
							var filename = encodeURIComponent(uploadedfile.name);
							filename = filename.substring(0,filename.lastIndexOf('.'));
							var directory = ""+ encodeURIComponent(team);
							console.log(directory+"/"+filename)

							var blob = new Blob([JSON.stringify(currentMapping)], {type: "text/json;charset=utf-8"});
							// saveAs(blob, "./hello world.txt");
							var jsonfile = new File([blob],filename+".json")
							console.log(blob);
							console.log(jsonfile);

							var params = {
								Bucket: "titancommonstorage",
								Key: directory+"/datasets/"+filename+"/"+filename+".json",
								Body: jsonfile
							}


							titancommon.putObject(params, function(err, data) {
								if (err) {
									console.log(err);
								} else {
									var titanraw = new AWS.S3({
											apiVersion: "2006-03-01",
											params: { Bucket: "titanrawdata" }
									});
									var params = {
										Bucket: "titanrawdata",
										Key: directory+"/"+filename+".csv",
										Body: uploadedfile
									}
									titanraw.putObject(params, function(err, data) {
										if (err) {
											console.log(err);
										} else {
											console.log("doublysuccess")
										}
									});
								}
							});


							// var params ={
							// 	Delimiter: "/",
							// 	Prefix:directory
							// }
							// s3.listObjectsV2(params, function(err, data) {
							// 	if (err) console.log(err,err.stack);
							// 	else {//console.log(data.Contents);
							// 		var currDirectory = data.Contents;
							// 		for(var i = 0; i < currDirectory.length;i++){
							// 			// console.log(currDirectory[i].Key,directory+photoKey)
							// 			if(currDirectory[i].Key === directory+filename){
							// 				alert("please change file already exists in our system, please change filename");
							// 				return;
							// 			}
							// 		}
							//
							//
							// 	}
							//
							// });
						}
					});

				}
			});

		});
	}
	else if(firstToScroll){
		// console.log("hit")

		// console.log()
		alert("Unsuccesful mapping (Missing some collumn, please disable collumns you cannot match with)")
		$([document.documentElement, document.body]).animate({
        scrollTop: $("#"+firstToScroll.id).offset().top
    }, 1000);
	}

}

function generateHoldingCell(data){
	var parent = document.getElementById("headerContainer");
	var unit;
	var lBox;
	var rBox;
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
			generateHoldingCell(data[0]);
			console.log(data);

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
