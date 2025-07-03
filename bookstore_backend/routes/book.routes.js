const {
  fetchBooks,
  addBook,
  deleteBook,
  editBook,
  singleFetchBook,
} = require("../controllers/book.controller");

const router = require("express").Router();

const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/auth.middleware");

// public
router.get("/fetch", fetchBooks);
router.get("/:id", singleFetchBook);

// ADMIN PROTECTED
router.post("/add", authenticateToken, authorizeRoles("admin"), addBook);
router.patch("/:id", authenticateToken, authorizeRoles("admin"), editBook);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deleteBook);

module.exports = router;
