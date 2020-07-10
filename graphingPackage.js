function convToRGB(i,hex){
  obj = d3.hsl(hex);
  rgb = obj.rgb();
  // console.log(rgb);
  return {id:i,r:rgb.r,g:rgb.g,b:rgb.b};
}
d3.selection.prototype.moveToFront = function() {
   return this.each(function(){
     this.parentNode.appendChild(this);
   });
 };

d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
      var firstChild = this.parentNode.firstChild;
      if (firstChild) {
          this.parentNode.insertBefore(this, firstChild);
      }
  });
};
function colorPallete(canvas){

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
var colors=[
            //Red below
            convToRGB(0,"#FC766AFF"),
            convToRGB(7,"#00203FFF"),
            convToRGB(1,"#EEA47FFF"),
            convToRGB(8,"#5B84B1FF"),
            convToRGB(2,"#D01C1FFF"),
            convToRGB(9,"#00A4CCFF"),
            convToRGB(10,"#0E7A0DFF"),
            convToRGB(4,"#DD4132FF"),
            convToRGB(11,"#97BC62FF"),
            convToRGB(5,"#990011FF"),


            // convToRGB(12,"#9CC3D5FF"),
            // convToRGB(13,"#333D79FF"),
            // convToRGB(14,"#00539CFF"),
            // convToRGB(15,"#4B878BFF"),
  ]

function generateColorString(color,alpha){
  return 'rgb('+ color.r +', ' + color.g + ', ' + color.b + ','+alpha+')'
}

function getColor(index){

    return colors[index];
}

function getColorSize(){
  return colors.length;
}

function addPieChart(data,uniqueID,canvas,x1,y1,x2,y2,colorDex){
  // canvas.append("rect")
  //   .attr("x",x1)
  //   .attr("y",y1)
  //   .attr("width",(x2)-(x1))
  //   .attr("height",y2-(y1))
  //   .attr("fill","red")
  //   .attr("stroke","black")

    var outDex = (colorDex+data.length)%getColorSize();
    var gap = 10;
    x2-=gap;
    x1+=gap;
    var datatotal = data.reduce(((accum,data)=>accum+data.val),0);

    var strokeWidth = 5;
    var diameter = Math.min(x2-x1,y2-y1);
    var radius = diameter/2;


    var cx = (x1+x2)/2;
    var cy = (y1+y2)/2;
    cy-=((y2-y1)/2 - radius);
    var currpointx = cx;
    var currpointy = cy - radius;
    var currtheta =  2*Math.PI * data[0].val/datatotal;
    var flag = "0";
    if(currtheta > Math.PI){
      flag = "1";
    }
    var nextpointx = cx + radius*Math.sin(currtheta);
    var nextpointy = cy - radius*Math.cos(currtheta);
    var colordex = colorDex;
    var color = getColor(colordex);
    colordex++;
    canvas.append("path")
      .attr("d", " M " + currpointx + " " + currpointy +
                 " A " + radius + " " + radius +" 0 "+flag+" "+1+ " " + nextpointx + " " + nextpointy +
                 " L " + (cx) + " " + (cy) + " Z")
      .attr("fill", generateColorString(color,1))
      .attr("stroke","#DDDDDD")
      .attr("class", "pie" + uniqueID)
      .attr("stroke-width",strokeWidth)
      .attr("val",data[0].val)
      .attr("cat",data[0].category)
      .attr("opacity",.9)
      .attr("rad",radius)
      .attr("cpx",currpointx)
      .attr("cpy",currpointy)
      .attr("flg",flag)
      .attr("npx",nextpointx)
      .attr("npy",nextpointy)
      .attr("centx",cx)
      .attr("centy",cy);
    console.log(radius)
    //console.log(cx,cy,diameter);
    // console.log("printing graph")
    for(var i = 1; i < data.length;i++){

      // console.log("proportion",data[i].val/datatotal)
      // console.log("first",currtheta);
      currpointx = nextpointx;
      currpointy = nextpointy;
      // console.log("currpoitns",currpointx,currpointy)
      //var temp = currtheta;
      currtheta += 2*Math.PI * data[i].val/datatotal;
      // console.log("second",currtheta);
      flag = "0";
      if(data[i].val/datatotal > .5){
        flag = "1";
      }
      nextpointx = cx + radius*Math.sin(currtheta);
      nextpointy = cy - radius*Math.cos(currtheta);
      // console.log(cx,radius,radius*Math.sin(currtheta))
      // console.log("points",currpointx,currpointy,nextpointx,nextpointy)
      colordex = colordex%getColorSize()
      color = getColor(colordex);
      colordex++;
      canvas.append("path")
        .attr("d", " M " + currpointx + " " + currpointy +
                   " A " + radius + " " + radius +" 0 "+flag+" "+1+ " " + nextpointx + " " + nextpointy +
                   " L " + (cx) + " " + (cy) + " Z")
        .attr("fill", generateColorString(color,1))
        .attr("stroke","#DDDDDD")
        .attr("class", "pie" + uniqueID)
        .attr("stroke-width",strokeWidth)
        .attr("val",data[i].val)
        .attr("cat",data[i].category)
        .attr("opacity",.9)
        .attr("rad",radius)
        .attr("cpx",currpointx)
        .attr("cpy",currpointy)
        .attr("flg",flag)
        .attr("npx",nextpointx)
        .attr("npy",nextpointy)
        .attr("centx",cx)
        .attr("centy",cy);
    }
    var centerrad = radius/2;
    canvas.append("circle")
      .attr("r",centerrad)
      .attr("cx",cx)
      .attr("cy",cy)
      .attr("fill","#DDDDDD")


    var maxWidth =  (x2+gap)-(x1-gap);
    var lx = x1-gap;
    var ly = y1+diameter;
    var line = 1;
    var linesize = 20;
    var pad = 2;
    var lineAccum = 0;
    var currItems = new Array();
    for(var i = 0; i < data.length;i++){
      colorDex = colorDex%getColorSize()
      color = getColor(colorDex);
      colorDex++;
      var lrect = canvas.append("rect")
        .attr("x",lx+lineAccum+pad)
        .attr("y",ly+linesize*(line-1) + pad)
        .attr("width",linesize-2*pad)
        .attr("height",linesize-2*pad)
        .attr("fill",generateColorString(color,1));





      var text = canvas.append("text")
                    .attr("text-anchor","start")
                    .attr("alignment-baseline","middle")
                    .attr("fill","black")
                    .attr("font-size","15px")
                    .text(data[i].category)
      var textWidth = text.node().getBBox().width;
      if(linesize+textWidth + 2*pad> maxWidth){
        //TODO:handle content spillover
      }
      else if(lineAccum + linesize+textWidth+2*pad > maxWidth){
        //handle wrap
        //VVVVV bounding box for centered items
        // canvas.append("rect")
        //   .attr("x",lx+ (maxWidth-lineAccum)/2)
        //   .attr("y",ly+linesize*(line-1))
        //   .attr("width",lineAccum)
        //   .attr("height",linesize)
        //   .attr("stroke","black").moveToBack();
        for(var j = 0; j < currItems.length;j++){
           var xDelta = parseFloat(currItems[j].attr("x"));
           currItems[j].attr("x",xDelta+(maxWidth-lineAccum)/2);
        }
        console.log(currItems);
        currItems = new Array();
        line++;
        lineAccum=0;
        lrect.attr("x",lx+lineAccum+pad)
            .attr("y",ly+linesize*(line-1) + pad)
        text.attr("x",lx+lineAccum + linesize + pad)
            .attr("y",ly+linesize*(line-.5));
        lineAccum = linesize+2*pad+textWidth;
        currItems.push(text);
        currItems.push(lrect);

      }
      else{
        //handle normal text placement
        text.attr("x",lx+lineAccum + linesize + pad)
            .attr("y",ly+linesize*(line-.5));
        lineAccum += linesize+2*pad+textWidth;
        currItems.push(text);
        currItems.push(lrect);
      }
      // console.log(text.node().getBBox())
    }
    if(currItems.length > 0){
      console.log(currItems);
      // canvas.append("rect")
      //   .attr("x",lx+ (maxWidth-lineAccum)/2)
      //   .attr("y",ly+linesize*(line-1))
      //   .attr("width",lineAccum)
      //   .attr("height",linesize)
      //   .attr("stroke","black").moveToBack();
      for(var i = 0; i < currItems.length;i++){
         var xDelta = parseFloat(currItems[i].attr("x"));
         currItems[i].attr("x",xDelta+(maxWidth-lineAccum)/2);
      }
    }

    console.log(y2-(y1+diameter) + 40);

    let rect = canvas.append("rect").attr("x",0)
                                    .attr("y",0)
                                    .attr("width",0)
                                    .attr("height",0)
                                    .attr("fill","rgba(255,255,255,1)")
    let rwidth = 130;
    let rheight = 30;
    let label = canvas.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "black")
      .text("")
    let label2 = canvas.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "black")
      .text("")
    var mgap = 3;
    var adjust = 0;

    canvas.selectAll(".pie" + uniqueID)
        .on("mouseover", function () {
          var arc = d3.select(this);
          var rads = parseFloat(arc.attr("rad")) + 30;
          arc
            .attr("opacity", 1)
            //TODO: hover over making slice bigger
            .transition().duration(200)
            // .attr("d", " M " + arc.attr("cpx") + " " + arc.attr("cpy") +
            //            " A " + rads + " " + rads +" 0 "+arc.attr("flg")+" "+1+ " " + arc.attr("npx") + " " + arc.attr("npy") +
            //            " L " + (arc.attr("centx")) + " " + (arc.attr("centy")) + " Z");
          // console.log(" M " + arc.attr("cpx") + " " + arc.attr("cpy") +
          //            " A " + (arc.attr("rad")+0) + " " + (arc.attr("rad")+0) +" 0 "+arc.attr("flg")+" "+1+ " " + arc.attr("npx") + " " + arc.attr("npy") +
          //            " L " + (arc.attr("centx")) + " " + (arc.attr("centy")) + " Z");
          label.text("Count: " + d3.select(this).attr("val")).attr("x", (d3.mouse(this)[0] + 5)-adjust).attr("y", (d3.mouse(this)[1] - 5));
          label2.text("Name: " + d3.select(this).attr("cat")).attr("x", (d3.mouse(this)[0] + 5)-adjust).attr("y", (d3.mouse(this)[1] - 20));
          rwidth = label2.node().getBBox().width + 5;
          rect.attr("x",d3.mouse(this)[0]+mgap-adjust)
              .attr("y",d3.mouse(this)[1]-rheight-mgap)
              .attr("width",rwidth)
              .attr("height",rheight)
              .attr("fill","rgba(255,255,255,.9)");
          rect.moveToFront();
          label.moveToFront();
          label2.moveToFront();
        })
        .on("mouseout", function () {
          d3.select(this)
            .attr("opacity", 0.9)
          label.text("")
          label2.text("")
          rect.attr("x",d3.mouse(this)[0])
              .attr("y",d3.mouse(this)[1]-rheight)
              .attr("width",0)
              .attr("height",0)
              .attr("fill","rgba(255,255,255,0)")
        })
        .on("mousemove", function () {
          if(d3.mouse(this)[0]+mgap + rwidth > fixedWidth){
            adjust = rwidth;
          }
          else{
            adjust = 0;
          }
          label2.attr("x", (d3.mouse(this)[0] + 5)-adjust).attr("y", (d3.mouse(this)[1] - 20 ))
          label.attr("x", (d3.mouse(this)[0] + 5 )-adjust).attr("y", (d3.mouse(this)[1] - 5 ))
          rect.attr("x",d3.mouse(this)[0]+mgap-adjust)
              .attr("y",d3.mouse(this)[1]-rheight-mgap)
              .attr("width",rwidth)
              .attr("height",rheight)
              .attr("fill","rgba(255,255,255,.9)")

        });
    return outDex;
}

