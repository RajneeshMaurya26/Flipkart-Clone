import express from 'express';
import {addToCart} from '../../Controller/cart/cartController.js';
import { requireSignin, userMiddleware } from '../../common-middleware/common-middleware.js';
const router = express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addToCart);

export default router;