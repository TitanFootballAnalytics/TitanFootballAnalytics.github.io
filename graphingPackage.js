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

function addBarGraph(data, canvas, x1, y1, x2, y2){
    const margin2 = {top:0,bottom:0,left:0,right:0};
    var max = d3.max(data.map(d => d.val));
    var min = d3.min(data.map(d => d.val));

    y = d3.scaleBand().rangeRound([y2-y1, 0]).padding(0.2);
    x = d3.scaleLinear().rangeRound([0, x2-x1]);
    y.domain(data.map(d => d.category));
    x.domain([min-(max)/10, max]);

    data.forEach(d => {
        console.log(d.val);
        console.log(x(d.val))
    });


    //add the y axis to the graph
    canvas.append("g")
        .attr("class", "y axis")
        .attr("transform","translate("+(margin2.left+x1)+","+(margin2.top+y1)+")")
        .call(d3.axisLeft(y).ticks(6))

    //add the x axisto the graph
    canvas.append("g")
        .attr("class", "x axis")
        .attr("transform","translate("+(margin2.left+x1)+","+(y2+margin2.top+10)+")")
        .call(d3.axisBottom(x));

    canvas.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("transform","translate("+(margin2.left+x1)+","+(margin2.top+y1)+")")
        .attr("class", "bar")
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
}


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
