// Function to set the verify email token in a cookie
import { setCookie } from './setCookie.js';

const setVerifyEmailTokenInCookie = (res, token) => {
    // We use the JWT_VERIFY_EMAIL_TOKEN_EXPIRATION environment variable to determine the expiration time for the verify email token cookie. Because the verify email token time and the verify email token which store in the cookies should be the same. So we can use the same value for both.
    setCookie(res, "verifyEmailJWT", token, process.env.JWT_VERIFY_EMAIL_TOKEN_EXPIRATION_TIME_FOR_COOKIES);
};

// Export the function for use in other modules
export { setVerifyEmailTokenInCookie };