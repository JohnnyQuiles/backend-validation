const User = require('../model/User');
const bcrypt = require('bcryptjs'); 

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt); 

        let newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashPassword,
        });

        let savedUser = await newUser.save();

        res.status(200).json({message: "New user has been created", payload: savedUser});
    } catch (error) {
        //fix error, if error code 11000, response with _____ is already in use
        res.status(500).json(error);
    }
};

module.exports = {
    createUser,
};