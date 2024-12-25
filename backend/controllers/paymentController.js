const { createRazorPayInstance } = require("../config/razorpay.config");
const crypto = require("crypto");

const razorpayInstance = createRazorPayInstance();

// Create Razorpay order
exports.createOrder = async (req, res) => {
  const { courseId, amount } = req.body;

  if (!courseId || !amount) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: courseId or amount",
    });
  }

  const options = {
    amount: amount * 100, // Amount in paise
    currency: "INR",
    receipt: `receipt_order_${courseId}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the order",
    });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  if (!order_id || !payment_id || !signature) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: order_id, payment_id, or signature",
    });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (expectedSignature === signature) {
      return res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      return res.status(400).json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "An error occurred during verification" });
  }
};
