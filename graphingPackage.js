function colorPallete(canvas){
  function convToRGB(i,hex){
    obj = d3.hsl(hex);
    rgb = obj.rgb();
    // console.log(rgb);
    return {id:i,r:rgb.r,g:rgb.g,b:rgb.b};
  }
  //create start locations for bezier rect
  // old colors
  // var colors = [{ r: 238, g: 32, b: 77 },
  // { r: 252, g: 232, b: 131 },
  // { r: 31, g: 117, b: 254 },
  // { r: 255, g: 117, b: 56 },
  // { r: 28, g: 172, b: 120 },
  // { r: 146, g: 110, b: 174 }];
  //online color scheme
  // convToRGB("#00203FFF"),
  // convToRGB("#FC766AFF")
  var colors=[
              //Red below
              convToRGB(0,"#FC766AFF"),
              convToRGB(1,"#EEA47FFF"),
              convToRGB(2,"#D01C1FFF"),
              convToRGB(3,"#F93822FF"),
              convToRGB(4,"#DD4132FF"),
              convToRGB(5,"#990011FF"),
              convToRGB(6,"#000000FF"),
              //Blues below
              convToRGB(7,"#00203FFF"),
              convToRGB(8,"#5B84B1FF"),
              convToRGB(9,"#00A4CCFF"),
              convToRGB(10,"#0E7A0DFF"),
              convToRGB(11,"#97BC62FF"),
              convToRGB(12,"#9CC3D5FF"),
              convToRGB(13,"#333D79FF"),
              convToRGB(14,"#00539CFF"),
              convToRGB(15,"#4B878BFF"),
              convToRGB(16,"#000000FF"),
              //Trash below
              convToRGB(17,"#9E1030FF"),
              convToRGB(18,"#E94B3CFF"),
              convToRGB(19,"#D64161FF"),
              convToRGB(20,"#00539CFF"),
              convToRGB(21,"#0063B2FF"),
              convToRGB(22,"#00B1D2FF")
  ];

  canvas.selectAll(".line")
    .data(colors)
    .enter().append("path")
    .attr("d", function (d, i) {
        var level = Math.floor(i/10);
        i = i%10;
        var x = 300 + i*60;
        var y = 100 + level*60;
        //x = x%1000;
        return  " M " + x + " " + y +
                " H " + (x+50) +
                " V " + (y+50) +
                " H " + x

    })
    .attr("fill", function (d, i) {

      return 'rgba('+d.r+', ' + d.g + ', ' + d.b  + ',1)'
    })



}

function pickRed(lst){
  function convToRGB(i,hex){
    obj = d3.hsl(hex);
    rgb = obj.rgb();
    // console.log(rgb);
    return {id:i,r:rgb.r,g:rgb.g,b:rgb.b};
  }
  var colors=[
              //Red below
              convToRGB(0,"#FC766AFF"),
              convToRGB(1,"#EEA47FFF"),
              convToRGB(2,"#D01C1FFF"),
              convToRGB(3,"#F93822FF"),
              convToRGB(4,"#DD4132FF"),
              convToRGB(5,"#990011FF")
            ]

}