// function addPieChart(canvas, percent1, percent2, cx, cy, radius, thickness) {
//   //method signature: data, uniqueID, canvas, x1, y1, x2, y2,colorDex
//   let dashArrayString = (Math.PI * 2 * radius) * percent1 + " " + (Math.PI * 2 * radius) * percent2
//   let circle1 = canvas.append("circle")
//     .attr("r", radius)
//     .attr("cx", cx)
//     .attr("cy", cy)
//     .attr("fill", "transparent")
//     .attr("stroke", "red")
//     .attr("stroke-width", thickness)
//     .attr("percentNum", percent2);
//   let circle2 = canvas.append("circle")
//     .attr("r", radius)
//     .attr("cx", cx)
//     .attr("cy", cy)
//     .attr("fill", "transparent")
//     .attr("stroke", "rgb(0,0,255)")
//     .attr("stroke-width", thickness)
//     .attr("stroke-dasharray", dashArrayString)
//     .attr("percentNum", percent1);
//
//   circle1.on("mouseover", function () {
//     let label = canvas.select("text.pieLabel");
//     label.text(Math.round(circle1.attr("percentNum") * 100) + "%").attr("x", 100).attr("y", 100).attr("text-anchor", "left");
//
//     let dashArrayString2 = (Math.PI * 2 * (radius + 30)) * (circle2.attr("percentNum")) + " " + (Math.PI * 2 * (radius + 30)) * (circle1.attr("percentNum"))
//     circle1.transition().duration(200)
//       .attr("r", (radius + 30))
//     circle2.transition().duration(200)
//       .attr("r", (radius + 30))
//       .attr("stroke-dasharray", dashArrayString2)
//   });
//   circle1.on("mouseout", function () {
//     let label = canvas.select("text.pieLabel");
//     label.text("");
//
//     circle1.transition().duration(200)
//       .attr("r", (radius))
//     circle2.transition().duration(200)
//       .attr("r", (radius))
//       .attr("stroke-dasharray", dashArrayString)
//   });
//
//   circle2.on("mouseover", function () {
//     let label = canvas.select("text.pieLabel");
//     label.text(Math.round(circle2.attr("percentNum") * 100).toString() + "%").attr("x", 100).attr("y", 100).attr("text-anchor", "left");
//
//     let dashArrayString2 = (Math.PI * 2 * (radius + 30)) * (circle2.attr("percentNum")) + " " + (Math.PI * 2 * (radius + 30)) * (circle1.attr("percentNum"))
//     circle1.transition().duration(200)
//       .attr("r", (radius + 30))
//     circle2.transition().duration(200)
//       .attr("r", (radius + 30))
//       .attr("stroke-dasharray", dashArrayString2)
//   });
//   circle2.on("mouseout", function () {
//     let label = canvas.select("text.pieLabel");
//     label.text("");
//
//     circle1.transition().duration(200)
//       .attr("r", (radius))
//     circle2.transition().duration(200)
//       .attr("r", (radius))
//       .attr("stroke-dasharray", dashArrayString)
//   });
// }

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

