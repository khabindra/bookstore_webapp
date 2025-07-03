// const db = require("../database/connection");
// const Order = db.orders;
// const OrderItem = db.order_items;
// const Book = db.books;

// // Create new order
// exports.createOrder = async (req, res) => {
//   const { items, shipping_address } = req.body;

//   try {
//     let totalAmount = 0;

//     // Calculate total price & validate stock
//     for (let item of items) {
//       const book = await Book.findByPk(item.book_id);
//       if (!book || book.stock < item.quantity) {
//         return res
//           .status(400)
//           .json({ message: `Insufficient stock for book ID ${item.book_id}` });
//       }
//       totalAmount += book.price * item.quantity;
//     }

//     // Create order
//     const order = await Order.create({
//       user_id: req.user.id,
//       total_amount: totalAmount,
//       shipping_address,
//     });

//     // Insert into order_items and update stock
//     for (let item of items) {
//       const book = await Book.findByPk(item.book_id);
//       await OrderItem.create({
//         order_id: order.id,
//         book_id: item.book_id,
//         quantity: item.quantity,
//         price_at_purchase: book.price,
//       });
//       await book.update({ stock: book.stock - item.quantity });
//     }

//     res.status(201).json({ message: "Order placed", orderId: order.id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get user orders
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.findAll({
//       where: { user_id: req.user.id },
//       include: [
//         {
//           model: Book,
//           as: "books",
//           through: {
//             attributes: ["quantity", "price_at_purchase"],
//           },
//         },
//       ],
//     });
//     res.json(orders);
//   } catch (err) {
//     console.error("🔥 Error fetching user orders:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Admin: get all orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.findAll({
//       include: [
//         {
//           model: Book,
//           as: "books", // Alias must match the one in connection.js
//           through: {
//             attributes: ["quantity", "price_at_purchase"], // Include OrderItem info
//           },
//         },
//         {
//           model: db.users,
//           attributes: ["id", "username", "email"], // optional: user info
//         },
//       ],
//     });

//     res.json(orders);
//   } catch (err) {
//     console.error("🔥 Error fetching orders:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Admin: update delivery/payment status
// exports.updateOrderStatus = async (req, res) => {
//   const { delivery_status, payment_status } = req.body;

//   try {
//     const order = await Order.findByPk(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     await order.update({
//       delivery_status: delivery_status || order.delivery_status,
//       payment_status: payment_status || order.payment_status,
//     });

//     res.json({ message: "Order updated", order });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// ==========================================
// controllers/order.controller.js
const db = require("../database/connection");
const { sequelize } = db;

const Order = db.orders;
const OrderItem = db.order_items;
const Book = db.books;
const User = db.users;

// Create new order
exports.createOrder = async (req, res) => {
  const { items, shipping_address } = req.body;

  // Validate payload
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No items to order" });
  }

  const requiredAddressFields = [
    "name",
    "address",
    "city",
    "state",
    "zip",
    "phone",
  ];
  for (const field of requiredAddressFields) {
    if (!shipping_address?.[field]) {
      return res
        .status(400)
        .json({ message: `Missing shipping_address.${field}` });
    }
  }

  // Convert book_ids to numbers and validate
  for (const [index, item] of items.entries()) {
    item.book_id = Number(item.book_id);
    if (isNaN(item.book_id) || !item.quantity || item.quantity <= 0) {
      return res.status(400).json({
        message: `Item ${index}: Invalid book_id or quantity`,
      });
    }
  }

  const t = await sequelize.transaction();
  try {
    // Aggregate quantities per book
    const bookQuantities = {};
    items.forEach((item) => {
      bookQuantities[item.book_id] =
        (bookQuantities[item.book_id] || 0) + item.quantity;
    });

    // Fetch all books at once
    const books = await Book.findAll({
      where: { id: Object.keys(bookQuantities) },
      transaction: t,
    });

    // Validate stock and calculate total
    let totalAmount = 0;
    const stockErrors = [];

    books.forEach((book) => {
      const requiredQty = bookQuantities[book.id];
      if (book.stock < requiredQty) {
        stockErrors.push(
          `Insufficient stock for ${book.bookName} (ID: ${book.id})`
        );
      }
      totalAmount += book.price * requiredQty;
    });

    // Check for missing books
    const foundBookIds = books.map((book) => book.id);
    Object.keys(bookQuantities).forEach((book_id) => {
      if (!foundBookIds.includes(Number(book_id))) {
        stockErrors.push(`Book ID ${book_id} not found`);
      }
    });

    if (stockErrors.length > 0) {
      await t.rollback();
      return res.status(400).json({ errors: stockErrors });
    }

    // Create order
    const order = await Order.create(
      {
        user_id: req.user.id,
        total_amount: totalAmount.toFixed(2),
        shipping_address,
      },
      { transaction: t }
    );

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      book_id: item.book_id,
      quantity: item.quantity,
      price_at_purchase: books.find((b) => b.id === item.book_id).price,
    }));

    await OrderItem.bulkCreate(orderItems, { transaction: t });

    // Update stock in bulk
    await Promise.all(
      books.map((book) =>
        book.decrement("stock", {
          by: bookQuantities[book.id],
          transaction: t,
        })
      )
    );

    await t.commit();

    // Fetch created order with relations
    const createdOrder = await Order.findByPk(order.id, {
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        {
          model: Book,
          as: "books",
          through: { attributes: ["quantity", "price_at_purchase"] },
        },
      ],
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order: createdOrder,
    });
  } catch (err) {
    await t.rollback();
    console.error("❌ createOrder error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all orders for the logged‑in user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Book,
          as: "books",
          through: { attributes: ["quantity", "price_at_purchase"] },
        },
      ],
      order: [["order_date", "DESC"]],
    });

    return res.json(orders);
  } catch (err) {
    console.error("❌ getUserOrders error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Admin: get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
        {
          model: Book,
          as: "books",
          through: { attributes: ["quantity", "price_at_purchase"] },
        },
      ],
      order: [["order_date", "DESC"]],
    });

    return res.json(orders);
  } catch (err) {
    console.error("❌ getAllOrders error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Admin: update delivery and/or payment status
exports.updateOrderStatus = async (req, res) => {
  const { delivery_status, payment_status } = req.body;

  if (!delivery_status && !payment_status) {
    return res
      .status(400)
      .json({ message: "Provide delivery_status and/or payment_status" });
  }

  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.update({
      delivery_status: delivery_status || order.delivery_status,
      payment_status: payment_status || order.payment_status,
    });

    return res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("❌ updateOrderStatus error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Get order by ID (with authorization)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
        {
          model: Book,
          as: "books",
          through: { attributes: ["quantity", "price_at_purchase"] },
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Authorization: User can access their own orders, admin can access any
    if (req.user.role !== "admin" && order.user_id !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized: You can only access your own orders",
      });
    }

    return res.json(order);
  } catch (err) {
    console.error("❌ getOrderById error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete order (admin only)
exports.deleteOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Book,
          as: "books",
          through: { attributes: ["quantity", "book_id"] },
        },
      ],
      transaction: t,
    });

    if (!order) {
      await t.rollback();
      return res.status(404).json({ message: "Order not found" });
    }

    // Restore book quantities before deleting
    await Promise.all(
      order.books.map(async (book) => {
        const quantity = book.OrderItem.quantity;
        await Book.increment("stock", {
          by: quantity,
          where: { id: book.id },
          transaction: t,
        });
      })
    );

    // Delete order items
    await OrderItem.destroy({
      where: { order_id: order.id },
      transaction: t,
    });

    // Delete the order
    await order.destroy({ transaction: t });

    await t.commit();
    return res.json({ message: "Order deleted successfully" });
  } catch (err) {
    await t.rollback();
    console.error("❌ deleteOrder error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
