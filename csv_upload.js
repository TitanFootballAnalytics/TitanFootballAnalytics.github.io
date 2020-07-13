var svg;
const standardset = ["Down","Distance","FieldZone","Personnel","Formation","PlayType","FormationFam","Cover","CoverFam"];
// d3.select("#mainDiv").append("svg")
// .attr("width", 2000)
// .attr("height", 2000)
// .attr("id", "graph")
// svg = d3.select("#graph");

function createRecepticle(standardset){
		console.log("recept")
}

function generateHoldingCell(data){
		console.log("hold")
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
			createRecepticle(standardset);
			generateHoldingCell(data);
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

    // var clicked = [];
    // var no_lines = [];
		//
    // function glow(shape) {
    //     var new_opacity, new_width;
    //     new_opacity = 1;
    //     new_width = 3;
    //     shape.transition().duration(200)
    //         .attr("fill-opacity", new_opacity)
    //         .attr("stroke-width", new_width);
    // }

    // function swap(s1, s2) {
    //     var id1 = s1.attr("id");
    //     var ind1 = s1.attr("index");
    //     var y1 = s1.attr("y");
    //     console.log("swapping " + id1 + "(" + y1 + ")" + " with " + s2.attr("id") + "(" + s2.attr("y") + ")");
		//
    //     s1.transition().duration(1000)
    //         .attr("id", s2.attr("id"))
    //         .attr("index", s2.attr("index"))
    //         .attr("y", s2.attr("y"))
    //     s2.transition().duration(1000)
    //         .attr("id", id1)
    //         .attr("index", ind1)
    //         .attr("y", y1);
    // }
		//
    // function swap_text(s1, s2) {
    //     var id1 = s1.attr("id");
    //     var y1 = s1.attr("y");
		//
    //     s1.transition().duration(1000)
    //         .attr("id", s2.attr("id"))
    //         .attr("y", s2.attr("y"));
    //     s2.transition().duration(1000)
    //         .attr("id", id1)
    //         .attr("y", y1);
    // }

    // function mouseon(shape, index) {
    //   shape.on("mouseover", function () {
    //     var s = d3.select(this);
    //     var new_op, new_st;
    //     // console.log(parseInt(s.attr("selected"),10));
    //     if (parseInt(s.attr("selected"),10) == 1) {
    //       new_op = 1;
    //       new_st = 4;
    //     }
    //     else {
    //       new_op = 0.8;
    //       new_st = 2;
    //     }
    //     shape.transition().duration(200)
    //       .attr("fill-opacity", new_op)
    //       .attr("stroke-width", new_st)
    //   });
    // }
		//
    // function mouseoff(shape, index) {
    //   shape.on("mouseout", function () {
    //     console.log("off");
    //     var s = d3.select(this);
    //     var new_op, new_st;
    //     // console.log(parseInt(s.attr("selected"), 10));
    //     if (parseInt(s.attr("selected"),10) == 1 || parseInt(s.attr("connected"),10) == 1) {
    //       new_op = 1;
    //       new_st = 3;
    //     }
    //     else {
    //       new_op = 0.6;
    //       new_st = 1;
    //     }
    //     shape.transition().duration(200)
    //       .attr("fill-opacity", new_op)
    //       .attr("stroke-width", new_st)
    //   });
    // }
		//
    // function mouseclick(shape) {
    //     var new_opacity, new_width;
    //     if (parseInt(shape.attr("selected"),10) == 0) {
    //         new_opacity = 1;
    //         new_width = 3;
    //     }
    //     else {
    //         new_opacity = 0.6;
    //         new_width = 1;
    //     }
    //     shape.transition().duration(200)
    //         .attr("fill-opacity", new_opacity)
    //         .attr("stroke-width", new_width)
    //         .attr("selected", Math.pow(parseInt(shape.attr("selected"),10) - 1, 2));
    //     // console.log(shape.attr("selected"));
    // }

    // function disconnect(index) {
    //     var res = d3.select("#result" + index);
    //     var col = d3.select("#column" + index);
    //     var lin = d3.select("#line" + index);
		//
    //     res.attr("connected", 0);
    //     col.attr("connected", 0);
    //     lin.attr("visibility", "hidden");
		//
    //     function deselect(shape) {
    //         var new_opacity, new_width;
    //         new_opacity = 0.6;
    //         new_width = 1;
    //         shape.transition().duration(200)
    //             .attr("fill-opacity", new_opacity)
    //             .attr("stroke-width", new_width)
    //             .attr("selected", 0);
    //     }
    //     deselect(res);
    //     deselect(col);
    // }
		//
    // function click(shape, index) {
    //     shape.on("mousedown", function () {
    //         // shape.attr("connected", 1);
    //         var id = shape.attr("id")
    //         var chosen = d3.select("#" + clicked[0]);
    //         // console.log(id);
		//
    //         if (shape.attr("connected") == 1) {
    //             console.log("disconnecting");
    //             disconnect(shape.attr("index"));
    //             // clicked = [];
    //         }
    //         else if (clicked.length == 0) {
    //             console.log("push");
    //             mouseclick(shape);
    //             clicked.push(id);
    //         }
    //         // If "shape" is connected to others
    //         else if (shape.attr("id") == chosen.attr("id")) {
    //             console.log("duplicate");
    //             mouseclick(shape);
    //             clicked = [];
    //         }
    //         else if (chosen.attr("class") == shape.attr("class") && chosen.attr("selected") == 1) {
    //             console.log("swap same col");
    //             mouseclick(chosen);
    //             mouseclick(shape);
    //             clicked = [shape.attr("id")];
    //         }
    //         else if (chosen.attr("class") != shape.attr("class")) {
    //             console.log("choosing");
    //             var dest_ind;
    //             var lin;
    //             // glow(chosen);
    //             // glow(shape);
    //             chosen.attr("connected", 1);
    //             chosen.attr("selected", 0);
    //             shape.attr("connected", 1);
    //             shape.attr("selected", 0);
		//
    //             if (chosen.attr("class") == "column") {
		//
    //                 dest_ind = shape.attr("index")
    //                 if (chosen.attr("index") != dest_ind) {
    //                     swap(chosen, d3.select("#column" + dest_ind));
    //                     swap_text(d3.select("#text" + chosen.attr("index")), d3.select("#text" + dest_ind));
    //                 }
    //                 lin = d3.select("#line" + dest_ind);
    //                 lin.attr("visibility", "visible");
    //             }
    //             else if (chosen.attr("class") == "result") {
    //                 console.log("bottom");
		//
    //                 dest_ind = chosen.attr("index");
    //                 if (shape.attr("index") != dest_ind) {
    //                     swap(shape, d3.select("#column" + dest_ind));
    //                     // glow(shape);
    //                     // shape.attr("selected", 0);
    //                     swap_text(d3.select("#text" + shape.attr("index")), d3.select("#text" + dest_ind));
    //                 }
    //                 lin = d3.select("#line" + dest_ind);
    //                 lin.attr("visibility", "visible");
    //             }
    //             clicked = [];
    //         }
    //         else {
    //             console.log("ERROR");
    //         }
    //     }
    // )}

    // function drawConnections(canvas, lenResults, top, left, height, width, separation, distance){
    //     var lines = [];
    //     for (var i = 0 ; i < lenResults ; i++){
    //         lines.push(canvas.append("path")
    //             .attr("d", "M " + (left + width) + " " + (top + height/2 + separation*i) + " L " + (left + distance) + " " + (top + height/2 + separation*i))
    //             .attr("stroke-width", 2)
    //             .attr("fill", "black")
    //             .attr("fill-opacity", 0.6)
    //             .attr("stroke", "red")
    //             .attr("visibility", "hidden")
    //             .attr("id", "line" + i)
    //             .attr("index", i));
    //         }
    //     return lines;
    // }

    // function drawColumns(canvas, columnNames, topMargin, leftMargin, blockHeight, blockWidth, blockSeparationY) {
    //     var lines = drawConnections(canvas, 3, topMargin, leftMargin, blockHeight, blockWidth, blockSeparationY, 500);
    //     var temp = topMargin;
    //     var count = columnNames.length;
    //     var lines = drawConnections(canvas, count, 3, topMargin, leftMargin, blockHeight, blockWidth, blockSeparationY, 500);
    //     var columns = [];
    //     var column_text = [];
    //     var results = [];
    //     var result_text = [];
		//
    //     for (var i = 0; i < count ; i++){
    //         columns.push(canvas.append("rect")
    //             .attr("x", leftMargin)
    //             .attr("y", topMargin)
    //             .attr("height", blockHeight)
    //             .attr("width", blockWidth)
    //             .attr("fill", "orange")
    //             .attr("fill-opacity", 0.6)
    //             .attr("stroke-width", 1)
    //             .attr("stroke", "maroon")
    //             .attr("id", "column" + i)
    //             .attr("class", "column")
    //             .attr("index", i)
    //             .attr("selected", 0)
    //             .attr("connected", 0))
    //         column_text.push(canvas.append("text")
    //             .attr("x", leftMargin + blockWidth/2)
    //             .attr("y", topMargin + blockHeight/2 + 16/4)
    //             .attr("fill", "#00203FFF")
    //             .attr("stroke", "#00203FFF")
    //             .text(columnNames[i])
    //             .attr("text-anchor", "middle")
    //             .attr("font-size", 16 + "px")
    //             .attr("width", blockWidth/2)
    //             .attr("height", blockHeight/2)
    //             .attr("id", "text" + i))
    //         topMargin += blockSeparationY;
    //     }
    //     topMargin = temp;
    //     for (var j = 0; j < standardset.length; j++){
    //         results.push(canvas.append("rect")
    //             .attr("x", leftMargin + 500)
    //             .attr("y", topMargin)
    //             .attr("height", blockHeight)
    //             .attr("width", blockWidth)
    //             .attr("fill", "orange")
    //             .attr("fill-opacity", 0.6)
    //             .attr("stroke-width", 1)
    //             .attr("stroke", "maroon")
    //             .attr("id", "result" + j)
    //             .attr("class", "result")
    //             .attr("index", j)
    //             .attr("selected", 0)
    //             .attr("connected", 0))
    //         result_text.push(canvas.append("text")
    //             .attr("x", leftMargin + blockWidth/2 + 500)
    //             .attr("y", topMargin + blockHeight/2 + 16/4)
    //             .attr("fill", "#00203FFF")
    //             .attr("stroke", "#00203FFF")
    //             .text(standardset[j])
    //             .attr("text-anchor", "middle")
    //             .attr("font-size", 16 + "px")
    //             .attr("width", blockWidth/2)
    //             .attr("height", blockHeight/2))
    //         topMargin += blockSeparationY;
    //     }
    //     columns.forEach(click);
    //     results.forEach(click);
    //     // columns.forEach(mouseclick);
    //     // results.forEach(mouseclick);
    //     columns.forEach(mouseoff);
    //     results.forEach(mouseoff);
    //     columns.forEach(mouseon);
    //     results.forEach(mouseon);
    //     // console.log(columns.forEach(x => x.attr("y")))
    // }

    // function changeNames(colNames, indices){
    //     for (var i = 0; i < indices.length ; i++){
    //         var before = parseInt(indices[i].slice(0,1), 10);
    //         var after = parseInt(indices[i].slice(1,2), 10);
    //         data[0][before] = "Data Point " + (after + 1);
    //     }
    //     // console.log(data);
		//
    // }
});