function addPieChart(canvas, percent1, percent2, cx, cy, radius, thickness) {
  let dashArrayString = (Math.PI * 2 * radius) * percent1 + " " + (Math.PI * 2 * radius) * percent2
  let circle1 = canvas.append("circle")
    .attr("r", radius)
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("fill", "transparent")
    .attr("stroke", "red")
    .attr("stroke-width", thickness)
    .attr("percentNum", percent2);
  let circle2 = canvas.append("circle")
    .attr("r", radius)
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("fill", "transparent")
    .attr("stroke", "rgb(0,0,255)")
    .attr("stroke-width", thickness)
    .attr("stroke-dasharray", dashArrayString)
    .attr("percentNum", percent1);

  circle1.on("mouseover", function () {
    let label = canvas.select("text.pieLabel");
    label.text(Math.round(circle1.attr("percentNum") * 100) + "%").attr("x", 100).attr("y", 100).attr("text-anchor", "left");

    let dashArrayString2 = (Math.PI * 2 * (radius + 30)) * (circle2.attr("percentNum")) + " " + (Math.PI * 2 * (radius + 30)) * (circle1.attr("percentNum"))
    circle1.transition().duration(200)
      .attr("r", (radius + 30))
    circle2.transition().duration(200)
      .attr("r", (radius + 30))
      .attr("stroke-dasharray", dashArrayString2)
  });
  circle1.on("mouseout", function () {
    let label = canvas.select("text.pieLabel");
    label.text("");

    circle1.transition().duration(200)
      .attr("r", (radius))
    circle2.transition().duration(200)
      .attr("r", (radius))
      .attr("stroke-dasharray", dashArrayString)
  });

  circle2.on("mouseover", function () {
    let label = canvas.select("text.pieLabel");
    label.text(Math.round(circle2.attr("percentNum") * 100).toString() + "%").attr("x", 100).attr("y", 100).attr("text-anchor", "left");

    let dashArrayString2 = (Math.PI * 2 * (radius + 30)) * (circle2.attr("percentNum")) + " " + (Math.PI * 2 * (radius + 30)) * (circle1.attr("percentNum"))
    circle1.transition().duration(200)
      .attr("r", (radius + 30))
    circle2.transition().duration(200)
      .attr("r", (radius + 30))
      .attr("stroke-dasharray", dashArrayString2)
  });
  circle2.on("mouseout", function () {
    let label = canvas.select("text.pieLabel");
    label.text("");

    circle1.transition().duration(200)
      .attr("r", (radius))
    circle2.transition().duration(200)
      .attr("r", (radius))
      .attr("stroke-dasharray", dashArrayString)
  });
}

function addLoadingBars(canvas) {
  canvas.append("line")
    .attr("class", "loading-bar1")
    .attr("id", "bar1")
    .attr("x1", (width / 2 - 15))
    .attr("y1", (height / 2) - 17)
    .attr("x2", (width / 2 - 15))
    .attr("y2", (height / 2) + 17)
    .attr("stroke-width", 2)
    .attr("stroke", "blue")
  canvas.append("line")
    .attr("class", "loading-bar2")
    .attr("id", "bar2")
    .attr("x1", (width / 2 - 5))
    .attr("y1", (height / 2) - 17)
    .attr("x2", (width / 2 - 5))
    .attr("y2", (height / 2) + 17)
    .attr("stroke-width", 2)
    .attr("stroke", "green")
  canvas.append("line")
    .attr("class", "loading-bar3")
    .attr("id", "bar3")
    .attr("x1", (width / 2 + 5))
    .attr("y1", (height / 2) - 17)
    .attr("x2", (width / 2 + 5))
    .attr("y2", (height / 2) + 17)
    .attr("stroke-width", 2)
    .attr("stroke", "red")
  canvas.append("line")
    .attr("class", "loading-bar4")
    .attr("id", "bar4")
    .attr("x1", (width / 2 + 15))
    .attr("y1", (height / 2) - 17)
    .attr("x2", (width / 2 + 15))
    .attr("y2", (height / 2) + 17)
    .attr("stroke-width", 2)
    .attr("stroke", "orange")
}

function removeLoadingBars(canvas) {
  canvas.select("line.loading-bar1").remove();
  canvas.select("line.loading-bar2").remove();
  canvas.select("line.loading-bar3").remove();
  canvas.select("line.loading-bar4").remove();
}

