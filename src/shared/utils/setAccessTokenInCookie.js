//Internal modules
import { setCookie } from './setCookie.js';
// Sets a short-lived access token cookie (15 minutes).
const setAccessTokenInCookie = (res, tokenName, token) => {    
   //We use the JWT_ACCESS_TOKEN_EXPIRATION environment variable to determine the expiration time for the access token cookie. Because the access token time and the access token which store in the cookies should be the same. So we can use the same value for both.
    setCookie(res, tokenName, token, process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_FOR_COOKIES);
};

//export the function for use in other modules
export { setAccessTokenInCookie };