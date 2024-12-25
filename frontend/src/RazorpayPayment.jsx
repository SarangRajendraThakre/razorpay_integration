import React from "react";
import axios from "axios";

const RazorpayPayment = () => {
  const handlePayment = async () => {
    try {
      // Step 1: Create an Order (API call to your backend)
      const orderResponse = await axios.post("http://localhost:4000/api/createOrder", {
        courseId: "12345", // Replace with your course ID
        amount: 2, // Amount in INR
      });

      const { id, amount } = orderResponse.data;

      if (!id) {
        alert("Failed to create order. Check your backend.");
        return;
      }

      // Step 2: Initialize Razorpay
      const options = {
        key: "rzp_live_vFElILD3GDnG7Z", // Replace with your Razorpay Key ID
        amount: amount, // Amount in paise
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: id, // Order ID from backend
        handler: async function (response) {
          // Step 3: Verify Payment
          const verifyResponse = await axios.post("http://localhost:4000/api/verifyPayment", {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });

          if (verifyResponse.data.success) {
            alert("Payment Successful!");
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: "Test User",
          email: "testuser@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#528FF0",
        },
      };

      const razorpay = new window.Razorpay(options);

      // Open Razorpay Payment Modal
      razorpay.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Something went wrong! Check console for details.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Razorpay Payment Test</h1>
      <button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPayment;
