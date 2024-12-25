// payment.routes.js
const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");

router.post("/createOrder", createOrder);
router.post("/verifyPayment", verifyPayment);

module.exports = router;
