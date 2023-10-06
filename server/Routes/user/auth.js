import express from "express";
import { signin,signup } from "../../Controller/user/authController.js";
import {validateSignupRequest,validateSigninRequest,validatedRequest} from '../../Validate/auth.js';
const router = express.Router();

router.post('/signup',validateSignupRequest,validatedRequest,signup);

router.post('/signin',validateSigninRequest,validatedRequest, signin);

export default router;
