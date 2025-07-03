import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SingleCard from "../components/SingleCard"; // Import your component
import Button from "../components/Button";
import API from "../api";

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleBook = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/api/books/${id}`);
        if (response.data && response.data.book) {
          setBook(response.data.book);
        } else {
          setError("Book data not found");
        }
      } catch (err) {
        console.error("Error fetching single book:", err);
        setError("Failed to fetch book data");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
          <p className="text-lg text-gray-600">Loading book details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-red-100 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.role;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl flex justify-center">
        {/* Use your SingleCard component here */}
        <SingleCard book={book} role={role} />
      </main>
      {role && role === "admin" ? (
        <div className="flex justify-center gap-4 p-4 bg-gray-50">
          {/* Action Buttons */}
          <Button
            color="yellow"
            onClick={() => navigate("/edit-page", { state: { book } })}
            className="flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </Button>

          <Button
            color="red"
            onClick={() => navigate("/delete-page", { state: { book } })}
            className="flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Delete
          </Button>
        </div>
      ) : null}

      <Footer />
    </div>
  );
};

export default SinglePage;
