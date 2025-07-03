const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Only allow this origin
  })
);

const db = require("./database/connection");

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/books", require("./routes/book.routes"));
app.use("/api/orders", require("./routes/order.routes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
