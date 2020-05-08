function click(shape, index) {
  shape.on("mousedown", function () {
    var s = d3.select("#column" + index);
    var new_op, new_st;
    if (s.attr("fill-opacity") == 0.8) {
      new_op = 1;
      new_st = 4;
    }
    else {
      new_op = 0.6;
      new_st = 2;
    }
    shape.transition().duration(200)
      .attr("fill-opacity", new_op)
      .attr("stroke", "maroon")
      .attr("stroke-width", new_st)
  });
}

function drawColumns(canvas, columnNames){
    var length = columnNames.length;
    var top = 50;
    var left = 50;
    var height = 40;
    var width = 150;
    var columns = [];
    var column_text = [];
    var results = [];
    var result_text = [];
    for (var i = 0; i < length ; i++){
        columns.push(canvas.append("rect")
            .attr("x", left)
            .attr("y", top)
            .attr("height", height)
            .attr("width", width)
            .attr("fill", "orange")
            .attr("id", "column" + i))
        column_text.push(canvas.append("text")
            .attr("x", left + width/2)
            .attr("y", top + height/2 + 16/4)
            .attr("fill", "#00203FFF")
            .attr("stroke", "#00203FFF")
            .text(columnNames[i])
            .attr("text-anchor", "middle")
            .attr("font-size", 16 + "px"))
        top += 70;
    }
    top = 50;
    for (var j = 0; j < 3; j++){
        results.push(canvas.append("rect")
            .attr("x", left + 500)
            .attr("y", top)
            .attr("height", height)
            .attr("width", width)
            .attr("fill", "orange")
            .attr("id", "result" + i))
        result_text.push(canvas.append("text")
            .attr("x", left + width/2 + 500)
            .attr("y", top + height/2 + 16/4)
            .attr("fill", "#00203FFF")
            .attr("stroke", "#00203FFF")
            .text("Data Point " + (j+1))
            .attr("text-anchor", "middle")
            .attr("font-size", 16 + "px"))
        top += 70;
    }

    columns.forEach(click);
    column_text.forEach(click);
    results.forEach(click);
    result_text.forEach(click);
}
