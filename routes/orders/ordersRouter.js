const express = require("express");
const router = express.Router();
const { jwtMiddleware } = require("../users/lib/authMiddleware/index");
const {createOrder, getAllOrders, deleteOrder, updateOrder} = require('./controller/orderController');

router.get("/", (req, res) => {
    res.send("hello from order router");
});

router.post("/create-order", jwtMiddleware, createOrder);
router.get('/get-all-orders', jwtMiddleware, getAllOrders);
router.delete('/delete-order/:id', jwtMiddleware, deleteOrder);
router.put("/update-order", jwtMiddleware, updateOrder); 
module.exports = router;