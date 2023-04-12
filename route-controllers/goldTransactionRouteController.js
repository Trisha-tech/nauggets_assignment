const GoldTransaction = require('../models/goldTransactionSchema.js');
const User = require('../models/userSchema.js')

// NEW GOLD TRANSACTION CREATION ROUTE STARTS
exports.createNewGoldTransaction = async (req, res) => {
    try {
        const { userId, entityUser, quantity, amount, type, status, runningBalance } = req.body;

        if (!userId || !entityUser || !quantity || !amount || !type || !status || !runningBalance) {
            return res.status(422).json({ error: "Please add all the Fields" });
        }

        const matchedUser = await User.findOne({ _id: userId });

        if (matchedUser) {
            const newGoldTransaction = new GoldTransaction({
                userId: userId,
                entityUser:entityUser,
                quantity:quantity,
                amount: amount,
                type: type,
                status: status,
                runningBalance: runningBalance
            });

            await newGoldTransaction.save();

            res.status(200).json({ message: 'Gold Transaction Created Successfully', data: newGoldTransaction });
        } else {
            return res.status(422).json({ error: "User Id Not Found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// NEW GOLD TRANSACTION CREATION ROUTE ENDS