var svg;
const standardset = ["Down","Distance","FieldZone","Personnel","Formation","PlayType","FormationFam","Cover","CoverFam"];
document.getElementById("submitButton").addEventListener("click",submitHandler,false);
createRecepticle(standardset);
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

function createRecepticle(){
		var parent = document.getElementById("lefthalf");
		var unit;
		var lBox;
		var rBox;
		var svg;
		var text;
		for(var i = 0; i < standardset.length;i++){
			unit = parent.appendChild(document.createElement('div'));
			unit.id = "unit"+i;
			unit.className = "unit";
			lBox = unit.appendChild(document.createElement('div'));
			lBox.className = "lBox";
			fitText(lBox,standardset[i])
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
				 .attr("stroke-width",6)
				 .attr("fill","white");
			 svg.append("path")
				 .attr("d","M 5 20 H 14")
				 .attr("stroke","Black")
				 .attr("stroke-width",6)
				 .attr("fill","white");
		  svg.append("path")
				 .attr("d","M 5 60 H 14")
				 .attr("stroke","Black")
				 .attr("stroke-width",6)
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
	var sourceBoxD3 = d3.select("#"+data).style("background-color","red");
	//console.log(info._groups[0][0].labelTitan);
	var sourceBox = document.getElementById(data);
	sourceBoxD3.attr("draggable","false");
	// console.log(sourceBox)
	var targetBoxD3 = d3.select(ev.target);
	ev.target.removeEventListener('dragover', allowDrop);
	ev.target.removeEventListener('drop', drop);
	targetBoxD3.style("z-index","3")
					 .style("background-color","green");
	fitText(ev.target,sourceBoxD3._groups[0][0].labelTitan)
	sourceBox.addEventListener('click', function() {undoSelect(ev.target,targetBoxD3,sourceBoxD3,sourceBox)}, false);
  // ev.target.appendChild(document.getElementById(data));
}

// function createFunction(t3,s3,s){
//
// }



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
	 	 .attr("draggable","true");
	 new_element.labelTitan = source.labelTitan;

	 new_element.addEventListener('dragstart', drag, false);
}

function submitHandler(){

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
		box.className = "col-md-12 fBox";
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
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(event) {
			//Jquery.csv
			createArray($.csv.toArrays(event.target.result));
		};
	};

	// Validate file import
	var createArray = function(data) {
		if(data !== null && data !== "" && data.length > 1) {
			this.data = data;
			generateHoldingCell(data[0]);
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
