//Internal modules
import { setVerifyEmailTokenInCookie } from "../../../shared/utils/setVerifyEmailTokenInCookie.js";
import { userRegistrationService } from "../services/userRegistration.service.js";
import { validationOfUserRegistrationData } from "../validations/userRegistration.Validation.js";
const userRegistrationController = async (req, res) => {
    try {
        const {success, data, error} = validationOfUserRegistrationData(req.body);
      
        if(!success){
            return res.status(400).json({
                success: false,
                message: `Validation is failed`
            })
        }
        const result = await userRegistrationService(data);

        //Extract the jwt and otp from the result object
        const {verifyEmailJWT, verifyEmailOTP } = result;
        //Set the verify email token in the cookies
        setVerifyEmailTokenInCookie(res, verifyEmailJWT);

        //Delete both verifyEmailToken and verifyEmailOTP from the result object
        delete result?.verifyEmailJWT;
        delete result?.verifyEmailOTP;

        res.status(201).json({
            success: true,
            message: `User Register successfully!`,
            data: result,
            redirectTo: '/verify/email'
        })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        })
    }
}

//export
export default userRegistrationController