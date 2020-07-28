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





    /*
     * Cognito User Pool functions
     */





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
            console.log(cognitoUser);
            var confirmation = 'Registration successful. Please check your email inbox or spam folder for your verification code.';
            alert(confirmation);
            window.location.href = "/verification.html";
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
            Value: email.toLowerCase()
        };
        var dataName = {
            Name: 'name',
            Value: "Jon Doe"
        };
        var dataGender = {
            Name: 'gender',
            Value: "Male"
        };
        var dataCity = {
            Name: 'custom:City',
            Value: "Ithaca,NY"
        };
        var dataAge = {
            Name: 'custom:Age',
            Value: "59"
        };
        var dataTeam = {
            Name: 'custom:Team',
            Value: "BigRed"
        };

        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
        var attributeGender = new AmazonCognitoIdentity.CognitoUserAttribute(dataGender);
        var attributeCity = new AmazonCognitoIdentity.CognitoUserAttribute(dataCity);
        var attributeAge = new AmazonCognitoIdentity.CognitoUserAttribute(dataAge);
        var attributeTeam = new AmazonCognitoIdentity.CognitoUserAttribute(dataTeam);

        var attributeList = [];
        attributeList.push(attributeEmail);
        attributeList.push(attributeName);
        attributeList.push(attributeGender);
        attributeList.push(attributeCity);
        attributeList.push(attributeAge);
        attributeList.push(attributeTeam);


        userPool.signUp(email, password, attributeList, null,
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
