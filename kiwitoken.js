
function getRefreshTokenFromUrl() {
    let location = new URL(document.location);
    let queryParams = location.searchParams;
    let refresh_token = queryParams.get("refreshToken");
    if(refresh_token)
    {
        document.getElementById("accessToken").innerHTML = refresh_token;
    }
    return refresh_token;
}

function fetchOptions(cognito_client_id, refresh_token) {
   return  {
        headers: {
            "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
            "Content-Type": "application/x-amz-json-1.1",
        },
        mode: 'cors',
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({
            ClientId: cognito_client_id,
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            AuthParameters: {
                REFRESH_TOKEN: refresh_token,
                //SECRET_HASH: "your_secret", // In case you have configured client secret
            }
        }),
    }
}

function isTokenValid(accessToken) {
    if(!accessToken) {
      return false;
    }
    const accessTokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
    // console.log(accessTokenPayload.exp * 1000);
    return Date.now() < accessTokenPayload.exp * 1000;
}

function onGetTokenSuccess(res) {
    if (!res.ok) {
        console.log("error getting token");
        return "";
    }
    return res.json();
}

function onGetTokenRejection(res) {
        console.log("rejection ==>", res);
        return "";
}
function onGetTokenError(e) {
        console.log("error getting token ==>", e);
        return "";
}

 

function kiwiTokenGetterFactory(cognitoClientId, getTokenCallBack) {
   
    let refreshToken = getRefreshTokenFromUrl();
    let cognitoCallOptions = fetchOptions(cognitoClientId, refreshToken);
    let cognitoUrl = "https://cognito-idp.us-east-1.amazonaws.com/";
    
//     let accessToken = "";
//     return function getToken() {
        
//        if (isTokenValid(accessToken)) {
//            getTokenCallBack(accessToken);
//            return;
//        };
        
//         fetch(cognitoUrl, cognitoCallOptions)
//         .then(onGetTokenSuccess, onGetTokenRejection)
//         .catch(onGetTokenError)
//         .then(data => {
//             if (!data) {
//                 getTokenCallBack("");
//                 return; 
//             }
//             accessToken = data.AuthenticationResult.AccessToken;
//             getTokenCallBack(accessToken);
//         } 
//         )
        
//     }

}
