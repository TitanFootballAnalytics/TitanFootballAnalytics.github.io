(function(){
    if($('.nav>ul>li').hasClass('selected')){
    $('.selected').addClass('active');
    var currentleft=$('.selected').position().left+"px";
    var currentwidth=$('.selected').css('width');
    $('.lamp').css({"left":currentleft,"width":currentwidth});
    }
    else{
      $('.nav>ul>li').first().addClass('active');
      var currentleft=$('.active').position().left+"px";
    var currentwidth=$('.active').css('width');
    $('.lamp').css({"left":currentleft,"width":currentwidth});
    }
    $('.nav>ul>li').hover(function(){
      $('.nav ul li').removeClass('active');
      $(this).addClass('active');
    var currentleft=$('.active').position().left+"px";
    var currentwidth=$('.active').css('width');
    $('.lamp').css({"left":currentleft,"width":currentwidth});
    },function(){
    if($('.nav>ul>li').hasClass('selected')){
    $('.selected').addClass('active');
    var currentleft=$('.selected').position().left+"px";
    var currentwidth=$('.selected').css('width');
    $('.lamp').css({"left":currentleft,"width":currentwidth});
    }
    else{
      $('.nav>ul>li').first().addClass('active');
      var currentleft=$('.active').position().left+"px";
    var currentwidth=$('.active').css('width');
    $('.lamp').css({"left":currentleft,"width":currentwidth});
    }
    });
});

function setupNavClicks(){
    d3.select("#submit")
        .on("click",function(){
            generateScorecards("scoreCardAutomation.json");
    })
    d3.select("#baroption1")
        .on("click",function(){
            d3.select("#graph1").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#pieoption1")
        .on("click",function(){
            d3.select("#graph1").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#fieldoption1")
        .on("click",function(){
            d3.select("#graph1").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#noneoption1")
        .on("click",function(){
            d3.select("#graph1").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#baroption2")
        .on("click",function(){
            d3.select("#graph2").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#pieoption2")
        .on("click",function(){
            d3.select("#graph2").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#fieldoption2")
        .on("click",function(){
            d3.select("#graph2").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#noneoption2")
        .on("click",function(){
            d3.select("#graph2").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#baroption3")
        .on("click",function(){
            d3.select("#graph3").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#pieoption3")
        .on("click",function(){
            d3.select("#graph3").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#fieldoption3")
        .on("click",function(){
            d3.select("#graph3").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
    d3.select("#noneoption3")
        .on("click",function(){
            d3.select("#graph3").text(d3.select(this).text());
        })
        .on("mouseover",function(){
            d3.select(this).style("background","rgb(220,220,220)");
        })
        .on("mouseout",function(){
            d3.select(this).style("background","#eee");
    })
}
