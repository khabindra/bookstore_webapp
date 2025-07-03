import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const Card = ({ book }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/books/${book.id}`, { state: { book } });
  };

  // Generate star ratings (random for demo)
  const renderStars = () => {
    const rating = Math.floor(Math.random() * 3) + 3; // Random rating between 3-5
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={`text-sm ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Book Cover with Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={
            book.image ||
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
          }
          alt={book.bookName}
        />

        {/* Overlay Buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
          <button className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-100 transition">
            <FaShoppingCart className="text-blue-600" />
          </button>
          <button className="bg-white p-3 rounded-full shadow-lg hover:bg-red-100 transition">
            <FaRegHeart className="text-red-500" />
          </button>
        </div>

        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
          ₹{book.price}
        </div>
      </div>

      {/* Book Info */}
      <div className="p-5">
        {/* Genre Tag */}
        <div className="mb-3">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
            {book.bookGenre || "Fiction"}
          </span>
        </div>

        {/* Title and Author */}
        <h3
          className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 hover:text-blue-600 transition-colors"
          title={book.bookName}
        >
          {book.bookName}
        </h3>
        <p className="text-sm text-gray-500 mb-3 flex items-center">
          <span className="mr-2">by</span>
          <span className="font-medium text-gray-700">
            {book.bookAuthor || "Unknown Author"}
          </span>
        </p>

        {/* Ratings */}
        <div className="flex items-center mb-4">
          <div className="flex mr-2">{renderStars()}</div>
          <span className="text-xs text-gray-500">(128 reviews)</span>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleView}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
