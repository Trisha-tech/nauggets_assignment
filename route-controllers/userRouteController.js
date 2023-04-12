const User = require('../models/userSchema.js');
const bcrypt = require(`bcrypt`);

// NEW USER CREATION ROUTE STARTS
exports.createNewUser = async (req, res) => {
    try {
        const { firstName, lastName, password, mobileNumber, country, email, runningBalance } = req.body;

        if (!firstName || !lastName || !password || !mobileNumber || !country || !email || !runningBalance) {
            return res.status(422).json({ error: "Please add all the Fields" });
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser != null) {
            return res.status(422).json({ error: "User already exists with that email" });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                mobileNumber: mobileNumber,
                country: country,
                email: email,
                runningBalance: runningBalance
            });

            const storedNewUser = await newUser.save();

            if (storedNewUser) {
                return res.status(200).json({ message: "New User successfully stored in the database" });
            }
            else {
                return res.status(422).json({ message: "Error occured in saving new user in the database" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// NEW USER CREATION ROUTE ENDS