function addBarGraph(data, uniqueID, canvas, x1, y1, x2, y2) {

  for (var i = 0; i < data.length - 1; i++) {
    for (var j = 0; j < data.length - 1; j++) {
      if (data[j].category < data[j + 1].category) {
        //swap!
        var temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }

  const margin2 = { top: 0, bottom: 0, left: 0, right: 0 };
  var max = d3.max(data.map(d => d.val));
  var min = d3.min(data.map(d => d.val));

  y = d3.scaleBand().rangeRound([y2 - y1, 0]).padding(0.2);
  x = d3.scaleLinear().rangeRound([0, x2 - x1]);
  y.domain(data.map(d => d.category));
  x.domain([0, max]);

  //add the y axis to the graph
  // canvas.append("g")
  //   .attr("class", "y axis")
  //   .attr("transform", "translate(" + (margin2.left + x1) + "," + (margin2.top + y1) + ")")
  //   .call(d3.axisLeft(y).ticks(data.length))

  //add the x axisto the graph
  canvas.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + (margin2.left + x1) + "," + (y2 + margin2.top + 10) + ")")
    .call(d3.axisBottom(x).ticks(max).tickFormat(d3.format("d")));

  canvas.selectAll(".bar" + uniqueID)
    .data(data)
    .enter().append("rect")
    .attr("transform", "translate(" + (margin2.left + x1) + "," + (margin2.top + y1) + ")")
    .attr("class", "bar" + uniqueID)
    .attr("fill", function (d, i) {
      return 'rgb(200, ' + Math.round(i / 2) + ', ' + i * 30 + ')'
    })
    .attr("x", 0)
    .attr("y", d => y(d.category))
    .attr("height", y.bandwidth())
    .transition()
    .duration(1000)
    .delay(function (d, i) {
      return i * 500;
    })
    .attr("count",d => d.val)
    .attr("width", d => x(d.val))


    let label = canvas.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "black")
      .text("")
    canvas.selectAll(".bar" + uniqueID)
        .on("mouseover", function () {
          d3.select(this)
            .attr("stroke", "black")
          label.text("Count: " + d3.select(this).attr("count")).attr("x", (d3.mouse(this)[0] + 5+x1)).attr("y", (d3.mouse(this)[1] - 5+y1))
        })
        .on("mouseout", function () {
          d3.select(this)
            .attr("stroke", "none")
          label.text("")
        })
        .on("mousemove", function () {
          label.attr("x", (d3.mouse(this)[0] + 5 + x1)).attr("y", (d3.mouse(this)[1] - 5 + y1))
        });

  canvas.selectAll(".circle" + uniqueID)
    .data(data)
    .enter().append("circle")
    .attr("transform", "translate(" + (margin2.left + x1) + "," + (margin2.top + y1) + ")")
    .attr("class", function (d, i) {
      return "circle" + uniqueID + "exit" + i
    })
    .attr("fill", "None")
    .attr("cx", d => x(d.val) + 10)
    .attr("cy", d => y(d.category) + y.bandwidth() / 2)
    .attr("r", 5)

  canvas.selectAll(".circle" + uniqueID)
    .data(data)
    .enter().append("circle")
    .attr("transform", "translate(" + (margin2.left + x1) + "," + (margin2.top + y1) + ")")
    .attr("class", function (d, i) {
      return "circle" + uniqueID + "enter" + i
    })
    .attr("fill", "None")
    .attr("cx", d => -10)
    .attr("cy", d => y(d.category) + y.bandwidth() / 2)
    .attr("r", 5)

    for(let i = 0; i < data.length; i++){
        canvas.append("text")
          .text(data[i].category)
          .attr("class","bar-graph-text")
          .attr("fill","black")
          .attr("stroke","black")
          .attr("stroke-width",1)
          .attr("transform","translate("+x2+","+(y1+y(data[i].category)+(y.bandwidth() / 1.5))+")")
    }
    canvas.append("text")
      .text("Count")
      .attr("class","bar-graph-text2")
      .attr("stroke","black")
      .attr("stroke-width",0.2)
      .attr("transform","translate("+((x1+x2)/2)+","+(y2+40)+")")


};


