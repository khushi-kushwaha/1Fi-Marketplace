const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Product API routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "1Fi Marketplace API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});