//External moudles
import jwt from 'jsonwebtoken';

const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
};

//export the verifyJWT function to be used in other files
export { verifyJWT };