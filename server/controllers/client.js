import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.findOne({
                    productId: product._id
                })
                return { ...product._doc, stat }
            })
        );
        res.status(200).json(productsWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// server-side pagination
export const getTransactions = async (req, res) => {
    try {
        const { page = 1, sort = null, pageSize = 20, search = "" } = req.query;
        // sort should look like this: { "field": "userId", "order": "desc"}
        // formatted sort should look like this: { "userId": -1 }
        const generatedSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortField = sortParsed.field;
            const sortOrder = sortParsed.order === "asc" ? 1 : -1;
            return { [sortField]: sortOrder }
        }
        const sortFormatted = Boolean(sort) ? generatedSort() : {};
        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = Number(page) * Number(pageSize);
        const transactions = await Transaction.find({
            $or: [
                { "userId": { $regex: search, $options: "i" } },
                // { "cost": { $regex: search, $options: "i" } },
            ]
        })
            .sort(sortFormatted)
            .limit(Number(pageSize))
            .skip(startIndex)
        const total = await Transaction.countDocuments({
            $or: [
                { "userId": { $regex: search, $options: "i" } },
            ]
        })
        const result = {
            total,
            transactions
        }
        res.status(200).json(result);
    } catch (error) {
        console.log("error", error);
        res.status(404).json({ message: error.message });
    }
}
