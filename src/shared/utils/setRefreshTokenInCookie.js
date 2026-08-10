//Internal modules
import { setCookie } from './setCookie.js';
// Sets a long-lived refresh token cookie (7 days).
const setRefreshTokenInCookie = (res, tokenName, token) => {
    //We use the JWT_REFRESH_TOKEN_EXPIRATION environment variable to determine the expiration time for the refresh token cookie. Because the refresh token time and the refresh token which store in the cookies should be the same. So we can use the same value for both.
    setCookie(res, tokenName, token, process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME_FOR_COOKIES);
};

//export the function for use in other modules
export { setRefreshTokenInCookie };