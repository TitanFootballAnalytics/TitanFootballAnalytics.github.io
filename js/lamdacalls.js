cognitoUser.getSession(function(err, session) {
  if (err) {	alert(err.message || JSON.stringify(err)); return;}
  // console.log('session validity: ' + session.isValid());

  let team = "team";
  // NOTE: getSession must be called to authenticate user before calling getUserAttributes
  cognitoUser.getUserAttributes(function(err, attributes) {
    if (err) {alert(err);}
    else {
      // console.log(attributes)
    team = JSON.parse(JSON.stringify(attributes[1])).Value;
      // console.log("======================",team);
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

      // AWS.config.apiVersions = {
      //   lambda: '2015-03-31'  ///ignore if latest version
      // };
      var lambda = new AWS.Lambda({credentials: AWS.config.credentials,
                                    region : _config.cognito.region });



      var params = {
        FunctionName: 'testhtmljean', /* required */
        Payload: JSON.stringify({"test":1})}

      console.log(lambda)

      lambda.invoke(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {

          console.log(data);           // successful response
          var result = JSON.parse(data.Payload)

        }

      });


}})
})
