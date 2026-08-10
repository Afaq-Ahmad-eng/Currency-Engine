//External modules
import argon2 from 'argon2';

//Function to hash the password using argon2
const passwordHash = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};



//Export the functions for use in other modules
export { passwordHash };