function addSankey(uniqueID,data, canvas, pad,x1, y1, x2, y2,barflag) {

  //bounding box
  // canvas.append("path").attr("d", " M " + toString(x1, y1) +
  //                           " H " + x2 +
  //                           " V " + y2 +
  //                           " H " + x1)

  function toString(x, y) {
    return "" + x + " " + y + "";
  }

  function convToRGB(hex){
    obj = d3.hsl(hex);
    rgb = obj.rgb();
    // console.log(rgb);
    return {r:rgb.r,g:rgb.g,b:rgb.b};
  }
  //create start locations for bezier rect
  // old colors
  // var colors = [{ r: 238, g: 32, b: 77 },
  // { r: 252, g: 232, b: 131 },
  // { r: 31, g: 117, b: 254 },
  // { r: 255, g: 117, b: 56 },
  // { r: 28, g: 172, b: 120 },
  // { r: 146, g: 110, b: 174 }];
  var colors=[convToRGB("#00203FFF"),
              //convToRGB("#ADEFD1FF"),
              convToRGB("#FC766AFF"),
              convToRGB("#5B84B1FF"),
              convToRGB("#00A4CCFF"),
              convToRGB("#ED2B33FF"),
              convToRGB("#0E7A0D"),
              convToRGB("#97BC62FF"),
              convToRGB("#00539CFF"),
              convToRGB("#EEA47FFF")
            ];
  var color_start = Math.floor(Math.random() * (colors.length));


  // console.log(colors);
  var total = 0;
  var val = data[0].in;
  for (var i = 0; i < data.length; i++) {
    if (data[i].in != val) {
      val = data[i].in;
      color_start++;
      color_start = color_start % 6;
    }
    data[i].color = colors[color_start];
    // console.log(color_start)
    // console.log(data[i].color)

    data[i].start = total;
    data[i].id = i;
    total += data[i].count;
  }

  //sort in order to be able to easily set end locations
  //sort will be on the out collumn first, since the in collumn is already ordered
  //it is exepcted that the it will remain ordered after a bubble sort, within
  //each bin
  for (var i = 0; i < data.length - 1; i++) {
    for (var j = 0; j < data.length - 1; j++) {
      if (data[j].out > data[j + 1].out) {
        //swap!
        var temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }

  //end order calculation
  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    data[i].end = sum;
    sum += data[i].count;
  }
  var vert_scale = (y2 - y1) / total;


  var gap = 10;
  // var colors = [{ r: 238, g: 32, b: 77 },
  // { r: 252, g: 232, b: 131 },
  // { r: 31, g: 117, b: 254 },
  // { r: 255, g: 117, b: 56 },
  // { r: 28, g: 172, b: 120 },
  // { r: 146, g: 110, b: 174 }];
  var color_start = Math.floor(Math.random() * colors.length);



  //==second set of bars=================================================================
  var first = data[0].out;
  var start = data[0].end;
  var end = data[0].count + start;
  var color = colors[color_start];
  data[0].end_color = color;
  if(barflag){
    for (var i = 1; i < data.length; i++) {
      // console.log(i)
      // console.log(first);
      // console.log(data[i].out);
      // console.log("----------");
      if (data[i].out != first) {
        // console.log("gottem")
        canvas.append("path")
          .attr("d", " M " + toString(x2 , y1 + start * vert_scale) +
                     " H " + (x2 - 20) +
                     " V " + (y1 + end * vert_scale) +
                     " H " + x2)

          .attr("fill", "rgb(" + color.r + "," + color.g + "," + color.b + ")");
        color_start = (color_start + 1) % colors.length;
        first = data[i].out;
        start = data[i].end;
        end = data[i].count + start;
        color = colors[color_start];
        data[i].end_color = color;
      }
      else {
        data[i].end_color = color;
        end = data[i].end + data[i].count;
      }
    }
    end = data[data.length - 1].end + data[data.length - 1].count;
    data[data.length - 1].end_color = color;
    canvas.append("path")
      .attr("d", " M " + toString(x2, y1 + start * vert_scale) +
        " H " + (x2 - 20) +
        " V " + (y1 + end * vert_scale) +
        " H " + (x2))
      .attr("fill", "rgb(" + color.r + "," + color.g + "," + color.b + ")");
  }
  //=========================================================================

  //reorder for aesthetic
  // for (var i = 0; i < data.length - 1; i++) {
  //   for (var j = 0; j < data.length - 1; j++) {
  //     if (data[j].id > data[j + 1].id) {
  //       //swap!
  //       var temp = data[j];
  //       data[j] = data[j + 1];
  //       data[j + 1] = temp;
  //     }
  //   }
  // }

  //=====First set of bars=====================================================================
  var first = data[0].in;
  var start = data[0].start;
  var end = data[0].count + start;
  var color = data[0].color;
  // console.log(data)
  // console.log(color)
  if(barflag){
    for (var i = 0; i < data.length; i++) {
      if (data[i].in != first) {
        first = data[i].in;
        color = data[i].color;
      }
      //console.log(data[i])
      canvas.append("path")
        .attr("d", " M " + toString(x1, y1 + data[i].start * vert_scale) +
          " H " + (x1 + 20) +
          " V " + (y1 + 1 + data[i].start*vert_scale + data[i].count * vert_scale) +
          " H " + x1)
        .attr("fill", "rgb(" + color.r + "," + color.g + "," + color.b + ")");

    }
  }
  //============================================================================


  x1 += (20 + gap);
  canvas.selectAll(".sankeyline"+uniqueID)
    .data(data)
    .enter().append("path")
    .attr("class", "sankeyline"+uniqueID)
    .attr("d", function (d, i) {
      var mid = ((x2-(20+gap)) - x1) / 2;
      return (" M " + toString(x1, y1 + d.start * vert_scale + pad) +
        " C " + toString(x1 + mid, y1 + d.start * vert_scale + pad) + " " + toString(x1 + mid, y1 + d.end * vert_scale + pad) + " " + toString(x2-(gap+20), y1 + d.end * vert_scale + pad) +
        " L " + toString(x2-(gap+20), y1 + d.end * vert_scale + d.count * vert_scale - pad) +
        " C " + toString(x1 + mid, y1 + d.end * vert_scale + d.count * vert_scale - pad) + " " + toString(x1 + mid, y1 + d.start * vert_scale + d.count * vert_scale - pad) + " " + toString(x1, y1 + d.start * vert_scale + d.count * vert_scale - pad) +
        " Z ");

    })
    .attr("fill", function (d, i) {
      console.log(d)
      var col = d.color;
      var ecol = d.end_color;
      canvas.insert("defs").html("<linearGradient id='"+uniqueID+"grad" + i + "' x1='0%' y1='0%' x2='100%' y2='0%'>" +
        "<stop offset='0%' style='stop-color:rgb(" + col.r + "," + col.g + "," + col.b + ");stop-opacity:.7' />" +
        "<stop offset='100%' style='stop-color:rgb(" + col.r + "," + col.g + "," + col.b + ");stop-opacity:.7' />" +
        "</linearGradient>");
      return "url(#"+uniqueID+"grad" + i + ")"//'rgba('+col.r+', ' + col.g + ', ' + col.b  + ',.5)'
    })
    .attr("opacity", 0.5) //KEVIN ADDED THIS HERE FOR MOUSEOVER EFFECT
    .attr("count", function (d, i) { return d.count }) //KEVIN ADDED THIS ATTRIBUTE TO BE ABLE TO PRINT ON MOUSE HOVER

  let label = canvas.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "black")
    .text("")
  canvas.selectAll(".sankeyline"+uniqueID)
    .on("mouseover", function () {
      d3.select(this)
        .attr("opacity", 1)
      label.text("Count: " + d3.select(this).attr("count")).attr("x", d3.mouse(this)[0] + 5).attr("y", d3.mouse(this)[1] - 5)
    })
    .on("mouseout", function () {
      d3.select(this)
        .attr("opacity", 0.5)
      label.text("")
    })
    .on("mousemove", function () {
      label.attr("x", d3.mouse(this)[0] + 5).attr("y", d3.mouse(this)[1] - 5)
    })
}


