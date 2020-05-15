var svg;
d3.select("#mainDiv").append("svg")
.attr("width", 2000)
.attr("height", 2000)
.attr("id", "graph")
svg = d3.select("#graph");

$(document).ready(function() {
	function StatsProcessor() {
        d3.selectAll("svg > *").remove();
		var newStats = new Stats();
		//Call Methods
		// newStats.init();
		// newStats.processLine();
		// newStats.collectStats();
        newStats.processNames();
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

    Stats.prototype.processNames = function(){
        columnNames = data[0];
        console.log(d3.select("#main"))
        drawColumns(svg, columnNames, 50, 50, 40, 150, 70);

    }

	//Update DOM with stat values
	var updateDom = function() {
		function viewModel() {
			this.countOfIntegers = ko.observable(columnNames);
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

    var clicked = [];
    var no_lines = [];

    function deselect(s){
        // var new_op, new_st;
        // if (s.attr("fill-opacity") == 0.8) {
        //   new_op = 1;
        //   new_st = 4;
        // }
        // else {
        //   new_op = 0.8;
        //   new_st = 1;
        // }
        // s.transition().duration(200)
        //   .attr("fill-opacity", new_op)
        //   .attr("stroke", "maroon")
        //   .attr("stroke-width", new_st)
    }

    function click(shape, index) {
      shape.on("mousedown", function () {
        var s = d3.select(this);
        deselect(s);

        var id = s.attr("id");
        if (clicked.length == 0){
            clicked.push(id);
        }
        else{
            if (id.slice(0,id.length-1) == clicked[0].slice(0,clicked[0].length-1)){
                var temp = d3.select("#" + clicked[0])
                deselect(temp);
                clicked = [id];
            }
            else{
                deselect(s);
                deselect(d3.select("#" + clicked[0]));
                var lin;
                if (id.slice(0,id.length-1) == "column"){
                    lin = d3.select("#line" + id.slice(id.length-1) + clicked[0].slice(clicked[0].length-1));
                }
                else{
                    lin = d3.select("#line" + clicked[0].slice(clicked[0].length-1) + id.slice(id.length-1));
                }
                var vis = lin.attr("visibility");
                if (vis == "hidden"){
                    no_lines.push(lin.attr("id"));
                    lin.attr("visibility", "visible")
                }else{
                    var ind = no_lines.indexOf(lin.attr("id"));
                    no_lines.splice(ind, 1);
                    lin.attr("visibility", "hidden")
                }
                clicked = [];
                }
            }
        if (no_lines.length == 3){
            alert("You chose: " + no_lines);
            changeNames(getNames(), no_lines.map(x => x.slice(4)));
        }
    }
    )};

    function drawConnections(canvas, lenI, lenR, top, left, height, width, separation, distance){
        var lines = [];
        for (var i = 0; i < lenI ; i++){
            for (var j = 0 ; j < lenR ; j++){
                lines.push(canvas.append("path")
                    .attr("d", "M " + (left + width) + " " + (top + height/2 + separation*i) + " L " + (left + distance) + " " + (top + height/2 + separation*j))
                    .attr("stroke-width", 2)
                    .attr("fill", "black")
                    .attr("fill-opacity", 0.6)
                    .attr("stroke", "red")
                    .attr("visibility", "hidden")
                    .attr("id", "line" + i + j))
            }
        }
        return lines;
    }

    function drawColumns(canvas, columnNames, topMargin, leftMargin, blockHeight, blockWidth, blockSeparationY){
        var temp = topMargin;
        var count = columnNames.length;
        var lines = drawConnections(canvas, count, 3, topMargin, leftMargin, blockHeight, blockWidth, blockSeparationY, 500);
        var columns = [];
        var column_text = [];
        var results = [];
        var result_text = [];

        for (var i = 0; i < count ; i++){
            columns.push(canvas.append("rect")
                .attr("x", leftMargin)
                .attr("y", topMargin)
                .attr("height", blockHeight)
                .attr("width", blockWidth)
                .attr("fill", "orange")
                .attr("fill-opacity", 0.8)
                .attr("stroke-width", 1)
                .attr("stroke", "maroon")
                .attr("id", "column" + i))
            column_text.push(canvas.append("text")
                .attr("x", leftMargin + blockWidth/2)
                .attr("y", topMargin + blockHeight/2 + 16/4)
                .attr("fill", "#00203FFF")
                .attr("stroke", "#00203FFF")
                .text(columnNames[i])
                .attr("text-anchor", "middle")
                .attr("font-size", 16 + "px")
                .attr("width", blockWidth/2)
                .attr("height", blockHeight/2)
                .attr("id", "text" + i))
            topMargin += blockSeparationY;
        }
        topMargin = temp;
        for (var j = 0; j < 3; j++){
            results.push(canvas.append("rect")
                .attr("x", leftMargin + 500)
                .attr("y", topMargin)
                .attr("height", blockHeight)
                .attr("width", blockWidth)
                .attr("fill", "orange")
                .attr("fill-opacity", 0.8)
                .attr("stroke-width", 1)
                .attr("stroke", "maroon")
                .attr("id", "result" + j))
            result_text.push(canvas.append("text")
                .attr("x", leftMargin + blockWidth/2 + 500)
                .attr("y", topMargin + blockHeight/2 + 16/4)
                .attr("fill", "#00203FFF")
                .attr("stroke", "#00203FFF")
                .text("Data Point " + (j+1))
                .attr("text-anchor", "middle")
                .attr("font-size", 16 + "px")
                .attr("width", blockWidth/2)
                .attr("height", blockHeight/2))
            topMargin += blockSeparationY;
        }
        columns.forEach(click);
        results.forEach(click);
    }

    function changeNames(colNames, indices){
        for (var i = 0; i < indices.length ; i++){
            var before = parseInt(indices[i].slice(0,1), 10);
            var after = parseInt(indices[i].slice(1,2), 10);
            data[0][before] = "Data Point " + (after + 1);
        }
        console.log(data);

    }
});
