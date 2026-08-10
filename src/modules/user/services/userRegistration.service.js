//Internal modules
import { userRegistrationRepository } from "../repositories/userRegistration.repository.js";
import { passwordHash } from "../../../shared/utils/passwordHash.js";
import { generateAlphanumericOTP } from '../../../shared/utils/generateOTP.js'
import signJWT from "../../../shared/utils/signJWT.js";
import { sendVerificationEmail } from "../../../shared/services/emailSendingService/emailVerifyService.js";

const userRegistrationService = async (userData) => {
    try {
        //create password hash
        const hashedPassword = await passwordHash(userData.user_password)
        userData.user_password = hashedPassword;
        
        //Send user to repository
        const result = await userRegistrationRepository(userData);
        
        //sign JWT 
        const verifyEmailJWT = signJWT({userId: result.user_id, userName: result.user_name, userEmail: result.user_email}, process.env.VERIFY_EMAIL_OTP_EXPIRATION_TIME);

        //Set verifyEmailJWT in result object
        result.verifyEmailJWT = verifyEmailJWT;

        //Generate otp for email verify email
        const otp = generateAlphanumericOTP();

        //Send email so, the user verify the email 
        await sendVerificationEmail(result?.user_email, otp);
        
        //set the otp in the reesult object
        result.verifyEmailOTP = otp;

        return result;
    } catch (error) {
        throw error;
    }
}

//export
export {
    userRegistrationService
}