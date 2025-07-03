// database/connection.js
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to Supabase PostgreSQL via Sequelize");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

// Initialize models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("✅ DB synced and updated to match models");
  })
  .catch((err) => {
    console.error("❌ Sync error:", err);
  });

// Import and initialize models
const bookModel = require("./models/book.model");
db.books = bookModel(sequelize, DataTypes); // 💡 This line is crucial

const userModel = require("./models/user.model");
db.users = userModel(sequelize, DataTypes);

const orderModel = require("./models/order.model");
const orderItemModel = require("./models/orderItem.model");

db.orders = orderModel(sequelize, DataTypes);
db.order_items = orderItemModel(sequelize, DataTypes);

// Relationships
db.users.hasMany(db.orders, { foreignKey: "user_id" });
db.orders.belongsTo(db.users, { foreignKey: "user_id" });

// Orders and Books many-to-many via OrderItem
db.orders.belongsToMany(db.books, {
  through: db.order_items,
  foreignKey: "order_id",
  otherKey: "book_id",
  as: "books",
});

db.books.belongsToMany(db.orders, {
  through: db.order_items,
  foreignKey: "book_id",
  otherKey: "order_id",
  as: "orders",
});

module.exports = db;
