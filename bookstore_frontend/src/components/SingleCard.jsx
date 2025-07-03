import React, { useState } from "react";
import { FaUser, FaBook, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const SingleCard = ({ book, role }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  console.log(book);

  // Rating calculation
  const rating = book.rating || 4.2;

  // State for toggling description
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Render stars based on rating
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  // Description logic
  const descriptionText =
    book.description ||
    "This book doesn't have a description yet. Check back later for more information.";

  // Determine whether to truncate
  const shouldTruncate = descriptionText.length > 150; // or use line-clamp if preferred

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Book Cover */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <img
          className="w-full h-full object-contain transition-transform duration-500 hover:scale-105 p-4"
          src={
            book.image ||
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
          }
          alt={book.bookName}
        />

        {/* Stock Status */}
        <div
          className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
            book.stock > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-md">
          ₹{book.price}
        </div>
      </div>

      {/* Book Details */}
      <div className="p-6">
        {/* Title and Author */}
        <div className="mb-4">
          <h2
            className="text-xl font-bold text-gray-800 mb-1 line-clamp-1"
            title={book.bookName}
          >
            {book.bookName}
          </h2>
          <div className="flex items-center text-gray-600 text-sm">
            <FaUser className="mr-2 text-blue-500" />
            <span className="truncate">
              {book.bookAuthor || "Unknown Author"}
            </span>
          </div>
        </div>

        {/* Ratings */}
        <div className="flex items-center mb-3">
          <div className="flex mr-2">{renderStars()}</div>
          <span className="text-sm font-medium text-gray-600">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Genre and other details */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
            <FaBook className="text-purple-500 mr-2" />
            <span className="text-sm text-gray-700 truncate">
              {book.bookGenre || "General"}
            </span>
          </div>
        </div>

        {/* Description with toggle */}
        <div className="mb-4">
          <p
            className={`text-gray-600 text-sm mb-2 ${
              !showFullDescription && shouldTruncate ? " line-clamp-3" : ""
            }`}
          >
            {descriptionText}
          </p>
          {shouldTruncate && (
            <button
              onClick={toggleDescription}
              className="text-blue-500 text-sm font-semibold"
            >
              {showFullDescription ? "Show Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        {role && role === "user" && (
          <div className="flex gap-3">
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-300 shadow hover:shadow-md"
              onClick={() => addToCart(book)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCard;
