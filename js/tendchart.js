

async function generateScorecards(filename){
    const data = await d3.json(filename);
    //console.log(data);
    d3.select("#tendancychart")
      .append("svg")
      .attr("width",500)
      .attr("height",500)
      .attr("id","chartbase");

    svg = d3.select(("#chartbase"));

    var sitcol = data["situations"];
    var tcol = data["target"];
    var values = data["target_vals"];
    var datapoints = data["tendencies"];
    var onedatapoint;

    for (var i = 0; i < datapoints.length; i++) {
      onedatapoint = {}
      onedatapoint["info"] = datapoints[i];
      onedatapoint["sitcol"] = sitcol;
      onedatapoint["target"] = tcol;
      onedatapoint["tvalues"] = values;

    }
    maketendchart(svg,10,10,"test0",onedatapoint)


    function maketendchart(canvas,x1,y1,id,chartdata) {

      var mainchartheight = 300;
      var mainchartwidth = 400;

      var max = 0;
      var max_item = "";
      var running_count = 0;
      var temp_title; var temp_count;

      var values = chartdata["tvalues"];
      var tcol = chartdata["target"];
      var sitcol = chartdata["sitcol"];

      for (var i = 0; i < values.length; i++) {
        temp_title = tcol+"_"+values[i];
        temp_count = chartdata["info"][temp_title];
        running_count = running_count + temp_count;
        if(temp_count > max){
          max = temp_count;
          max_item = temp_title;
        }
      }

      canvas.append("rect")
            .attr("x",x1)
            .attr("y",y1)
            .attr("width",mainchartwidth)
            .attr("height",mainchartheight)
            .attr("fill","#1c1c1c")
            .attr("stroke","#1c1c1c")
            .attr("stroke-width","2px")
            .attr("id","chart1");
      canvas.append("rect")
            .attr("x",x1+(mainchartwidth/2))
            .attr("y",y1)
            .attr("width",mainchartwidth/2)
            .attr("height",300)
            .attr("fill","grey");
      canvas.append("text")
            .attr("x",20)
            .attr("y",50)
            .attr("fill","white")
            .text("ON")
            .style("font-size",30)
            .style("font-weight","bold");
      canvas.append("rect")
            .attr("x",20)
            .attr("y",54)
            .attr("width",60)
            .attr("height",8)
            .attr("fill","white");
      var coltitle;var colvalue;
      var startx = 20;var starty = 100;
      for (var i = 0; i < sitcol.length; i++) {

        coltitle = sitcol[i];
        colvalue = chartdata["info"][sitcol[i]];

        console.log(renderedTextSize(colvalue,"sans-serif",15))

        canvas.append("text")
              .attr("x",startx)
              .attr("y",starty)
              .attr("fill","white")
              .text(colvalue)
              .style("font-size",15)
              .style("font-weight","bold");

        texthw = renderedTextSize(colvalue,"sans-serif",15);

        canvas.append("text")
              .attr("x",startx+texthw.width+5)
              .attr("y",starty)
              .attr("fill","white")
              .text(": "+coltitle)
              .style("font-size",15)
              .style("font-weight","normal");

        starty = starty + texthw.height + 20;
      }

      canvas.append("text")




    }





  }

  function renderedTextSize(string, font, fontSize) {
      var paper = Raphael(0, 0, 0, 0)
      paper.canvas.style.visibility = 'hidden'
      var el = paper.text(0, 0, string)
      el.attr('font-family', font)
      el.attr('font-size', fontSize)
      var bBox = el.getBBox()
      paper.remove()
      return {
          width: bBox.width,
          height: bBox.height
      }
  }


generateScorecards("Sample Data/tend.json")
