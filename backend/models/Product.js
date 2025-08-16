import mongoose from "mongoose";
const {Schema} = mongoose;

const productSchema = new Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "username"
    },
    name: {
        type: String,
        required: true,
    }, 
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", productSchema);
export default Product;