function addFieldChart(data, canvas, x1, y1, x2, y2) {
  let p1 = { x: 100.0, y: 400.0 };
  let p2 = { x: 580.0, y: 400.0 };
  let pm = { x: 340.0, y: -80.0 };
  let p = .25;
  function toString(x, y) {
    return "" + x + " " + y + "";
  }

  canvas.append("path")
    .attr("d", " M " + toString(p1.x, p1.y) +
      " L " + toString(pm.x, pm.y) +
      " L " + toString(p2.x, p2.y) +
      " Z ")
    .attr("fill", "rgba(255,255,255,0)");

  function newPoint(iP, fP, p) {

    var x = (1.0 - p) * iP.x + p * fP.x;
    var y = (1.0 - p) * iP.y + p * fP.y;
    return { x: x, y: y };
  }

  // console.log("d", " M " + toString(p1.x, p1.y) +
    // " L " + toString(newPoint(p1, pm, p).x, newPoint(p1, pm, p).y) +
    // " L " + toString(newPoint(p2, pm, p).x, newPoint(p2, pm, p).y) +
    // " L " + toString(p2.x, p2.y) +
    // " Z ")
  canvas.append("path")
    .attr("d", " M " + toString(p1.x, p1.y) +
      " L " + toString(newPoint(p1, pm, p).x, newPoint(p1, pm, p).y) +
      " L " + toString(newPoint(p2, pm, p).x, newPoint(p2, pm, p).y) +
      " L " + toString(p2.x, p2.y) +
      " Z ")
    .attr("fill", "white");

  var pad = 2;
  var step = (p2.x - p1.x) / 12;

  for (var i = 1; i <= 12; i++) {
    var color = "green"
    if (i == 1 || i == 12) {
      color = "grey";
    }
    var tp1 = { x: p1.x + (i - 1) * step, y: p1.y };
    var tp2 = { x: p1.x + (i) * step, y: p1.y };
    canvas.append("path")
      .attr("d", " M " + toString(tp1.x + pad, tp1.y - 2 * pad) + //TODO: add padding within function calls, not to output
        " L " + toString(newPoint(tp1, pm, p).x + pad, newPoint(tp1, pm, p).y + 2 * pad) +
        " L " + toString(newPoint(tp2, pm, p).x - pad, newPoint(tp2, pm, p).y + 2 * pad) +
        " L " + toString(tp2.x - pad, tp2.y - 2 * pad) +
        " Z ")
      .attr("fill", color);
  }
  var count = 6;
  var base = newPoint(p1, pm, p).y + 2 * pad;
  var bottom = p1.y - 2 * pad;
  var stepsize = (bottom - base) / count;

  // [{start:10,end:15,type:"pass"},
  // {start:15,end:14,type:"run"},
  // {start:14,end:22,type:"run"},
  // {start:22,end:34,type:"pass"},
  // {start:34,end:40,type:"pass"}]
  var zeroYDS = newPoint(p1, p2, 1 / 12);
  var frankyYDS = newPoint(p1, p2, 11 / 12);
  for (var i = 0; i < count-1; i++) {
    var color = "blue";
    if (data[i].type == "run") {
      color = "red";
    }
    var b1 = newPoint(zeroYDS, frankyYDS, data[i].start / 100);
    var b2 = newPoint(zeroYDS, frankyYDS, data[i].end / 100);
    var tp1 = newPoint(b1, pm, (p - p * ((i + 1) / count)));
    var tp2 = newPoint(b1, pm, (p - p * ((i) / count)));
    var tp3 = newPoint(b2, pm, (p - p * ((i) / count)));
    var tp4 = newPoint(b2, pm, (p - p * ((i + 1) / count)));
    canvas.append("path")
      .attr("d", " M " + toString(tp1.x, tp1.y - pad) +
        " L " + toString(tp2.x, tp2.y + pad) +
        " L " + toString(tp3.x, tp3.y + pad) +
        " L " + toString(tp4.x, tp4.y - pad) +
        " Z ")
      .attr("fill", color);
  }


  //create white field background


}


