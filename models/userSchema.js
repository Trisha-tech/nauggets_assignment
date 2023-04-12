const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    runningBalance: {
        wallet: {
            type: Number,
            required: true
        },
        gold: {
            type: Number,
            required: true
        },
        goldPrice: {
            type: Number,
            required: true
        },
    },
});

const User = mongoose.model('UserSchema', userSchema);

module.exports = User;