var Auth = window.auth || {};
(function scopeWrapper($) {

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    var userPool;

    if (!(_config.cognito.userPoolId &&
          _config.cognito.userPoolClientId &&
          _config.cognito.region)) {
        console.log("cognito not enabled");
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }


    // Auth.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    //
    //     var cognitoUser = userPool.getCurrentUser();
    //     console.log(cognitoUser)
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



    function toUsername(email) {
        return email.replace('@', '-at-');
    }

    /*
     *  Event Handlers
     */
    document.getElementById('REGISTERSUBMIT').addEventListener("click",handleRegister,false);



    function handleRegister(event) {
        var email = $('#REGISTEREMAIL').val();
        var password = $('#REGISTERPASSWORD').val();
        var password2 = $('#CONFIRMPASSWORD').val();

        var onSuccess = (result) => {
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            var confirmation = 'Registration successful. Please check your email inbox or spam folder for your verification code.';
            alert(confirmation);
        };
        var onFailure = (err) => {alert(err);};
        event.preventDefault();

        if (password === password2) {
            register(email, password, onSuccess, onFailure);
        } else {
            alert('Passwords do not match');
        }
    }

    function register(email, password, onSuccess, onFailure) {
        var dataEmail = {
            Name: 'email',
            Value: email
        };
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

        userPool.signUp(toUsername(email), password, [attributeEmail], null,
            (err, result) =>  {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );
    }

}(jQuery));