function mouseon(shape, index) {
  shape.on("mouseover", function () {
    var s = d3.select("#parallel" + index);
    var new_op, new_st;
    if (s.attr("fill-opacity") == 1) {
      new_op = 1;
      new_st = 4;
    }
    else {
      new_op = 0.8;
      new_st = 2;
    }
    shape.transition().duration(200)
      .attr("fill-opacity", new_op)
      .attr("stroke", "maroon")
      .attr("stroke-width", new_st)
  });
}

function mouseoff(shape, index) {
  shape.on("mouseout", function () {
    var s = d3.select("#parallel" + index);
    var new_op, new_st;
    if (s.attr("fill-opacity") == 1) {
      new_op = 1;
      new_st = 3;
    }
    else {
      new_op = 0.6;
      new_st = 1;
    }
    shape.transition().duration(200)
      .attr("fill-opacity", new_op)
      .attr("stroke", "maroon")
      .attr("stroke-width", 1)
  });
}

function mouseclick(shape, index) {
  shape.on("mousedown", function () {
    var s = d3.select("#parallel" + index);
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

function addHeader(svg, data) {
  let label = svg.append("text")
    .attr("class", "rectLabel")
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "black")
    .text("")

  data.forEach(function (stat) {
      console.log(stat.Category);
  })

  function addTableInfo(canvas, w, h, text_size) {
    var wd = svg.attr("width")
    var coordinates = [[wd - w, 0], [wd - w * 2, 0], [wd - w, h], [wd - w * 2, h], [wd - w, h * 2], [wd - w * 2, h * 2], [wd - w, h * 3], [wd - w * 2, h * 3]]
    coordinates.forEach(function (coordinate, index) {
      let rec = canvas.append("rect")
        .attr("x", coordinate[0])
        .attr("y", coordinate[1])
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 2)

      if (coordinate[0] == wd - w) {
        let txt = canvas.append("text")
          .attr("x", coordinate[0] + text_size / 2)
          .attr("y", coordinate[1] + h / 2)
          .attr("fill", "red")
          .attr("stroke", "#00203FFF")
          .text(data[Math.floor(index/2)].Value)
          .attr("text-anchor", "left")
          .attr("font-size", text_size + "px")
      }
      else {
        let txt2 = canvas.append("text")
          .attr("x", coordinate[0] + text_size / 2)
          .attr("y", coordinate[1] + h / 2)
          .attr("fill", "red")
          .attr("stroke", "#00203FFF")
          .text(data[Math.floor(index/2)].Category)
          .attr("text-anchor", "left")
          .attr("font-size", text_size + "px")
      }
    })
  }

  function addLogo(canvas, radius) {
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
      .attr("stroke", "#00203FFF")
      .attr("text-anchor", "left")
      .style("font", "bold 20px sans-serif")
  }

  function addParallelograms(canvas, t, h, w, separation, rad) {
    var shapes_top = [];
    var shapes_bottom = [];
    let bottom = t + rad * 2;
    let xcur = rad * 2 + 20;

    var titles = ["Down", "Distance", "Field Zone", "Personnel", "Formation", "Play Type"];

    for (var i = 0; i < 6; i++) {
      if (i == 0) {
        shapes_top.push(canvas.append("path")
          .attr("d", "M " + (rad + 42) + " " + t + " A " + rad + " " + rad + " 0 0 1 " + xcur + " " + (h + t) + " L " + (xcur + w) + " " + (h + t) + " L " + (xcur + w - 20) + " " + t + " z")
          .attr("fill", "#FC766AFF")
          .attr("fill-opacity", 0.6)
          .attr("stroke", "maroon")
          .attr("stroke-width", 1)
          .attr("id", "parallel" + i))
        canvas.append("text")
          .attr("x", xcur + separation)
          .attr("y", (h + t + t) / 2)
          .attr("fill", "red")
          .attr("stroke", "#00203FFF")
          .text(titles[i])
          .attr("text-anchor", "left")
      }
      else {
        shapes_top.push(canvas.append("path")
          .attr("d", "M " + (xcur - 20) + " " + t + " L " + xcur + " " + (h + t) + " L " + (xcur + w) + " " + (h + t) + " L " + (xcur + w - 20) + " " + t + " z")
          .attr("fill", "#FC766AFF")
          .attr("fill-opacity", 0.6)
          .attr("stroke", "maroon")
          .attr("stroke-width", 1)
          .attr("id", "parallel" + i))
        canvas.append("text")
          .attr("x", xcur + separation)
          .attr("y", (h + t + t) / 2)
          .attr("fill", "red")
          .attr("stroke", "#00203FFF")
          .text(titles[i])
          .attr("text-anchor", "left")
      }
      xcur = xcur + w + separation;

    }
    xcur = rad * 2 + 20;
    for (i; i < 9; i++) {
      if (i == 6) {
        shapes_bottom.push(canvas.append("path")
          .attr("d", "M " + (rad + 42) + " " + bottom + " A " + rad + " " + rad + " 0 0 0 " + xcur + " " + (h + t + separation) + " L " + (xcur + w) + " " + (h + t + separation) + " L " + (xcur + w - 20) + " " + bottom + " z")
          .attr("fill", "#FC766AFF")
          .attr("fill-opacity", 0.6)
          .attr("stroke", "maroon")
          .attr("stroke-width", 1)
          .attr("id", "parallel" + i))
        canvas.append("text")
          .attr("x", xcur + separation)
          .attr("y", (bottom + (t + h + separation)) / 2)
          .attr("fill", "red")
          .attr("stroke", "#00203FFF")
          .text(1)
          .attr("text-anchor", "left")
      }
      else {
        shapes_bottom.push(canvas.append("path")
          .attr("d", "M " + (xcur - 20) + " " + bottom + " L " + xcur + " " + (h + t + separation) + " L " + (xcur + w) + " " + (h + t + separation) + " L " + (xcur + w - 20) + " " + bottom + " z")
          .attr("fill", "#FC766AFF")
          .attr("fill-opacity", 0.6)
          .attr("stroke", "maroon")
          .attr("stroke-width", 1)
          .attr("id", "parallel" + i))
        canvas.append("text")
          .attr("x", xcur + separation)
          .attr("y", (bottom + (t + h + separation)) / 2)
          .attr("fill", "red")
          .attr("stroke", "#00203FFF")
          .text(1)
          .attr("text-anchor", "left")
      }
      xcur = xcur + w + separation;
    }

    var shapes = shapes_top.concat(shapes_bottom);
    // console.log(shapes);
    shapes.forEach(mouseon);
    shapes.forEach(mouseoff);
    shapes.forEach(mouseclick);
  }

  addTableInfo(svg, 140, 35, 16);
  addLogo(svg, 50);
  var ht = 47;
  var wid = 100;
  var separation = 6;
  var tp = 10;
  var radius = 50;
  addParallelograms(svg, tp, ht, wid, separation, radius);
}
