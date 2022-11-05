const AWS = require('aws-sdk')

const cognito = new AWS.CognitoIdentityServiceProvider()

const _header = {
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            }


exports.handler = async (event) => {

const {
 email,
 username,
 password
 } = JSON.parse(event.body)


const params = {
  ClientId:  process.env.CLIENT_ID,
  Username: username,
  Password: password,
  UserAttributes: [{
      Name: 'email',
      Value: email
    }
  ]
}

try{
  
  await cognito.signUp(params).promise();

      let message={
          "message": "Usuário criado com sucesso",
        }
  
    return {
       statusCode: 201,
       headers: _header,
       body: JSON.stringify(message)
    }
  
  }catch (_err) {

    const response = {
         statusCode: 400,
         headers: _header,
        body: JSON.stringify(_err)
    };
    return response;
  }
};
