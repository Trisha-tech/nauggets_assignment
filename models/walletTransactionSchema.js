const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['CREDIT', 'DEBIT']
    },
    status: {
        type: String,
        required: true,
        enum: ['FAILED', 'SUCCESS', 'PROCESSING'],
    },
    runningBalance: {
        type: Number,
        required: true
    },
    transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }
},
    { 
        timestamps: true 
    }
);

const walletTransactionSchema = mongoose.model('WalletTransactionSchema', walletSchema);

module.exports = walletTransactionSchema;