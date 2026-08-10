const setCookie = (res, name, token, maxAge) => {
    res.cookie(name, token, {
        httpOnly: true, 
        // Enforces HTTPS in production, allows HTTP for local development
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax', // Best balance for modern web authentication
        maxAge: maxAge,
        path: '/',
    });
};

//export the function for use in other modules
export { setCookie };