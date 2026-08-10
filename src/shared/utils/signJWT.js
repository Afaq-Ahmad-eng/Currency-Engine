//External modules
import jwt from 'jsonwebtoken';

const signJWT = (payload, expireIn, issuer, audience) => {
    const options = {
        expiresIn: expireIn ? expireIn : process.env.JWT_ACCESS_TOKEN_EXPIRATION,
        issuer: issuer ? issuer : process.env.JWT_ACCESS_TOKEN_ISSUER,
        audience: audience ? audience : process.env.JWT_ACCESS_TOKEN_AUDIENCE
    };
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, options);
};

//export the signJWT function to be used in other files
export default signJWT;