//External modules
import express  from "express";

//Internal modules
import userRegistrationHandler from "../controllers/userRegistration.controller.js";
const userRouter = express.Router();

userRouter.post('/user/register', userRegistrationHandler);

//export 
export {
    userRouter as userHandler
}