// const { books } = require("../database/connection"); // ✅ Import books

// exports.fetchBooks = async function (req, res) {
//   const datas = await books.findAll();
//   res.json({
//     message: "books fetched successfully",
//     datas,
//   });
// };

// exports.addBook = async function (req, res) {
//   const { bookName, price, bookAuthor, bookGenre, image, description } =
//     req.body;

//   if (!bookName || !price || !image) {
//     return res
//       .status(400)
//       .json({ error: "bookName, price, and image are required" });
//   }

//   try {
//     await books.create({
//       bookName,
//       price,
//       bookAuthor,
//       bookGenre,
//       image,
//       description,
//     });
//     res.json({ message: "Book added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// exports.deleteBook = async function (req, res) {
//   const id = req.params.id;
//   await books.destroy({ where: { id } });
//   res.json({ message: "Book deleted successfully" });
// };

// exports.editBook = async function (req, res) {
//   try {
//     const id = req.params.id;
//     const { bookName, price, bookAuthor, bookGenre, image, description } =
//       req.body;

//     await books.update(
//       { bookName, price, bookAuthor, bookGenre, image, description },
//       { where: { id } }
//     );

//     res.json({ message: "Book updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// exports.singleFetchBook = async function (req, res) {
//   const id = req.params.id;
//   const datas = await books.findByPk(id);
//   res.json({
//     message: "Single book fetched successfully",
//     datas,
//   });
// };

const { books } = require("../database/connection");

exports.fetchBooks = async function (req, res) {
  try {
    const datas = await books.findAll();
    res.json({
      message: "Books fetched successfully",
      datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.addBook = async function (req, res) {
  const { bookName, price, stock, bookAuthor, bookGenre, image, description } =
    req.body;

  // Validate required fields
  if (!bookName || !price || stock === undefined) {
    return res.status(400).json({
      error: "bookName, price, and stock are required",
    });
  }

  try {
    const newBook = await books.create({
      bookName,
      price,
      stock,
      bookAuthor: bookAuthor || null,
      bookGenre: bookGenre || null,
      image: image || null,
      description: description || null,
    });

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.error(error);

    // Handle Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({ error: errors });
    }

    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.deleteBook = async function (req, res) {
  try {
    const id = req.params.id;
    const deleted = await books.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.editBook = async function (req, res) {
  try {
    const id = req.params.id;
    const {
      bookName,
      price,
      stock,
      bookAuthor,
      bookGenre,
      image,
      description,
    } = req.body;

    // Validate required fields
    if (!bookName || !price || stock === undefined) {
      return res.status(400).json({
        error: "bookName, price, and stock are required",
      });
    }

    const [updated] = await books.update(
      {
        bookName,
        price,
        stock,
        bookAuthor: bookAuthor || null,
        bookGenre: bookGenre || null,
        image: image || null,
        description: description || null,
      },
      {
        where: { id },
        returning: true, // Return the updated object
        individualHooks: true, // Run validations
      }
    );

    if (updated === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updatedBook = await books.findByPk(id);
    res.json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error(error);

    // Handle validation errors
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({ error: errors });
    }

    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.singleFetchBook = async function (req, res) {
  try {
    const id = req.params.id;
    const book = await books.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      message: "Book fetched successfully",
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
