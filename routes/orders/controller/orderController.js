const Order = require('../model/Order');
const User = require('../../users/model/User');
const { isAlpha, isInt } = require("validator");
const { errorHandler } = require('../../users/utils/errorHandler');
const router = require('../ordersRouter');

const createOrder = async (req, res) => {
    try {
        // what are some good checks from validator
        const { orderName, orderAmount, orderItems } = req.body;

        let errObj = {};

        if (!isAlpha(orderName)) {
            errObj.orderName = "Alphabet only!";
        }
        if (!isInt(orderAmount)) {
            errObj.orderAmount = "Numbers only!";
        }
        if (Object.keys(errObj).length > 0) {
            return res.status(500).json({ message: "Error", error: errObj });
        }

        const decodedData = res.locals.decodedToken;
        const foundUser = await User.findOne({ email: decodedData.email });
        if (!foundUser) throw { message: "User not found" };

        const newOrder = new Order({
            orderName: orderName,
            orderAmount: orderAmount,
            orderItems: orderItems,
            orderOwner: foundUser.id,
        });

        const savedOrder = await newOrder.save();

        foundUser.orderHistory.push(savedOrder.id);

        await foundUser.save();

        res.status(200).json({ message: "saved new order", payload: savedOrder });
    } catch (error) {
        res.status(500).json(errorHandler(error));
    }
};

const getAllOrders = async (req, res) => {
    try {
        const decodedData = res.locals.decodedToken;

        const foundUser = await User.findOne({ email: decodedData.email });
        if (!foundUser) throw { message: "User not found" };

        const foundOrders = await Order.find({ orderOwner: foundUser.id });

        res.status(200).json({ payload: foundOrders });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);

        const decodedData = res.locals.decodedToken;
        const foundUser = await User.findOne({ email: decodedData.email });
        if (!foundUser) throw { message: "User not found" };

        //pull
        const pullItemFromArray = foundUser.orderHistory.pull(id);
        console.log(pullItemFromArray);

        await foundUser.save();

        // //fiter
        // const filteredArray = foundUser.orderHistory.filter((elem) => elem.toString() !== id );
        // console.log(filteredArray);

        // foundUser.orderHistory = filteredArray;

        await foundUser.save();

        res.status(200).json({ message: "deleted Order", payload: deletedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};
const updateOrder = async (req, res) => {
    try {
        const { orderId, orderAmount, orderName } = req.body;

        let errObj = {};

        if (!isAlpha(orderName)) {
            errObj.orderName = "Alphabet only!";
        }
        if (!isInt(orderAmount)) {
            errObj.orderAmount = "Numbers only!";
        }
        if (Object.keys(errObj).length > 0) {
            return res.status(500).json({ message: "Error", error: errObj });
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
            new: true,
        });
        console.log(updatedOrder);
        res
            .status(200)
            .json({ message: "Order has been updated", payload: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error", error: errorHandler(error) });
    }
};
module.exports = {
    createOrder,
    getAllOrders,
    deleteOrder,
    updateOrder
}