function addBarGraph(data, uniqueID, canvas, x1, y1, x2, y2,colorDex) {
    x1 = x1+5;
    x2 = x2-5
  var outDex = (colorDex+data.length)%getColorSize();
  var minCount = data[0].val;
  var totalCount = 0;
  var accumHeight = y2-y1;
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
  for (i = 0; i < data.length; i++) {
      if(data[i].val < minCount){
          minCount = data[i].val;
      }
      totalCount+=data[i].val;
  }
  // console.log("mincount here")
  // console.log(minCount);
  // console.log("totalCount here")
  // console.log(totalCount);
  var barHeight = ((y2-y1)*(minCount/totalCount));
  var vert_scale = (y2 - y1) / totalCount;

  const margin2 = { top: 0, bottom: 0, left: 0, right: 0 };
  var max = d3.max(data.map(d => d.val));
  var min = d3.min(data.map(d => d.val));

  y = d3.scaleBand().rangeRound([y2 - y1, 0]).padding(0);
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
    .attr("class", "bar" + uniqueID + " hover"+uniqueID)
    .attr("opacity", 0.9)
    .attr("fill", function (d, i) {

      colorDex = colorDex%getColorSize();
      var color = getColor((colorDex+data.length-1)%getColorSize());
      // console.log(color);
      // console.log(colorDex+data.length-1);
      colorDex--;
      return generateColorString(color,1)
    })
    .attr("x", 0)
    .attr("y", function(d,i){
        var temp = accumHeight - ((barHeight*d.val)/2)-barHeight/2
        accumHeight = accumHeight - (barHeight*d.val)
        return temp;
    })
    .attr("height", function(d,i){
        return barHeight;
    })
    .attr("count",d => d.val)
    .transition()
    .duration(1000)
    .delay(function (d, i) {
      return data.length*500 - i * 500;
    })
    .attr("name", d => d.category)
    .attr("width", d => x(d.val))



  // canvas.selectAll(".circle" + uniqueID)
  //   .data(data)
  //   .enter().append("circle")
  //   .attr("transform", "translate(" + (margin2.left + x1) + "," + (margin2.top + y1) + ")")
  //   .attr("class", function (d, i) {
  //     return "circle" + uniqueID + "exit" + i
  //   })
  //   .attr("fill", "None")
  //   .attr("cx", d => x(d.val) + 10)
  //   .attr("cy", d => y(d.category) + y.bandwidth() / 2)
  //   .attr("r", 5)
  //
  // canvas.selectAll(".circle" + uniqueID)
  //   .data(data)
  //   .enter().append("circle")
  //   .attr("transform", "translate(" + (margin2.left + x1) + "," + (margin2.top + y1) + ")")
  //   .attr("class", function (d, i) {
  //     return "circle" + uniqueID + "enter" + i
  //   })
  //   .attr("fill", "None")
  //   .attr("cx", d => -10)
  //   .attr("cy", d => y(d.category) + y.bandwidth() / 2)
  //   .attr("r", 5)

    var accumHeight = y2-y1;;
    var temp = 0;
    for(let i = 0; i < data.length; i++){
        var bText = canvas.append("text")
          .text(data[i].category)
          .attr("class","bar-graph-text hover"+uniqueID)
          .attr("fill","black")
          .attr("count",data[i].val)
          .attr("name",data[i].category)
          .style("cursor","default")
          // .attr("baseline-alignmnet","middle")
          // .attr("stroke","#FFFFFF")
          .style("font-size",15)
          .style("font-weight","bold")
          .attr("stroke-width",1)
       // var tWidth = bText.node().getBBox().width;
       // bText.attr("x",x2-tWidth)
       //      .attr("y",y1+accumHeight-barHeight/2)
          // .attr("transform",function(){
          //     temp = accumHeight - ((barHeight*data[i].val)/2)-barHeight/2
          //     accumHeight = accumHeight - (barHeight*data[i].val)
          //     return "translate("+x2+","+((y1+temp)+barHeight/2+5)+")"
          // })
        temp = accumHeight - ((barHeight*data[i].val)/2)-barHeight/2
        accumHeight = accumHeight - (barHeight*data[i].val)
        bText.attr("x",x2)
        bText.attr("y",(y1+temp)+barHeight/2+5)
        // canvas.append("circle")
        //   .attr("r",4)
        //   .attr("cx",x2)
        //   .attr("cy",(y1+temp)+barHeight/2+5)
        //   .attr("fill","#000000")
          //return "translate("+x2+","+((y1+temp)+barHeight/2+5)+")"
    }
    canvas.append("text")
      .text("Count")
      .attr("class","bar-graph-text2")
      .attr("stroke","black")
      .attr("stroke-width",0.2)
      .attr("transform","translate("+((x1+x2)/2)+","+(y2+40)+")")
    var yHeight = "";
    var xHeight = "";
    canvas.append("text")
      .text(function(){
          if(uniqueID==0){
              return "Personnel"
          }
          else if(uniqueID==1){
              return "Formation"
          }
          else{
              return "Play Type"
          }
      })
      .attr("class","bar-graph-title")
      .attr("stroke","black")
      .attr("stroke-width",0.2)
      .attr("transform","translate("+((x1+x2)/2)+","+(y1-10)+")")

      let rect = canvas.append("rect").attr("x",0)
                                      .attr("y",0)
                                      .attr("width",0)
                                      .attr("height",0)
                                      .attr("fill","rgba(255,255,255,1)")
      let rwidth = 130;
      let rheight = 30;
      let label = canvas.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "black")
        .text("")
      let label2 = canvas.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "black")
        .text("")
      var mgap = 3;
      var adjust = 0;
      canvas.selectAll(".bar" + uniqueID)//TODO: make hover over text to (change class from bar to hover and fix bugs)
          .on("mouseover", function () {
            d3.select(this)
              .attr("opacity", 1)
            label.text("Count: " + d3.select(this).attr("count")).attr("x", (d3.mouse(this)[0] + 5+x1)-adjust).attr("y", (d3.mouse(this)[1] - 5+y1))
            label2.text("Name: " + d3.select(this).attr("name")).attr("x", (d3.mouse(this)[0] + 5+x1)-adjust).attr("y", (d3.mouse(this)[1] - 20+y1))
            rwidth = label2.node().getBBox().width + 5;
            rect.attr("x",d3.mouse(this)[0]+x1+mgap - adjust)
                .attr("y",d3.mouse(this)[1]-rheight+y1-mgap)
                .attr("width",rwidth)
                .attr("height",rheight)
                .attr("fill","rgba(255,255,255,.9)")
                rect.moveToFront();
                label.moveToFront();
                label2.moveToFront();
          })
          .on("mouseout", function () {
            d3.select(this)
              .attr("opacity", 0.9)
            label.text("")
            label2.text("")
            rect.attr("x",d3.mouse(this)[0]+x1)
                .attr("y",d3.mouse(this)[1]-rheight+y1)
                .attr("width",0)
                .attr("height",0)
                .attr("fill","rgba(255,255,255,0)")
          })
          .on("mousemove", function () {
            if(d3.mouse(this)[0]+mgap + rwidth +x1> fixedWidth){
              adjust = rwidth;
            }
            else{
              adjust = 0;
            }
            console.log(d3.mouse(this),rheight,y1,mgap);
            label2.attr("x", (d3.mouse(this)[0] + 5 + x1)-adjust).attr("y", (d3.mouse(this)[1] - 20 + y1))
            label.attr("x", (d3.mouse(this)[0] + 5 + x1)-adjust).attr("y", (d3.mouse(this)[1] - 5 + y1))
            rect.attr("x",d3.mouse(this)[0]+x1+mgap-adjust)
                .attr("y",d3.mouse(this)[1]-rheight+y1-mgap)
                .attr("width",rwidth)
                .attr("height",rheight)
                .attr("fill","rgba(255,255,255,.9)")
          });
    return outDex;

};


