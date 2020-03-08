function addPieChart(canvas, percent1, percent2, cx, cy, radius, thickness){
    let dashArrayString = (Math.PI * 2 * radius)*percent1 + " " + (Math.PI * 2 * radius)*percent2
    let circle1 = canvas.append("circle")
        .attr("r",radius)
        .attr("cx",cx)
        .attr("cy",cy)
        .attr("fill","transparent")
        .attr("stroke","red")
        .attr("stroke-width",thickness)
        .attr("percentNum",percent2);
    let circle2 = canvas.append("circle")
        .attr("r",radius)
        .attr("cx",cx)
        .attr("cy",cy)
        .attr("fill","transparent")
        .attr("stroke","rgb(0,0,255)")
        .attr("stroke-width",thickness)
        .attr("stroke-dasharray", dashArrayString)
        .attr("percentNum",percent1);

    circle1.on("mouseover", function() {
        let label = canvas.select("text.pieLabel");
        label.text(Math.round(circle1.attr("percentNum")*100) + "%").attr("x",100).attr("y",100).attr("text-anchor","left");

        let dashArrayString2 = (Math.PI * 2 * (radius+30))*(circle2.attr("percentNum")) + " " + (Math.PI * 2 * (radius+30))*(circle1.attr("percentNum"))
        circle1.transition().duration(200)
          .attr("r",(radius+30))
        circle2.transition().duration(200)
          .attr("r",(radius+30))
          .attr("stroke-dasharray", dashArrayString2)
    });
    circle1.on("mouseout", function() {
        let label = canvas.select("text.pieLabel");
        label.text("");

        circle1.transition().duration(200)
          .attr("r",(radius))
        circle2.transition().duration(200)
          .attr("r",(radius))
          .attr("stroke-dasharray", dashArrayString)
    });

    circle2.on("mouseover", function() {
        let label = canvas.select("text.pieLabel");
        label.text(Math.round(circle2.attr("percentNum")*100).toString() + "%").attr("x",100).attr("y",100).attr("text-anchor","left");

        let dashArrayString2 = (Math.PI * 2 * (radius+30))*(circle2.attr("percentNum")) + " " + (Math.PI * 2 * (radius+30))*(circle1.attr("percentNum"))
        circle1.transition().duration(200)
          .attr("r",(radius+30))
        circle2.transition().duration(200)
          .attr("r",(radius+30))
          .attr("stroke-dasharray", dashArrayString2)
    });
    circle2.on("mouseout", function() {
        let label = canvas.select("text.pieLabel");
        label.text("");

        circle1.transition().duration(200)
          .attr("r",(radius))
        circle2.transition().duration(200)
          .attr("r",(radius))
          .attr("stroke-dasharray", dashArrayString)
    });
}

function addLoadingBars(canvas){
    canvas.append("line")
        .attr("class", "loading-bar1")
        .attr("id","bar1")
        .attr("x1",(width/2-15))
        .attr("y1",(height/2)-17)
        .attr("x2",(width/2-15))
        .attr("y2",(height/2)+17)
        .attr("stroke-width",2)
        .attr("stroke","blue")
    canvas.append("line")
        .attr("class", "loading-bar2")
        .attr("id","bar2")
        .attr("x1",(width/2-5))
        .attr("y1",(height/2)-17)
        .attr("x2",(width/2-5))
        .attr("y2",(height/2)+17)
        .attr("stroke-width",2)
        .attr("stroke","green")
    canvas.append("line")
        .attr("class", "loading-bar3")
        .attr("id","bar3")
        .attr("x1",(width/2+5))
        .attr("y1",(height/2)-17)
        .attr("x2",(width/2+5))
        .attr("y2",(height/2)+17)
        .attr("stroke-width",2)
        .attr("stroke","red")
    canvas.append("line")
        .attr("class", "loading-bar4")
        .attr("id","bar4")
        .attr("x1",(width/2+15))
        .attr("y1",(height/2)-17)
        .attr("x2",(width/2+15))
        .attr("y2",(height/2)+17)
        .attr("stroke-width",2)
        .attr("stroke","orange")
}

function removeLoadingBars(canvas){
    canvas.select("line.loading-bar1").remove();
    canvas.select("line.loading-bar2").remove();
    canvas.select("line.loading-bar3").remove();
    canvas.select("line.loading-bar4").remove();
}

function addBarGraph(data, uniqueID ,canvas, x1, y1, x2, y2){
    const margin2 = {top:0,bottom:0,left:0,right:0};
    var max = d3.max(data.map(d => d.val));
    var min = d3.min(data.map(d => d.val));

    y = d3.scaleBand().rangeRound([y2-y1, 0]).padding(0.2);
    x = d3.scaleLinear().rangeRound([0, x2-x1]);
    y.domain(data.map(d => d.category));
    x.domain([min-(max)/10, max]);

    //add the y axis to the graph
    canvas.append("g")
        .attr("class", "y axis")
        .attr("transform","translate("+(margin2.left+x1)+","+(margin2.top+y1)+")")
        .call(d3.axisLeft(y).ticks(6))

    //add the x axisto the graph
    canvas.append("g")
        .attr("class", "x axis")
        .attr("transform","translate("+(margin2.left+x1)+","+(y2+margin2.top+10)+")")
        .call(d3.axisBottom(x).ticks(4));

    console.log("here")
    canvas.selectAll(".bar" + uniqueID)
        .data(data)
        .enter().append("rect")
        .attr("transform","translate("+(margin2.left+x1)+","+(margin2.top+y1)+")")
        .attr("class", "bar" + uniqueID)
        .attr("fill", function (d, i) {
            return 'rgb(200, ' + Math.round(i / 2) + ', ' + i*30 + ')'
        })
        .attr("x", 0)
        .attr("y", d => y(d.category))
        .attr("height", y.bandwidth())
        .transition()
        .duration(1000)
        .delay(function (d, i) {
            return i * 500;
        })
        .attr("width", d => x(d.val));
};


