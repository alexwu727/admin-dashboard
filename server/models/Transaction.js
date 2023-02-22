import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        products: {
            type: [mongoose.Types.ObjectId],
            of: Number,
        },
        cost: Number,
        date: String
    },
    { timestamps: true }
)
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;