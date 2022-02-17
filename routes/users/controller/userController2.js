const User = require('../model/User');
const bcrypt = require('bcryptjs'); 
//MIDDLEWARE can be a function
//Happens between the request and the response

const checkCharNum = (str) => {
    if (str.match(/[!`\-_=@#$%^&*()\[\],.?':;{}\<>1234567890]/g)) {
        return true;
    } else return false;
};
const checkCharSpace = (str) => {
    if (str.match(/[!`\-_=@#$%^&*()\[\],.?':;{}\<>\s]/g)) {
        return true;
    } else false;
};
const checkValidEmail = (str) => {
    if (str.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/g)) {
        return true;
    } else false;
};
const checkValidPassword = (str) => {
    return str.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g
    );
};
const checkIfEmpty = (str) => {
    if (str.length === 0 || str.length === null)
        return true;
};
const createUser = async (req, res) => {
    try {
        let errObj = {};
        const { firstName, lastName, username, email, password } = req.body;

        let body = req.body;

        for (let key in req.body) {
            if(checkIfEmpty(body[key])) {
                errObj[key] = `${key} cannot be empty`;
            }
        }

        if (checkCharNum(firstName)) {
            errObj.firstName = "first name should only have letters, no special characters or numbers";
        }
        if (checkCharNum(lastName)) {
            errObj.lastName = "last name should only have letters, no special characters or numbers";
        }
        if (checkCharSpace(username)) {
            errObj.username = "username should not contain special characters or space";
        }
        if (!checkValidEmail(email)) {
            errObj.email = 'Please use a valid email address';
        }
        if (!checkValidPassword(password)) {
            errObj.password =
                'Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character, and at least 8 characters long';
        }

        let checkObj = Object.keys(errObj); //creates an array of object keys 

        if (checkObj.length > 0) {
            return res.json(errObj)
        }
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
        res.status(500).json(error);
    }
};

module.exports = {
    createUser,
};