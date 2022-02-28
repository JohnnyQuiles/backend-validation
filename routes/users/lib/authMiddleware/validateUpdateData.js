const { isAlpha, isAlphanumeric, isStrongPassword } = require('validator');

function validateUpdateData(req, res, next) {
    let errObj = {};
    const { firstName, lastName, username, password, confirmPassword } = req.body;

    if (!isAlpha(firstName)) {
        errObj.firstName = "first name should only have letters, no special characters or numbers";
    }
    if (!isAlpha(lastName)) {
        errObj.lastName = "last name should only have letters, no special characters or numbers";
    }
    if (!isAlphanumeric(username)) {
        errObj.username = "username should not contain special characters or space";
    }
    if (!isStrongPassword(password)) {
        errObj.password =
            'Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character, and at least 8 characters long';
    }
    if(password !== confirmPassword){
        errObj.confirmPassword = 'Password and confirm password do not match';
    }
    let checkObj = Object.keys(errObj);

    if (checkObj.length > 0) {
        return res.status(500).json({ message: " There's an error", error: errObj });
    } else {
        next();
    }
};

module.exports = {
    validateUpdateData,
};
