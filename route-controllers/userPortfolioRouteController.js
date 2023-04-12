const WalletTransaction = require('../models/walletTransactionSchema.js');
const User = require('../models/userSchema.js');

exports.calculateUserPortfolio = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    // FETCHING CURRENT WALLET AMOUNT
    const currentFund = user.runningBalance.wallet;

    // FETCHING CURRENT GOLD AMOUNT
    const currentGold = user.runningBalance.gold;

    // FETCHING CURRENT GOLD PRICE
    const currentGoldPrice = user.runningBalance.goldPrice;

    // CALCULATING NET FUND ADDED TO USER'S ACCOUNT
    const walletTransactionAmount = await WalletTransaction.find({ userId, type: 'CREDIT', status: 'SUCCESS' });
    
    const netFundAdded = walletTransactionAmount.reduce((account, transaction) => account + transaction.amount, 0);

    // CALCULATING CURRENT VALUE OF GOLD
    const currentGoldValue = currentGold * currentGoldPrice;

    // CALCULATING NET GROWTH OR LOSS
    const netGrowthOrLoss = currentFund + currentGoldValue - netFundAdded;

    // CALCULATING GAIN OR LOSS PERCENTAGE
    const gainOrLossPercentage = (netGrowthOrLoss / netFundAdded) * 100;

    res.status(200).json({
      netFundAdded,
      currentFund,
      netGrowthOrLoss,
      gainOrLossPercentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

