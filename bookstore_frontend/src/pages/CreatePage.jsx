import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import API from "../api";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookName: "",
    bookAuthor: "",
    bookGenre: "",
    price: "",
    image: "", // ✅ Added image field
    description: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bookName: formData.bookName,
        bookAuthor: formData.bookAuthor,
        bookGenre: formData.bookGenre,
        price: formData.price,
        image: formData.image, // ✅ Added image to payload
        description: formData.description,
        stock: formData.stock,
      };
      await API.post("/api/books/add", payload);
      alert("Data Added successfully!!");
      navigate("/");
    } catch (err) {
      console.error("Error submitting data", err?.response?.data || err);
      alert(
        "Error submitting data: " +
          (err?.response?.data?.error || "Unknown error")
      );
    }
  };

  return (
    <>
      <Header />
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto p-6 bg-white shadow-md rounded"
        >
          <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>

          {/* Title Field */}
          <div className="mb-4">
            <label
              htmlFor="bookName"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              id="bookName"
              placeholder="title name.."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Author Field */}
          <div className="mb-4">
            <label
              htmlFor="bookAuthor"
              className="block text-gray-700 font-semibold mb-2"
            >
              Author
            </label>
            <input
              type="text"
              name="bookAuthor"
              value={formData.bookAuthor}
              onChange={handleChange}
              id="bookAuthor"
              placeholder="author name.."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL Field */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-semibold mb-2"
            >
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              id="image"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              id="description"
              required
              placeholder="write a description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Genre Field */}
          <div className="mb-4">
            <label
              htmlFor="bookGenre"
              className="block text-gray-700 font-semibold mb-2"
            >
              Genre
            </label>
            <select
              name="bookGenre"
              id="bookGenre"
              value={formData.bookGenre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Price Field */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-semibold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              id="price"
              placeholder="price here.."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* stock field */}
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-gray-700 font-semibold mb-2"
            >
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              id="stock"
              placeholder="stock here.."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Button color="green" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreatePage;
