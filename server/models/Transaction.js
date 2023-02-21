import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        productId: String,
        quantity: Number,
        total: Number,
        date: String
    },
    { timestamps: true }
)
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;