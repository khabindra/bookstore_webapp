import React, { useState, useEffect } from "react";
import API from "../api";
import {
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaShoppingBag,
} from "react-icons/fa";

import Header from "../components/Header";

import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const UserOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/api/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="text-center py-8">Loading orders...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  const handleDelete = async (orderId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete and cancel this order and buy again?"
      )
    )
      return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove from local state
      setOrders((prev) => prev.filter((order) => order.id !== orderId));

      // ✅ Redirect to books page
      navigate("/");
    } catch (err) {
      setError("Failed to delete the order");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FaShoppingBag className="text-blue-600" /> My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">You haven't placed any orders yet.</p>
          <button
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => (window.location.href = "/")}
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <FaBoxOpen className="text-gray-500" /> Order #{order.id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.order_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${order.total_amount}</p>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.delivery_status
                    )}`}
                  >
                    <p>Delivery status: </p>

                    {order.delivery_status === "shipped" && (
                      <FaTruck className="inline-block" />
                    )}
                    {order.delivery_status === "delivered" && (
                      <FaCheckCircle className="inline-block" />
                    )}
                    {order.delivery_status === "rejected" && (
                      <FaTimesCircle className="inline-block" />
                    )}
                    {order.delivery_status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="p-4">
                <h3 className="font-semibold mb-4">Items</h3>
                <ul className="divide-y">
                  {order.books.map((book) => (
                    <li
                      key={book.id}
                      className="py-4 flex items-center justify-between"
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src={book.image}
                          alt={book.bookName}
                          className="h-20 w-16 object-cover rounded shadow"
                        />
                        <div>
                          <p className="font-medium">{book.bookName}</p>
                          <p className="text-xs text-gray-500 italic">
                            by {book.bookAuthor}
                          </p>
                          <p className="text-sm text-gray-600">
                            {book.OrderItem.quantity} × $
                            {book.OrderItem.price_at_purchase}
                          </p>
                        </div>
                      </div>
                      <div className="text-right font-semibold">
                        $
                        {(
                          book.OrderItem.quantity *
                          book.OrderItem.price_at_purchase
                        ).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              {/* Footer */}
              <div className="p-4 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Payment:</span>{" "}
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        order.payment_status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </p>
                  <p className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-500" />{" "}
                    {order.shipping_address.name},{" "}
                    {order.shipping_address.address},{" "}
                    {order.shipping_address.city},{" "}
                    {order.shipping_address.state} {order.shipping_address.zip}{" "}
                    ({order.shipping_address.phone})
                  </p>
                </div>

                {/* ✅ ACTION BUTTONS */}
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  {/* Cancel button */}
                  {(order.delivery_status === "pending" ||
                    order.delivery_status === "processing") && (
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Cancel Order
                    </button>
                  )}

                  {(order.payment_status === "failed" ||
                    order.delivery_status === "rejected") && (
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Delete & Buy Again
                    </button>
                  )}

                  {/* Delete button */}
                  {order.delivery_status === "delivered" && (
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                      Delete Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MyOrders = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-gray-200 dark:bg-gray-500 py-8 px-4 md:px-8">
        {/* Wrap Checkout with container for proper spacing */}
        <div className="max-w-7xl mx-auto">
          <UserOrder />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyOrders;
