import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        description: String,
        price: Number,
        category: String,
        rating: Number,
        supply: Number
    },
    { timestamps: true }
)

const Product = mongoose.model("Product", ProductSchema)
export default Product