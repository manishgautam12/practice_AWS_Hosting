import express from "express";
const router=express.Router();
import signupController from '../../controllers/UserController/SignUpController.js';
import logInUserController from '../../controllers/UserController/LogInController.js';


router.post("/signup/",signupController);
router.post("/login/",logInUserController);



export default router;