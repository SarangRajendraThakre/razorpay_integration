const dotenv = require("dotenv");
const Razorpay = require("razorpay");

// Load environment variables
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createRazorPayInstance = () => razorpayInstance;
