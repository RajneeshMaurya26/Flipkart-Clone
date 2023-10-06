import express from "express";
import { signin,signup,signout } from "../../Controller/admin/authController.js";
import {validateSignupRequest,validateSigninRequest,validatedRequest} from '../../Validate/auth.js';
import { requireSignin } from '../../common-middleware/common-middleware.js';
const router = express.Router();

router.post('/admin/signup',validateSignupRequest,validatedRequest,signup);

router.post('/admin/signin',validateSigninRequest,validatedRequest, signin);

router.post('/admin/signout', signout);

export default router;
