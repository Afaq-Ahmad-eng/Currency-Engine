//External modules
import { z } from 'zod';

const userRegistrationSchema = z.object({
    user_name: z.string().min(3, { message: `username should be atleast 3 letter!` }),
    user_email: z.string().email({ message: `invalid email address!` }),
    user_password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password must not exceed 100 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

});

const userRegistrationDataValidationFunction = (userData) => {
    return userRegistrationSchema.safeParse(userData);
}

//export
export {
    userRegistrationDataValidationFunction as validationOfUserRegistrationData
}