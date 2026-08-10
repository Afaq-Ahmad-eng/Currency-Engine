//Function to verify the password using argon2
const verifyPassword = async (hashedPassword, plainPassword) => {
    try {
        const isMatch = await argon2.verify(hashedPassword, plainPassword);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

//Export the functions for use in other modules
export {verifyPassword};