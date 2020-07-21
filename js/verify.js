var Auth = window.auth || {};
(function scopeWrapper($) {
    var signinUrl = '/index.html';
    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    var userPool;

    if (!(_config.cognito.userPoolId &&
          _config.cognito.userPoolClientId &&
          _config.cognito.region)) {
        // $('#noCognitoMessage').show();
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

    // Auth.signOut = function signOut() {
    //     userPool.getCurrentUser().signOut();
    // };

    // Auth.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    //
    //     var cognitoUser = userPool.getCurrentUser();
    //
    //     if (cognitoUser) {
    //         console.log("user detected");
    //         cognitoUser.getSession(function sessionCallback(err, session) {
    //             if (err) {
    //                 reject(err);
    //             } else if (!session.isValid()) {
    //                 resolve(null);
    //             } else {
    //                 resolve(session.getIdToken().getJwtToken());
    //             }
    //         });
    //     } else {
    //         console.log("user not detected");
    //         resolve(null);
    //     }
    // });


    /*
     * Cognito User Pool functions
     */







    function createCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: toUsername(email),
            Pool: userPool
        });
    }

    function toUsername(email) {
        return email.replace('@', '-at-');
    }

    /*
     *  Event Handlers
     */
    document.getElementById('VERIFICATIONSUBMIT').addEventListener("click",handleVerify,false);


    function handleVerify(event) {


        var email = $('#VERIFICATIONEMAIL').val();
        console.log(email)
        var code = $('#VERFICATIONCODE').val();
        event.preventDefault();

        var userData = {
	         Username: email,
	         Pool: userPool,
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


        function verifySuccess(result) {
            console.log('call result: ' + result);
            console.log('Successfully verified');
            alert('Verification successful. You will now be redirected to the login page.');
            // window.location.href = signinUrl;
        }

        function verifyError(err) {
            console.log("ERR MIGHT NEED TO GET NEW CODE")

            // cognitoUser.resendConfirmationCode(function(err, result) {
            // if (err) {
            //   alert(err.message || JSON.stringify(err));
            //   return;
            // }
            // console.log('call result: ' + result);
            // });
            alert(err);
        }
        console.log(cognitoUser);
        cognitoUser.confirmRegistration(code, true, function confirmCallback(err, result) {
            if (!err) {
                verifySuccess(result);
            } else {
                verifyError(err);
            }
            console.log('call result: ' + result);
        });



    }
}(jQuery));
