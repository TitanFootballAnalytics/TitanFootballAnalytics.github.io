

async function generateScorecards(filename){
    const data = await d3.json(filename);
    console.log(data);
    d3.select("#tendancychart")
      .append("svg")
      .attr("width",500)
      .attr("height",500)
      .attr("id","chartbase");

    svg = d3.select(("#chartbase"));

    sample_data = data[0];

    function maketendchart(canvas,x1,y1,id,chartdata) {

      console.log(chartdata)

      var mainchartheight = 300;
      var mainchartwidth = 400;

      var col1 = "FORM_FAM";// Put call to metadata json here
      var col2 = "PERS";// Put call to metadata json here
      var col3 = "";// Put call to metadata json here
      var tcol = "RunPass";
      var values = ["P","R"];

      var max = 0;
      var max_item = "";
      var running_count = 0;
      var temp_title; var temp_count;

      for (var i = 0; i < values.length; i++) {
        temp_title = tcol+"_"+values[i];
        temp_count = chartdata[temp_title];
        running_count = running_count + temp_count;
        if(temp_count > max){
          max = temp_count;
          max_item = temp_title;
        }
      }
      console.log(max_item)
      console.log(max)
      console.log(running_count)
      console.log(max/running_count)



      canvas.append("rect")
            .attr("x",x1)
            .attr("y",y1)
            .attr("width",mainchartwidth)
            .attr("height",mainchartheight)
            .attr("fill","#1c1c1c")
            .attr("stroke","#1c1c1c")
            .attr("stroke-width","2px");
      canvas.append("rect")
            .attr("x",x1+(mainchartwidth/2))
            .attr("y",y1)
            .attr("width",mainchartwidth/2)
            .attr("height",300)
            .attr("fill","grey");





    }
    maketendchart(svg,10,10,"test0",sample_data)




  }


generateScorecards("Sample Data/tend.json")
