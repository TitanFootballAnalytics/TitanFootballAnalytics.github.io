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

    canvas.selectAll(".circle" + uniqueID)
        .data(data)
        .enter().append("circle")
        .attr("transform","translate("+(margin2.left+x1)+","+(margin2.top+y1)+")")
        .attr("class", function (d, i) {
            return "circle" + uniqueID + "exit" + i
        })
        .attr("fill", "blue")
        .attr("cx", d => x(d.val)+10)
        .attr("cy", d => y(d.category)+y.bandwidth()/2)
        .attr("r", 5)

    canvas.selectAll(".circle" + uniqueID)
        .data(data)
        .enter().append("circle")
        .attr("transform","translate("+(margin2.left+x1)+","+(margin2.top+y1)+")")
        .attr("class", function (d, i) {
            return "circle" + uniqueID + "enter" + i
        })
        .attr("fill", "green")
        .attr("cx", d => -10)
        .attr("cy", d => y(d.category)+y.bandwidth()/2)
        .attr("r", 5)
};


function addSankey(data, canvas, x1, y1, x2, y2){
    x1 = 100;
    y1 = 100;
    x2 = 400;
    y2 = 400;
    // const margin2 = {top:0,bottom:0,left:0,right:0};
    // var max = d3.max(data.map(d => d.val));
    // var min = d3.min(data.map(d => d.val));
    //
    // y = d3.scaleBand().rangeRound([y1, y2]);
    // x = d3.scaleLinear().rangeRound([x1, x2]);
    // y.domain(data);
    // x.domain([0,1,2]);

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
    //create start locations for bezier rect
    var colors = [{r:238,g:32,b:77},
                  {r:252,g:232,b:131},
                  {r:31,g:117,b:254},
                  {r:255,g:117,b:56},
                  {r:28,g:172,b:120},
                  {r:146,g:110,b:174}];
    var color_start = Math.round(Math.random()*5);
    console.log(color_start)
    var total = 0;
    var val = data[0].in;
    for(var i = 0; i < data.length;i++){
      if(data[i].in != val){
        val = data[i].in;
        color_start ++;
        color_start = color_start%6;
      }
      data[i].color = colors[color_start];
      data[i].start = total;
      data[i].id = i;
      total += data[i].count;
    }



    //sort in order to be able to easily set end locations
    //sort will be on the out collumn first, since the in collumn is already ordered
    //it is exepcted that the it will remain ordered after a bubble sort, within
    //each bin

    for(var i = 0; i < data.length - 1; i++){
      for(var j = 0; j < data.length-1; j++){
        if(data[j].out > data[j+1].out){
          //swap!
          var temp = data[j];
          data[j] = data[j+1];
          data[j+1] = temp;
        }
      }
    }






    //end order calculation
    var sum = 0;
    for(var i = 0; i < data.length;i++){
      data[i].end = sum;
      sum += data[i].count;
    }





    var vert_scale = (y2-y1)/total;

    x2 += 40;
    var gap = 10;
    var colors = [{r:238,g:32,b:77},
                  {r:252,g:232,b:131},
                  {r:31,g:117,b:254},
                  {r:255,g:117,b:56},
                  {r:28,g:172,b:120},
                  {r:146,g:110,b:174}];
    var color_start = Math.round(Math.random()*5);
    //=========================================================================
    var first = data[0].out;
    var start = data[0].end;
    var end = data[0].count+start;
    var color = colors[color_start];
    data[0].end_color = color;
    for(var i = 1; i < data.length;i++){


        console.log(i)
        console.log(first);
        console.log(data[i].out);
        console.log("----------");
      if(data[i].out != first){
          console.log("gottem")

          canvas.append("path")
          .attr("d"," M " + toString(x2+gap,y1+start*vert_scale)+
                    " H " + (x2+gap+30) +
                    " V " + (y1+end*vert_scale)+
                    " H " + (x2+gap))

          .attr("fill","rgb("+color.r+"," + color.g+"," + color.b+")");
          color_start = (color_start+1)%colors.length;


          first = data[i].out;
          start = data[i].end;
          end = data[i].count +start;
          color = colors[color_start];
          data[i].end_color = color;
      }

      else{
        data[i].end_color = color;
        end = data[i].end+data[i].count;
      }
    }
    end = data[data.length-1].end + data[data.length-1].count;
    data[data.length-1].end_color = color;
    canvas.append("path")
    .attr("d"," M " + toString(x2+gap,y1+start*vert_scale)+
              " H " + (x2+gap+30) +
              " V " + (y1+end*vert_scale)+
              " H " + (x2+gap))
    .attr("fill","rgb("+color.r+"," + color.g+"," + color.b+")");
    //=========================================================================

    //reorder for aesthetic
    for(var i = 0; i < data.length - 1; i++){
      for(var j = 0; j < data.length-1; j++){
        if(data[j].id > data[j+1].id){
          //swap!
          var temp = data[j];
          data[j] = data[j+1];
          data[j+1] = temp;
        }
      }
    }

    console.log(data);


    console.log(data)
    // canvas.append("path")
    // .attr("stroke","black")
    // .attr("stroke-width","1")
    // .attr("d"," M "+toString(x1,y1)+
    //           " L "+toString(x2,y1)+
    //           " L "+toString(x2,y2)+
    //           " L "+toString(x1,y2)+
    //           " L "+toString(x1,y1))
    // .attr("fill","white");


    var first = data[0].in;
    var start = data[0].start;
    var end = data[0].count+start;
    var color = data[0].color;
    console.log(data)
    console.log(color)
    for(var i = 1; i < data.length;i++){
        // console.log(first);
        // console.log(data[i].in);
        // console.log("----------");
      if(data[i].in != first){
          console.log(color)
          canvas.append("path")
          .attr("d"," M " + toString(x1,y1+start*vert_scale)+
                    " H " + (x1+30) +
                    " V " + (y1+end*vert_scale)+
                    " H " + x1)
          .attr("fill","rgb("+color.r+"," + color.g+"," + color.b+")");
          first = data[i].in;
          start = data[i].start;
          end = data[i].count +start;
          color = data[i].color;
      }
      else if(i == data.length-1){
        end = data[i].start + data[i].count;
        canvas.append("path")
        .attr("d"," M " + toString(x1,y1+start*vert_scale)+
                  " H " + (x1+30) +
                  " V " + (y1+end*vert_scale)+
                  " H " + x1)
        .attr("fill","rgb("+color.r+"," + color.g+"," + color.b+")");
      }
      else{
        end = data[i].start+data[i].count;
      }
    }
    x1 += 40;
    var pad = 2;
    canvas.selectAll(".line")
        .data(data)
        .enter().append("path")
        .attr("class", "line")
        // .attr("stroke","black")
        // .attr("stroke-width","1")
        .attr("d",function(d,i){
          // console.log(" M "+toString(x1,y1+d.start*vert_scale)+
          //            " L "+toString(x2,y1+d.end*vert_scale) );
          //
          //parallelogram version:
        // return    (" M "+toString(x1,y1+d.start*vert_scale)+
        //            " L "+toString(x2,y1+d.end*vert_scale)+
        //            " L "+toString(x2,y1+d.end*vert_scale + d.count*vert_scale)+
        //            " L "+toString(x1,y1+d.start*vert_scale + d.count*vert_scale)+
        //            " Z ");
        var mid = (x2-x1)/2;
       return    (" M "+toString(x1,y1+d.start*vert_scale+pad)+
                  " C "+toString(x1+mid,y1+d.start*vert_scale+pad)+" "+toString(x1+mid,y1+d.end*vert_scale+pad)+" "+toString(x2,y1+d.end*vert_scale+pad)+
                  " L "+toString(x2,y1+d.end*vert_scale + d.count*vert_scale-pad)+
                  " C "+toString(x1+mid,y1+d.end*vert_scale + d.count*vert_scale-pad)+" "+toString(x1+mid,y1+d.start*vert_scale + d.count*vert_scale-pad)+" "+toString(x1,y1+d.start*vert_scale + d.count*vert_scale-pad)+
                  " Z ");

        })
        .attr("fill",function (d, i) {
            var col = d.color;
            var ecol = d.end_color;
            // <defs>
              // <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              //   <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
              //   <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
              // </linearGradient>
            // </defs>
            canvas.insert("defs").html("<linearGradient id='grad"+i+"' x1='0%' y1='0%' x2='100%' y2='0%'>"+
                                          "<stop offset='0%' style='stop-color:rgb("+col.r+"," + col.g + "," + col.b  + ");stop-opacity:.5' />"+
                                          "<stop offset='100%' style='stop-color:rgb("+col.r+"," + col.g + "," + col.b  + ");stop-opacity:.5' />"+
                                        "</linearGradient>");
            return "url(#grad"+i+")"//'rgba('+col.r+', ' + col.g + ', ' + col.b  + ',.5)'
        	})
        // .attr("fill",function (d, i) {
        //     var col = d.color;
        // 		return 'rgba('+col.r+', ' + col.g + ', ' + col.b  + ',.5)'
        // 	})
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


function addFieldChart(data,canvas,x1,y1,x2,y2){
  let p1 = {x:100.0,y:400.0};
  let p2 = {x:580.0,y:400.0};
  let pm = {x:340.0,y:-80.0};
  let p = .25;
  function toString(x,y){
    return "" + x + " " + y + "";
  }

  canvas.append("path")
  .attr("d"," M " + toString(p1.x,p1.y)+
            " L " + toString(pm.x,pm.y) +
            " L " + toString(p2.x,p2.y)+
            " Z ")
  .attr("fill","rgba(255,255,255,0)");

  function newPoint(iP,fP,p){

    var x = (1.0-p)*iP.x + p*fP.x;
    var y = (1.0-p)*iP.y + p*fP.y;
    return {x:x,y:y};
  }

  console.log("d"," M " + toString(p1.x,p1.y)+
            " L " + toString(newPoint(p1,pm,p).x,newPoint(p1,pm,p).y) +
            " L " + toString(newPoint(p2,pm,p).x,newPoint(p2,pm,p).y)+
            " L " + toString(p2.x,p2.y)+
            " Z ")
  canvas.append("path")
  .attr("d"," M " + toString(p1.x,p1.y)+
            " L " + toString(newPoint(p1,pm,p).x,newPoint(p1,pm,p).y) +
            " L " + toString(newPoint(p2,pm,p).x,newPoint(p2,pm,p).y)+
            " L " + toString(p2.x,p2.y)+
            " Z ")
  .attr("fill","white");

  var pad = 2;
  var step = (p2.x-p1.x)/12;

  for(var i = 1; i <= 12; i++){
    var color = "green"
    if(i == 1 || i == 12 ){
      color = "grey";
    }
    var tp1 = {x:p1.x+(i-1)*step,y:p1.y};
    var tp2 = {x:p1.x+(i)*step,y:p1.y};
    canvas.append("path")
    .attr("d"," M " + toString(tp1.x+pad,tp1.y-2*pad)+ //TODO: add padding within function calls, not to output
              " L " + toString(newPoint(tp1,pm,p).x+pad,newPoint(tp1,pm,p).y+2*pad) +
              " L " + toString(newPoint(tp2,pm,p).x-pad,newPoint(tp2,pm,p).y+2*pad)+
              " L " + toString(tp2.x-pad,tp2.y-2*pad)+
              " Z ")
    .attr("fill",color);
  }
  var count = 6;
  var base = newPoint(p1,pm,p).y + 2*pad;
  var bottom = p1.y - 2*pad;
  var stepsize = (bottom-base)/count;

  // [{start:10,end:15,type:"pass"},
  // {start:15,end:14,type:"run"},
  // {start:14,end:22,type:"run"},
  // {start:22,end:34,type:"pass"},
  // {start:34,end:40,type:"pass"}]
  var zeroYDS = newPoint(p1,p2,1/12);
  var frankyYDS = newPoint(p1,p2,11/12);
  for(var i = 0; i < count;i++){
    var color = "blue";
    if(data[i].type=="run"){
      color = "red";
    }
    var b1 = newPoint(zeroYDS,frankyYDS,data[i].start/100);
    var b2 = newPoint(zeroYDS,frankyYDS,data[i].end/100);
    var tp1 = newPoint(b1,pm,(p-p*((i+1)/count)));
    var tp2 = newPoint(b1,pm,(p-p*((i)/count)));
    var tp3 = newPoint(b2,pm,(p-p*((i)/count)));
    var tp4 = newPoint(b2,pm,(p-p*((i+1)/count)));
    canvas.append("path")
    .attr("d"," M " + toString(tp1.x,tp1.y-pad)+
              " L " + toString(tp2.x,tp2.y+pad)+
              " L " + toString(tp3.x,tp3.y+pad)+
              " L " + toString(tp4.x,tp4.y-pad)+
              " Z ")
    .attr("fill",color);
  }


  //create white field background


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
