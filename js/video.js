




// Athenticate user then run code with team name
authAndRun((team)=>{
  // Lists Objects at "titancommonstorage" bucket and at level `${team}/reports`
  listObjsAndRun(`${team}/reports`,"titancommonstorage",(data)=>{
    console.log(data)
    var keylst = [];
    for(var i = 0; i < data.Contents.length;i++){
      // Add logic here to make sure there mp4 files or the right thing
       keylst.push(data.Contents[i].Key);
    }

    // This will now get all the keys in keylst and store them in data
    iteratedObjGet("titancommonstorage",keylst,[],(data)=>{
      console.log(data);
      var mainholder = document.getElementById("videolist");
      var templabel; var tempradio;
      data.forEach((d,i)=>{
        tempradio = mainholder.appendChild(document.createElement('input'));
        tempradio.type = "radio";
        tempradio.id = i;
        tempradio.name = "videoselection";
        tempradio.value = i;
        templabel = mainholder.appendChild(document.createElement('label'));
        templabel.for = i;
        templabel.innerHTML = i;
        mainholder.appendChild(document.createElement('br'));


      });
      // CONNECT THESE RADIOS TO CHANGE THE VIDEO



    });
  });
});
