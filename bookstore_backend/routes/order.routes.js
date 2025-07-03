const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  deleteOrder,
} = require("../controllers/order.controller");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/auth.middleware");

// User routes
router.post("/create", authenticateToken, createOrder);
router.get("/my", authenticateToken, getUserOrders);

// Admin routes
router.get("/admin", authenticateToken, authorizeRoles("admin"), getAllOrders);
router.put(
  "/admin/:id/status",
  authenticateToken,
  authorizeRoles("admin"),
  updateOrderStatus
);

// Add these routes to your existing router
router.get("/:id", authenticateToken, getOrderById);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  deleteOrder
);

module.exports = router;
