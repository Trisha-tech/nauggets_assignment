const WalletTransaction = require('../models/walletTransactionSchema.js');
const User = require('../models/userSchema.js')

// NEW WALLET TRANSACTION CREATION ROUTE STARTS
exports.createNewWalletTransaction = async (req, res) => {
    try {
        const { userId, amount, type, status, runningBalance, transaction } = req.body;

        if (!userId || !amount || !type || !status || !runningBalance) {
            return res.status(422).json({ error: "Please add all the Fields" });
        }

        const matchedUser = await User.findOne({ _id: userId });

        if (matchedUser) {
            const newWalletTransaction = new WalletTransaction({
                userId: userId,
                amount: amount,
                type: type,
                status: status,
                runningBalance: runningBalance,
                transaction: transaction
            });

            await newWalletTransaction.save();

            res.status(200).json({ message: 'Wallet Transaction Created Successfully', data: newWalletTransaction });
        }else{
            return res.status(422).json({ error: "User Id Not Found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// NEW WALLET TRANSACTION CREATION ROUTE ENDS