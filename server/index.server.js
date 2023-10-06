import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path'
dotenv.config();
// Database import
import DBConnection from "./Datbase/DBConnection.js";
// Routes Import
import userRoute from './Routes/user/auth.js';
import adminRoute from './Routes/admin/auth.js';
import categoryRoutes from './Routes/category/category.js';
import productRoutes from './Routes/product/product.js';
import cartRoutes from './Routes/cart/cart.js';

const app = express();
// Parse JSON and URL-encoded bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static(path.join('uploads')))

// All Routes here
app.use('/api',userRoute);
app.use('/api',adminRoute);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);


const PORT = process.env.PORT || 8000;
DBConnection();
app.listen(PORT,() => console.log("Port Listen on "+PORT));
