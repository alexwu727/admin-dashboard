import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';

// get admin from user where role is admin
export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password');
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get affiliate user id from params
export const getUserPerformance = async (req, res) => {
    try {
        const { id } = req.params;
        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats"
                }
            },
            { $unwind: "$affiliateStats" },
        ])
        let saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map(async (id) => {
                const transaction = await Transaction.findById(id);
                return transaction;
            })
        )
        saleTransactions = saleTransactions.filter((transaction) => transaction !== null);
        const result = { user: userWithStats[0], sales: saleTransactions };
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}