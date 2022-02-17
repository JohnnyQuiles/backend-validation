const { isAlpha, isAlphanumeric, isEmail, isStrongPassword } = require('validator');

function validateCreateData(req, res, next) {
    let errObj = {};
    const { firstName, lastName, username, email, password } = req.body;

    if (!isAlpha(firstName)) {
        errObj.firstName = "first name should only have letters, no special characters or numbers";
    }
    if (!isAlpha(lastName)) {
        errObj.lastName = "last name should only have letters, no special characters or numbers";
    }
    if (!isAlphanumeric(username)) {
        errObj.username = "username should not contain special characters or space";
    }
    if (!isEmail(email)) {
        errObj.email = 'Please use a valid email address';
    }
    if (!isStrongPassword(password)) {
        errObj.password =
            'Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character, and at least 8 characters long';
    }

    let checkObj = Object.keys(errObj);

    if (checkObj.length > 0) {
        return res.status(500).json({ message: " There's an error", error: errObj });
    } else {
        next();
    }
};

module.exports = {
    validateCreateData,
};
