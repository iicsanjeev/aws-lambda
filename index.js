var AWS = require('aws-sdk');

var sageMakerRuntime = new AWS.SageMakerRuntime({region: 'us-east-2',});

exports.handler = async (event) => {

    console.log('received event:  ',typeof(event))
    let result, response;
    try {
        var params = {
            Body: event['data'],
            ContentType:'text/csv',
            EndpointName: 'xgboost'
        };

        console.log('params: ',JSON.stringify(params))
        console.log('sageMakerRuntime: ',sageMakerRuntime)
        var predictPromise = sageMakerRuntime.invokeEndpoint(params).promise();
        result = await predictPromise;
        resoponse = JSON.parse(Buffer.from(result.Body).toString('utf8'))

    } catch (error) {
        console.log(`reported error: `,error)
        return error
    }
    return resoponse
}