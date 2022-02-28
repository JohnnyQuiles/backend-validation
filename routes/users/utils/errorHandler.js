//make a function that takes in error coming in from user controller
//mix of MONGODB error and other errors in our controller
//in users: only used in the create and update 

const parseError = (error) => {
    let objKey = Object.keys(error.keyValue);
    let objValue = Object.values(error.keyValue);
    console.log("Key:", objKey[0], "Value:", objValue[0]);
    console.log(`${objKey[0]} ${objValue[0]} is already in use`);

    return `${objKey[0]} ${objValue[0]} is already in use`;
}
const errorHandler = (error) => {
    let message = "";

    if (error.code) {
        switch (error.code) {
            case 11000:
                message = parseError(error)
                break;
                default:
                message = "something is wrong, contact support";
        }
    }
    return message;
};

module.exports = {
    errorHandler,
}