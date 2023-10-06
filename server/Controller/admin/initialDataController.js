import Product from "../../Model/productSchema.js";
import Category from "../../Model/categorySchema.js"


export const getInitialData = async(req, res) => {
    try {
        const getProducts = await Product.find().exec();
        const getCategory = await Category.find().exec();
        return res.
    } catch (error) {
        res.status(500).json({error:error});
    }
}