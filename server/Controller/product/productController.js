import Product from '../../Model/productSchema.js';
import slugify from 'slugify';

export const createProduct = async(req, res) => {
    try {
        const { name, price, quantity, description, category } = req.body;
        const createdBy = req.user._id; // Assuming you're using user authentication

        if (!name || !price || !category) {
            return res.status(500).json({ error: 'Name, price, and category are required' });
        }

        const productPictures = req.files?.map(file => ({ img: file.filename })) || [];

        const product = new Product({
            name,
            slug: slugify(name),
            price,
            quantity,
            description,
            productPictures,
            category,
            createdBy,
        });
        
        const savedProduct = await product.save();

        return res.status(200).json({
            message: 'Product created successfully',
            product: savedProduct,
        });
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProduct = (req, res) => {

} 