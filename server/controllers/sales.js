import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
    try {
        const overallStats = await OverallStat.findOne();
        res.status(200).json(overallStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}