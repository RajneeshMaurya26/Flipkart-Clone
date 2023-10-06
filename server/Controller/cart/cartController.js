import Cart from "../../Model/cartSchema.js";

export const addToCart = async (req, res) => {
    try {
        const checkCart = await Cart.findOne({ user: req.user._id });

        if (checkCart) {
            const product = req.body.cartItems.product;
            const item = checkCart.cartItems.find(c => c.product == product);

            if (item) {
                // If the item already exists, update its quantity
                const updatedCart = await Cart.findOneAndUpdate(
                    { user: req.user._id, 'cartItems.product': product },
                    {
                        $set: {
                            'cartItems.$.quantity': item.quantity + req.body.cartItems.quantity
                        }
                    },
                    { new: true } // Return the updated cart
                );
                return res.status(200).json({ cart: updatedCart });
            } else {
                // If the item doesn't exist, push it to cartItems
                const updatedCart = await Cart.findOneAndUpdate(
                    { user: req.user._id },
                    {
                        $push: {
                            cartItems: req.body.cartItems
                        }
                    },
                    { new: true } // Return the updated cart
                );
                return res.status(200).json({ cart: updatedCart });
            }
        } else {
            // Create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
            const savedCart = await cart.save();
            return res.status(200).json({ cart: savedCart });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
