import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

import NoUserPage from "./NoUserPage";
import API from "../api";

const HomePage = () => {
  const navigate = useNavigate();

  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/books/fetch");
        const { datas } = response.data; // assuming datas is array
        setBookList(datas);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {storedUser &&
      (storedUser.role === "user" || storedUser.role === "admin") ? (
        <div className="flex-grow">
          <div className="px-4 py-6 max-w-screen-2xl mx-auto">
            {bookList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {bookList.map((book) => (
                  <div
                    key={book.id}
                    className="transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                    onClick={() => navigate(`/single-page/${book.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && navigate(`/single-page/${book.id}`)
                    }
                  >
                    <div className="group relative h-full rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-300 transition border-opacity-70">
                      <Card book={book} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Books Available
                </h3>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoUserPage />
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
