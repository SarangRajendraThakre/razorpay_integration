const express = require("express");
const cors = require("cors");
const router = require("./routes/payment.routes");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

// Start server
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
