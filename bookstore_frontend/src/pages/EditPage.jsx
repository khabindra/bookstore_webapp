import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  if (!book) {
    navigate("/");
    return null;
  }

  // Controlled form state
  const [title, setTitle] = useState(book.bookName);
  const [author, setAuthor] = useState(book.bookAuthor);
  const [genre, setGenre] = useState(book.bookGenre);
  const [bookPrice, setBookPrice] = useState(book.price);
  const [image, setImage] = useState(book.image);
  const [description, setDescription] = useState(book.description);
  const [stock, setStock] = useState(book.stock);

  // UI feedback states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = async () => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const updatedBook = {
        bookName: title,
        bookAuthor: author,
        bookGenre: genre,
        price: Number(bookPrice),
        image: image,
        description: description,
        stock: Number(stock),
      };

      await API.patch(`/api/books/${book.id}`, updatedBook);
      setSuccess("Book updated successfully!");
      setTimeout(() => navigate("/"), 1500); // Wait briefly before redirecting
    } catch (err) {
      setError("Failed to update the book. Please try again.");
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChange();
          }}
        >
          <h2 className="text-2xl font-bold mb-4">Edit Book Details</h2>

          {/* Feedback Messages */}
          {success && <p className="text-green-600 mb-3">{success}</p>}
          {error && <p className="text-red-600 mb-3">{error}</p>}

          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block font-semibold text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            />
          </div>

          {/* Image field */}
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block font-semibold text-gray-700 mb-2"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={loading}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block font-semibold text-gray-700 mb-2"
            >
              image url
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={loading}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            />
          </div>

          {/* description field */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block font-semibold text-gray-700 mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            />
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block font-semibold text-gray-700 mb-2"
            >
              Genre
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              disabled={loading}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            >
              <option value="">-- Select Genre --</option>
              <option value="poetry">Poetry</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-fiction</option>
              <option value="philosophy">Philosophy</option>
              <option value="biography">Biography</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block font-semibold text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={bookPrice}
              onChange={(e) => setBookPrice(e.target.value)}
              disabled={loading}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            />
          </div>

          {/* Stock field */}
          <div className="mb-6">
            <label
              htmlFor="stock"
              className="block font-semibold text-gray-700 mb-2"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              disabled={loading}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            />
          </div>
          {/* Submit Button */}
          <Button type="submit" color="green" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditPage;
