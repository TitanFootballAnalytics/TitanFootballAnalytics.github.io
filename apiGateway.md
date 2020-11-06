# Creating API Gateway Functions

## Making a Lambda Function
1. Navigate to lambda in aws console
2. Choose "Create Function"
3. Choose "Author From Scratch" and select the desired language
4. If this function is going to be accessing buckets or needs priviledges make sure you select a role with such privilidges
5. Click "Create Function"
6. Add the desired code for the function and click "deploy"

## Attach this function to an API Gateway Endpoint
1. Navigate to API Gateway in the aws console and select the API that you want to add the function to
2. Either navigate to the resource that you want to add the function to, or click "Action" -> "Create Resource". If you create the resource, do not make this a proxy resource, and do not select "enable CORS".
3. Under this resource click "Action" -> "Create Method".
4. Choose "Lambda Function" and type the name of the desired lambda function that you made earlier in the text box. (do not use proxy and make sure the region is correct)
5. click on "Actions" -> "Deploy API" to create the endpoint. You can test the function is working in Postman or using AWS's test features

## Enabling CORS so that the Titan Web Client can access the API Gateway endpoint
1. Follow the instructions [here](https://enable-cors.org/server_awsapigateway.html)
2. In addition to the headers added in the instructions above, add any additional headers to the "Access-Control-Allow-Headers" mapping that you want for the function.
3. Under Integration request just add the mapping template that says {"statusCode": 200} in json.
4. Make sure that Output Passthrough is set to "yes" for the Options method under Integration Response. (Not necessary for the other methods)

## Adding a lambda authorizer
1. Create a lambda authorizer function in the lambda portal using a blueprint that has been provided.
2. Add this function as the Auth under method request in the API Gateway portal for the desired method. (Do not add an authorizer to the options method, it must be NONE)


