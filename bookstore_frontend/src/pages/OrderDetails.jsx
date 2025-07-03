import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderDetailsMain = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data);
      } catch (err) {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "rejected":
      case "failed":
        return "bg-red-100 text-red-800";
      case "paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="text-center py-8">Loading order...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      <h1 className="text-3xl font-bold mb-2 text-white">Order #{order.id}</h1>
      <p className="text-white mb-4">
        Placed on {new Date(order.order_date).toLocaleDateString()}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Customer */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaUser /> Customer
          </h2>
          <p>
            <strong>{order.User?.username}</strong>
          </p>
          <p className="text-gray-500">{order.User?.email}</p>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Status</h2>
          <p>
            <span className="font-medium">Payment: </span>
            <span
              className={`px-2 py-1 rounded text-sm ${getStatusColor(
                order.payment_status
              )}`}
            >
              {order.payment_status}
            </span>
          </p>
          <p>
            <span className="font-medium">Delivery: </span>
            <span
              className={`px-2 py-1 rounded text-sm ${getStatusColor(
                order.delivery_status
              )}`}
            >
              {order.delivery_status}
            </span>
          </p>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow p-4 col-span-full">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaTruck /> Shipping Address
          </h2>
          <p>{order.shipping_address?.name}</p>
          <p>{order.shipping_address?.address}</p>
          <p>
            {order.shipping_address?.city}, {order.shipping_address?.state}{" "}
            {order.shipping_address?.zip}
          </p>
          <p>{order.shipping_address?.phone}</p>
        </div>
      </div>

      {/* Books */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <div className="divide-y">
          {order.books.map((book) => (
            <div key={book.id} className="flex items-center gap-4 py-4">
              <img
                src={book.image}
                alt={book.bookName}
                className="w-16 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{book.bookName}</p>
                <p className="text-sm text-gray-500">{book.bookAuthor}</p>
                <p className="text-sm text-gray-500">
                  {book.OrderItem.quantity} × $
                  {book.OrderItem.price_at_purchase}
                </p>
              </div>
              <p className="font-semibold">
                $
                {(
                  book.OrderItem.quantity * book.OrderItem.price_at_purchase
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right">
        <p className="text-xl font-bold">Total: ${order.total_amount}</p>
      </div>
    </div>
  );
};

const OrderDetails = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-gray-200 dark:bg-gray-500 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <OrderDetailsMain />
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default OrderDetails;
