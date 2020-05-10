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

// var x, y;
// var dragHandler = d3.drag()
//     .on("start", function () {
//         var current = d3.select(this);
//         x = current.attr("x") - d3.event.x;
//         y = current.attr("y") - d3.event.y;
//     })
//     .on("drag", function () {
//         d3.select(this)
//             .attr("x", d3.event.x + x)
//             .attr("y", d3.event.y + y);
//     });


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
    // column_text.forEach(click);
    results.forEach(click);
    // result_text.forEach(click);
    // dragHandler(svg.selectAll("rect"));
    // dragHandler(svg.selectAll("text"));
}
