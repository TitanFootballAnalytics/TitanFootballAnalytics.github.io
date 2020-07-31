



function awsrequest(screquest,reportid,type){
  cognitoUser.getSession(function(err, session) {
    if (err) {	alert(err.message || JSON.stringify(err)); return;}

    let team = "team";
    // NOTE: getSession must be called to authenticate user before calling getUserAttributes
    cognitoUser.getUserAttributes(function(err, attributes) {
      if (err) {alert(err);}
      else {
      team = JSON.parse(JSON.stringify(attributes[1])).Value;
      console.log(team)

      }
    });

    var loginUrl = 'cognito-idp.'+_config.cognito.region+'.amazonaws.com/'+_config.cognito.userPoolId
    AWS.config.region = _config.cognito.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: _config.identity.identityPoolId,
      Logins: {
        [`${loginUrl}`]: session
          .getIdToken()
          .getJwtToken(),
      }
    });

    AWS.config.credentials.refresh(error => {
      if (error) {console.error(error);	}
      else {

        var s3 = new AWS.S3({
            apiVersion: "2006-03-01",
            params: { Bucket: "titancommonstorage"}
        });


        var lambda = new AWS.Lambda({credentials: AWS.config.credentials,
                                      region : _config.cognito.region });

        var titancommon = new AWS.S3({
            apiVersion: "2006-03-01",
            params: { Bucket: "titancommonstorage" }
        });



        //
        var directory = team+"/reports/"+reportid+"/report_"+team+"_"+reportid+".json";
        if(type == 1){
          writes3(screquest,directory,titancommon,"report_"+team+"_"+reportid+".json",reportid);
        }
        if(type == 2){
          gets3object(directory,titancommon);
        }
        if(type == 3){
          console.log("tirgger")
          screquest["metadata"]["team"] = team
          screquest["metadata"]["reportid"] = reportid

          calllambda(screquest,"generate_scorecards",lambda);
          //console.log(JSON.stringify(screquest))
        }



  }})
  })
}

function writes3(msg,directory,s3bucket,filename,reportid){

  var blob = new Blob([JSON.stringify(msg)], {type: "text/json;charset=utf-8"});
  var jsonfile = new File([blob],filename+".json")

  var params = {
    Bucket: "titancommonstorage",
    Key: directory,
    Body: jsonfile
  }


  s3bucket.putObject(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("yeetushiatus")
      awsrequest(msg,reportid,3);

    }
  });

}

function gets3object(directory,s3bucket){

  var output = "dd";

  var params = {
    Bucket: "titancommonstorage",
    Key: directory
  }


  s3bucket.getObject(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      output = JSON.parse(binArrayToJson(data.Body))
      setscorecardrequests(output);
    }


  });
}

function calllambda(message,lambdaname,lambda){


  var params = {
    FunctionName: lambdaname, /* required */
    Payload: JSON.stringify(message)}

  lambda.invoke(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      console.log(data);           // successful response
      var result = JSON.parse(data.Payload)
      console.log(result)
      window.location.replace("scorecards.html?reportid="+message["metadata"]["reportid"]);
      // Obtain Report ID
      // Redirect to report page
    }
  });
}

function binArrayToJson(binArray) {
	    var str = "";
	    for (var i = 0; i < binArray.length; i++) {
	        str += String.fromCharCode(parseInt(binArray[i]));
	    }
	    return str
	}