function addSankey(uniqueID,data, canvas, pad,x1, y1, x2, y2,barflag,colorDex1,colorDex2) {

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
  // var colors=[convToRGB("#00203FFF"),
  //             //convToRGB("#ADEFD1FF"),
  //             convToRGB("#FC766AFF"),
  //             convToRGB("#5B84B1FF"),
  //             convToRGB("#00A4CCFF"),
  //             convToRGB("#ED2B33FF"),
  //             convToRGB("#0E7A0D"),
  //             convToRGB("#97BC62FF"),
  //             convToRGB("#00539CFF"),
  //             convToRGB("#EEA47FFF")
  //           ];
  // var color_start = Math.floor(Math.random() * (colors.length));


  // console.log(colors);
  var inTotals = {};
  var outTotals = {};
  var total = 0;
  var val = data[0].in;
  for (var i = 0; i < data.length; i++) {
    if (data[i].in != val) {
      val = data[i].in;
      colorDex1++;
      colorDex1 = colorDex1 % getColorSize();
    }
    data[i].color = getColor(colorDex1);
    // console.log(color_start)
    // console.log(data[i].color)
    if(data[i].in in inTotals){
      // console.log("second",data[i])
      inTotals[data[i].in] += data[i].count;
    }
    else{
      // console.log("first",data[i])
      inTotals[data[i].in] = data[i].count;
    }

    if(data[i].out in outTotals){
      // console.log("second",data[i])
      outTotals[data[i].out] += data[i].count;
    }
    else{
      // console.log("first",data[i])
      outTotals[data[i].out] = data[i].count;
    }



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
    //populates datas intotals
    data[i].intotal = inTotals[data[i].in];
    data[i].outtotal = outTotals[data[i].out];
    //populates end calculation
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

  // console.log(data)
  // for(var i = 0;i<data.length;i++){
  //   console.log(data[i])
  // }
  //==second set of bars=================================================================
  var first = data[0].out;
  var vertstroke = 1;//in pixels
  var start = data[0].end;
  var end = data[0].count + start;
  var color = getColor(colorDex2);
  data[0].end_color = color;
  if(barflag){
    for (var i = 1; i < data.length; i++) {
      // console.log(data[i])
      // console.log(i)
      // console.log(first);
      // console.log(data[i].out);
      // console.log("----------");
      if (data[i].out != first) {
        // console.log("gottem")
        canvas.append("path")
          .attr("class","sankeyrect"+uniqueID)
          .attr("count",data[i].outtotal)
          .attr("val",data[i-1].out)
          .attr("d", " M " + toString(x2 , y1 + (start * vert_scale) -vertstroke) +
                     " H " + (x2 - 20) +
                     " V " + (y1 + (end * vert_scale) + vertstroke) +
                     " H " + x2)
          .attr("fill", "rgb(" + color.r + "," + color.g + "," + color.b + ")")
        colorDex2 = (colorDex2 + 1) % getColorSize();
        first = data[i].out;
        start = data[i].end;
        end = data[i].count + start;
        color = getColor(colorDex2);
        data[i].end_color = color;
      }
      else {
        data[i].end_color = color;
        end = data[i].end + data[i].count;
      }
    }
    end = data[data.length - 1].end + data[data.length - 1].count;
    data[data.length - 1].end_color = color;
    // console.log(data[data.length-1])
    canvas.append("path")
      .attr("class","sankeyrect"+uniqueID)
      .attr("count",data[data.length-1].outtotal)
      .attr("val",data[data.length-1].out)
      .attr("d", " M " + toString(x2, y1 + start * vert_scale -vertstroke) +
        " H " + (x2 - 20) +
        " V " + (y1 + end * vert_scale + vertstroke) +
        " H " + (x2))
      .attr("fill", "rgb(" + color.r + "," + color.g + "," + color.b + ")");
  }
  // console.log("===================")
  //=========================================================================

  //reorder for aesthetic
  for (var i = 0; i < data.length - 1; i++) {
    for (var j = 0; j < data.length - 1; j++) {
      if (data[j].id > data[j + 1].id) {
        //swap!
        var temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }

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
        .attr("class","sankeyrect"+uniqueID)
        .attr("count",data[i].intotal)
        .attr("val",data[i].in)
        .attr("d", " M " + toString(x1, y1 + data[i].start * vert_scale - vertstroke) +
          " H " + (x1 + 20) +
          " V " + (y1 + data[i].start*vert_scale + data[i].count * vert_scale + vertstroke) +
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
      //console.log(d)
      var col = d.color;
      var ecol = d.end_color;
      canvas.insert("defs").html("<linearGradient id='"+uniqueID+"grad" + i + "' x1='0%' y1='0%' x2='100%' y2='0%'>" +
        "<stop offset='0%' style='stop-color:rgb(" + col.r + "," + col.g + "," + col.b + ");stop-opacity:1' />" +
        "<stop offset='100%' style='stop-color:rgb(" + col.r + "," + col.g + "," + col.b + ");stop-opacity:1' />" +
        "</linearGradient>");
      return "url(#"+uniqueID+"grad" + i + ")"//'rgba('+col.r+', ' + col.g + ', ' + col.b  + ',.5)'
    })
    .attr("opacity", 0.0) //KEVIN ADDED THIS HERE FOR MOUSEOVER EFFECT
    .attr("count", function (d, i) { return d.count }) //KEVIN ADDED THIS ATTRIBUTE TO BE ABLE TO PRINT ON MOUSE HOVER
    .transition()
    .duration(1000)
    .delay(function (d, i) {
      //console.log(d)
      return i * 300;
    })
    .attr("opacity",0.5)
    //fade in sankey bars^^^^^
    //COMPLETE: show jean animation and ask for decision
    //wipe in sankey barsvvvv
    // x1-=(20+gap)
    // var panel = convToRGB("#FFFFFF")
    // // obj = d3.hsl(hex);
    // // rgb = obj.rgb();
    // console.log(panel)
    // canvas.append("path")
    //   .attr("d", " M " + toString(x1+20, y1) +
    //     " H " + (x2-20) +
    //     " V " + (y2+2) +
    //     " H " + (x1+20))
    //   .attr("fill", d3.hsl("#DDDDDD"))
    //   .transition()
    //   .duration(1500)
    //   .delay(500)
    //   .attr("d", " M " + toString(x2-20, y1) +
    //     " H " + (x2-20) +
    //     " V " + (y2+2) +
    //     " H " + (x2-20))


    let rect = canvas.append("rect").attr("x",0)
                                    .attr("y",0)
                                    .attr("width",0)
                                    .attr("height",0)
                                    .attr("fill","rgba(255,255,255,1)")
    let rwidth = 130;
    let rheight = 30;
    var adjust = 0;
    var mgap = 3;
    let label = canvas.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "black")
      .text("")
    let label2 = canvas.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "black")
      .text("")
    canvas.selectAll(".sankeyline"+uniqueID)
        .on("mouseover", function () {
          d3.select(this)
            .attr("opacity", 1)
          label.text("Count: " + d3.select(this).attr("count")).attr("x", (d3.mouse(this)[0] + 5+x1-adjust)).attr("y", (d3.mouse(this)[1] - 20+y1))
          rwidth = label.node().getBBox().width + 5;
          rect.attr("x",d3.mouse(this)[0]+x1+mgap-adjust)
              .attr("y",d3.mouse(this)[1]-.5*rheight+y1-mgap)
              .attr("width",rwidth)
              .attr("height",rheight/2)
              .attr("fill","rgba(255,255,255,.9)")
              rect.moveToFront();
              label.moveToFront();
              label2.moveToFront();
        })
        .on("mouseout", function () {
          d3.select(this)
            .attr("opacity", 0.5)
          label.text("")
          rect.attr("x",d3.mouse(this)[0]+x1)
              .attr("y",d3.mouse(this)[1]+y1)
              .attr("width",0)
              .attr("height",0)
              .attr("fill","rgba(255,255,255,0)")
        })
        .on("mousemove", function () {
          if(d3.mouse(this)[0]+mgap + rwidth > fixedWidth-5){
            adjust = rwidth;
          }
          else{
            adjust = 0;
          }
          label.attr("x", (d3.mouse(this)[0] + 5)-adjust).attr("y", (d3.mouse(this)[1] - 5 ))
          rect.attr("x",d3.mouse(this)[0]+mgap-adjust)
              .attr("y",d3.mouse(this)[1]-.5*rheight-mgap)
              .attr("width",rwidth)
              .attr("height",rheight/2)
              .attr("fill","rgba(255,255,255,.9)")
        });


        canvas.selectAll(".sankeyrect"+uniqueID)
            .on("mouseover", function () {
              label.text("Count: " + d3.select(this).attr("count")).attr("x", (d3.mouse(this)[0] + 5+x1)-adjust).attr("y", (d3.mouse(this)[1] - 5+y1))
              label2.text("Name: "+ d3.select(this).attr("val")).attr("x", (d3.mouse(this)[0] + 5+x1)-adjust).attr("y", (d3.mouse(this)[1] - 20+y1))
              rwidth = label2.node().getBBox().width + 5;
              rect.attr("x",d3.mouse(this)[0]+x1+mgap-adjust)
                  .attr("y",d3.mouse(this)[1]-rheight+y1-mgap)
                  .attr("width",rwidth)
                  .attr("height",rheight)
                  .attr("fill","rgba(255,255,255,.9)")
              rect.moveToFront();
              label.moveToFront();
              label2.moveToFront();
            })
            .on("mouseout", function () {
              label.text("")
              label2.text("")
              rect.attr("x",d3.mouse(this)[0])
                  .attr("y",d3.mouse(this)[1]-rheight)
                  .attr("width",0)
                  .attr("height",0)
                  .attr("fill","rgba(255,255,255,0)")
            })
            .on("mousemove", function () {
              if(d3.mouse(this)[0]+mgap + rwidth > fixedWidth){
                adjust = rwidth;
              }
              else{
                adjust = 0;
              }
              label2.attr("x", (d3.mouse(this)[0] + 5)-adjust).attr("y", (d3.mouse(this)[1] - 20))
              label.attr("x", (d3.mouse(this)[0] + 5)-adjust).attr("y", (d3.mouse(this)[1] - 5))
              rect.attr("x",d3.mouse(this)[0]+mgap-adjust)
                  .attr("y",d3.mouse(this)[1]-rheight-mgap)
                  .attr("width",rwidth)
                  .attr("height",rheight)
                  .attr("fill","rgba(255,255,255,.9)")
            });

  // let label = canvas.append("text")
  //   .attr("x", 0)
  //   .attr("y", 0)
  //   .attr("fill", "black")
  //   .text("")
  // canvas.selectAll(".sankeyline"+uniqueID)
  //   .on("mouseover", function () {
  //     d3.select(this)
  //       .attr("opacity", 1)
  //     label.text("Count: " + d3.select(this).attr("count")).attr("x", d3.mouse(this)[0] + 5).attr("y", d3.mouse(this)[1] - 5)
  //   })
  //   .on("mouseout", function () {
  //     d3.select(this)
  //       .attr("opacity", 0.5)
  //     label.text("")
  //   })
  //   .on("mousemove", function () {
  //     label.attr("x", d3.mouse(this)[0] + 5).attr("y", d3.mouse(this)[1] - 5)
  //   })
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
      .attr("d", " M " + toString(tp1.x + pad, tp1.y - 2 * pad) + //COMPLETE: add padding within function calls, not to output
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
  var frankyYDS = newPoint(p1, p2, getColorSize() / 12);
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
    var s = d3.select(this);
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
    var s = d3.select(this);
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
    var s = d3.select(this);
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

function addHeader(svg, data,metadata) {
  let label = svg.append("text")
    .attr("class", "rectLabel")
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "black")
    .text("")

  // data.forEach(function (stat) {
  //     console.log(stat.Category);
  // })

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
          .attr("fill", "#00203FFF")
          .attr("stroke", "#00203FFF")
          .text(data[Math.floor(index/2)].Value)
          .attr("text-anchor", "left")
          .attr("font-size", text_size + "px")
      }
      else {
        let txt2 = canvas.append("text")
          .attr("x", coordinate[0] + text_size / 2)
          .attr("y", coordinate[1] + h / 2)
          .attr("fill", "#00203FFF")
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
      .attr("class","logos")
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
    var titles = [metadata.Down, metadata.DistSit, metadata.FieldZone, "Personnel", "Formation", "Play Type"];

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
          .attr("fill", "#00203FFF")
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
          .attr("fill", "#00203FFF")
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
          .attr("fill", "#00203FFF")
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
          .attr("fill", "#00203FFF")
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

async function generateScorecards(filename, filter){
       const data = await d3.json(filename);
       // console.log(data);
       console.log(data);
       var sortedData = tieredSort(data,filter);

       var svg;
       var sep;
       var numCharts = 5;
       var startDex1;
       var startDex2;
       var currX = 10;
       d3.select("#mainDiv").selectAll('.scorecardContainer').remove()
       if(!(d3.select("#sankey1").property("checked"))){
           numCharts = numCharts-1
       }
       if(!(d3.select("#sankey2").property("checked"))){
           numCharts = numCharts-1
       }
       if((d3.select("#graph1").text()=='None')){
           numCharts = numCharts-1
       }
       if((d3.select("#graph2").text()=='None')){
           numCharts = numCharts-1
       }
       if((d3.select("#graph3").text()=='None')){
           numCharts = numCharts-1
       }
       sep = (fixedWidth-30)/numCharts;
       for(let i = 0; i < sortedData.length; i++){
           var startDex1 = 0;
           currX = 10;
           d3.select("#mainDiv").append("div")
               .attr("class","row wrapper-div drop scorecardContainer")
               .style("height",fixedHeight)
               .style("width",fixedWidth)
               .style("margin-top","100px")
               .attr("id","div" + i)
           d3.select("#div"+i)
               .append("svg")
                   .attr("width",fixedWidth)
                   .attr("height",fixedHeight)
                   .attr("class","scorecard centered-basic")
                   .attr("id","scoreCard"+i)

           svg = d3.select(("#scoreCard"+i));


           //TODO DESIGN CHOICE: should the graphs on first load say graph 1 or bargraph
           if((d3.select("#graph1").text()=='Bar Graph') || (d3.select("#graph1").text()=='Graph 1')){
               //startDex1 = addPieChart(data.scorecards[i].datasets[0],0,svg,currX,svg.attr("height")*0.40,(currX+sep), svg.attr("height")*0.90,0);
               startDex1 = addBarGraph(sortedData[i].datasets[0], 0, svg, currX, svg.attr("height")*0.40, (currX+sep), svg.attr("height")*0.90,0);
               currX = currX+sep;
           }
           else if(d3.select("#graph1").text()=='Pie Chart'){
             startDex1 = addPieChart(sortedData[i].datasets[0], 0, svg, currX, svg.attr("height")*0.40, (currX+sep), svg.attr("height")*0.90,0);
             currX = currX+sep;
           }
           if(d3.select("#sankey1").property("checked")){
               addSankey(""+i+"_"+1, sortedData[i].datasets[3], svg, 2, currX , svg.attr("height")*0.40, (currX+sep), svg.attr("height")*0.90,true,0,startDex1);
               currX = currX+sep
           }
           if((d3.select("#graph2").text()=='Bar Graph') || (d3.select("#graph2").text()=='Graph 2')){//if(!(d3.select("#graph2").text()=='None')){
               startDex2 = addBarGraph(sortedData[i].datasets[1], 1, svg, currX, svg.attr("height")*0.40, (currX+sep), svg.attr("height")*0.90,startDex1);
               currX = currX+sep
           }
           else if(d3.select("#graph2").text()=='Pie Chart'){
             startDex2 = addPieChart(sortedData[i].datasets[1], 1, svg, currX, svg.attr("height")*0.40, (currX+sep), svg.attr("height")*0.90,startDex1);
             currX = currX+sep;
           }
           if(d3.select("#sankey2").property("checked")){
               addSankey(""+i+"_"+2, sortedData[i].datasets[4], svg, 2, currX , svg.attr("height")*0.40, (currX+sep), svg.attr("height")*0.90,true,startDex1,startDex2);
               currX = currX+sep
           }
           if((d3.select("#graph3").text()=='Bar Graph') || (d3.select("#graph3").text()=='Graph 3')){//if(!(d3.select("#graph3").text()=='None')){
               addBarGraph(sortedData[i].datasets[2], 2, svg, currX, svg.attr("height")*0.40, (currX+sep), svg.attr("height")*0.90,startDex2);

           }
           else if(d3.select("#graph3").text()=='Pie Chart'){
             addPieChart(sortedData[i].datasets[2], 2, svg, currX, svg.attr("height")*0.40, (currX+sep), svg.attr("height")*0.90,startDex2);
           }
           //addSankey(1, data.scorecards[i].datasets[3], svg, 2, 10 + sep , svg.attr("height")*0.40, 10+sep*2, svg.attr("height")*0.90,true,0,startDex1);
           //addSankey(2, data.scorecards[i].datasets[4], svg, 2, 10 + sep*3 , svg.attr("height")*0.40, 10+sep*4, svg.attr("height")*0.90,true,startDex1,startDex2);
           var meta = {
             "Down":sortedData[i]["Down"],
             "DistSit":sortedData[i]["DistSit"],
             "FieldZone":sortedData[i]["FieldZone"]
           }
           console.log(meta);
           addHeader(svg, sortedData[i].datasets[5],meta);
       }
}
function emptyScoreCards(svg){
    d3.select("#mainDiv").selectAll('.scorecardContainer').remove();
}
function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v;
        },
        function(e) {
            isRejected = true;
            isPending = false;
            throw e;
        }
    );

    result.isFulfilled = function() { return isFulfilled; };
    result.isPending = function() { return isPending; };
    result.isRejected = function() { return isRejected; };
    return result;
}
