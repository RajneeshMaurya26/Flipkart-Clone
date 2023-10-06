import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    offer:{
        type:Number
    },
    productPictures:[
        {img:{type:String}}
    ],
    reviews:[
        {
            uesrId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
            review:{type:String}
        }
    ],
    category:{type:mongoose.Schema.Types.ObjectId,ref:'category',required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'user',required:true},
    updatedAt:Date,
},{timestamps:true});

const Product = mongoose.model('product', productSchema);

export default Product;