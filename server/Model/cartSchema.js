import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    cartItems:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required:true
            },
            quantity:{
                type:Number,
                default:1
            },
            price:{
                type:Number,
                required:true
            }
        }
    ]
},{timestamps:true});


const Cart = mongoose.model('cart', cartSchema);

export default Cart;