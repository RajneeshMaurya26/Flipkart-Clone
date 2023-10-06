import express from "express";
import {createCategory,getCategory} from '../../Controller/category/categoryController.js';
import { requireSignin,adminMiddleware } from "../../common-middleware/common-middleware.js";
import multer from "multer";
import shortid from "shortid";
import fs from "fs";
import path from "path";
const router = express.Router();

const currentDir = process.cwd();
const uploadDir = path.join(currentDir,'uploads');

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync('uploads',{recursive:true});
}
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,uploadDir);
    },
    filename: function(req, file, cb){
        cb(null,shortid.generate() + '-' + file.originalname);
    }
});

const upload = multer({storage});

router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),createCategory);
router.get('/category/getCategory',getCategory);

export default router;
