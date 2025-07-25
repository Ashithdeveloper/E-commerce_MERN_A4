import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productname : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    image : {
        type : [String],
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    sizes : {
        type : [String],
        required : true
    },
    bestseller : {
        type : Boolean,
    },
    date : {
        type : String,
    },
    subcategory : {
        type : String,
        required : true
    },

})

const Product = mongoose.models.product || mongoose.model("product", productSchema);
export default Product;