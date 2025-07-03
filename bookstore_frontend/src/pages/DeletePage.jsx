import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import API from "../api";

const DeletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state || {};
  console.log("the data comming from the parents is: ", location.state);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await API.delete(`/api/books/${book.id}`);
      alert("Item deleted successfully!");
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error deleting the item:", error);
      alert("Failed to delete item.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-sm text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Are you sure you want to delete?
          </h2>
          <p className="text-gray-600 mb-6">This action cannot be undone.</p>

          <div className="flex justify-center space-x-4">
            {/* OK / Confirm Button */}
            <form onSubmit={handleDelete}>
              <Button color="red" type="submit">
                OK
              </Button>
            </form>

            {/* Cancel Button */}
            <Button color="gray" type="button" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeletePage;
