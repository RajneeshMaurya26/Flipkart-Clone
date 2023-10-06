import express from "express";
import {createProduct,getProduct} from '../../Controller/product/productController.js';
import { requireSignin,adminMiddleware } from "../../common-middleware/common-middleware.js";
import multer from "multer";
import shortid from "shortid";
import path from 'path';
import fs from 'fs';

const router = express.Router();

// This fuction work to store the picture of product in view form 
// Get the current working directory (where your Node.js script is located)
const currentDir = process.cwd();

// Define the path to the uploads directory
const uploadDir = path.join(currentDir, 'uploads');
//checking the directory exist or not if not the it will create it.
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname);
    }
});

const upload = multer({storage});


router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPictures'),createProduct);
router.get('/product/getProduct',getProduct);

export default router;