function addSankey(data, canvas, x1, y1, x2, y2){
    const margin2 = {top:0,bottom:0,left:0,right:0};
    var max = d3.max(data.map(d => d.val));
    var min = d3.min(data.map(d => d.val));

    y = d3.scaleBand().rangeRound([y1, y2]);
    x = d3.scaleLinear().rangeRound([x1, x2]);
    y.domain(data);
    x.domain([0,1,2]);

    //x.domain([0, x2-x1]);

    // data.forEach(d => {
    //     console.log(d.val);
    //     console.log(x(d.val))
    // });


    // canvas.append("g")
    //     .attr("class", "y axis")
    //     .attr("transform","translate("+(margin2.left+x1)+","+(margin2.top+y1)+")")
    //     .call(d3.axisLeft(y).ticks(6))

    //add the x axisto the graph
    // canvas.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform","translate("+(margin2.left+x1)+","+(y2+margin2.top+10)+")")
    //     .call(d3.axisBottom(x));
    function toString(x,y){
      return "" + x + " " + y + "";
    }
    canvas.append("path")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("d","M "+toString(x1,y1)+
              " L "+toString(x2,y1)+
              " L "+toString(x2,y2)+
              " L "+toString(x1,y2)+
              " L "+toString(x1,y1))
    .attr("fill","none");
    canvas.selectAll(".line")
        .data(data)
        .enter().append("path")
        .attr("class", "line")
        .attr("d","M "+toString(x1,y1))
//         .attr("transform","translate("+(margin2.left+x1)+","+(margin2.top+y1)+")")
//         .attr("class", "bar")
//         .attr("fill", function (d, i) {
// 		return 'rgb(200, ' + Math.round(i / 2) + ', ' + i*30 + ')'
// 	})
//         .attr("x", 0)
//         .attr("y", d => y(d.category))
//         .attr("height", y.bandwidth())
//         .transition()
//         .duration(1000)
// 	.delay(function (d, i) {
// 		return i * 500;
// 	})
//         .attr("width", d => x(d.val));
// };



}



function addHeader(svg) {
  let label = svg.append("text")
    .attr("class", "rectLabel")
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "black")
    .text("")
  function stats(canvas, w, h) {
    var coordinates = [[width - w, 0], [width - w * 2, 0], [width - w, h], [width - w * 2, h], [width - w, h * 2], [width - w * 2, h * 2], [width - w, h * 3], [width - w * 2, h * 3]]
    coordinates.forEach(function (coordinate) {
      let rec = canvas.append("rect")
        .attr("x", coordinate[0])
        .attr("y", coordinate[1])
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
    })
  }
  function addTeam(canvas, radius) {
    let im = canvas.append("image")
      .attr("x", radius / 2 - 15)
      .attr("y", radius / 2 - 15)
      .attr("href", "TitanLogoB.png")
      .attr("height", radius * 2)
      .attr("width", radius * 2)
    let txt = canvas.select("text.rectLabel")
    txt.text("Titan Analytics")
      .attr("x", 10)
      .attr("y", 130)
      .attr("text-anchor", "left")
      .style("font", "bold 20px sans-serif")
  }
  function mouseon(shape, index) {
    shape.on("mouseover", function () {
      shape.transition().duration(200)
        .attr("fill-opacity", 1)
        .attr("stroke", "maroon")
        .attr("stroke-width", 3)
    });
  }
  function mouseoff(shape, index) {
    shape.on("mouseout", function () {
      shape.transition().duration(200)
        .attr("fill-opacity", 0.5)
        .attr("stroke", "maroon")
        .attr("stroke-width", 1)
    });
  }
  function spline(canvas, top, h, w, separation, radius) {
    bottom = top + radius * 2;
    let shape00 = canvas.append("path")
      .attr("d", "M 82 10 A 50 50 0 0 1 120 57 L 180 57 L 160 10 z")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)
    let shape10 = canvas.append("path")
      .attr("d", "M 82 110 A 50 50 0 0 0 120 63 L 180 63 L 160 110 z")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)
    let shape01 = canvas.append("path")
      .attr("d", "M 166 10 L 186 57 L 246 57 L 226 10 z")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)
    let shape11 = canvas.append("path")
      .attr("d", "M 166 110 L 186 63 L 246 63 L 226 110 z")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)

    let shape02 = canvas.append("path")
      .attr("d", "M 232 10 L 252 57 L 312 57 L 292 10 z")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)

    let shape12 = canvas.append("path")
      .attr("d", "M 232 110 L 252 63 L 312 63 L 292 110 z")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)

    let shape03 = canvas.append("path")
      .attr("d", "M 298 10 L 318 57 L 378 57 L 358 10 z")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)

    let shape04 = canvas.append("path")
      .attr("d", "M 364 10 L 424 10 L 444 57 L 384 57 z")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)

    let shape05 = canvas.append("path")
      .attr("d", "M 430 10 L 490 10 L 510 57 L 450 57 z")
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)

    var shapes = [shape00, shape01, shape02, shape03, shape04, shape05, shape10, shape11, shape12];
    shapes.forEach(mouseon);
    shapes.forEach(mouseoff);
  }
  stats(svg, 105, 35);
  addTeam(svg, 50);
  var h = 47;
  var w = 60;
  var separation = 6;
  var radius = 50;
  var top = 10;
  spline(svg, top, h, w, separation, radius)
}
