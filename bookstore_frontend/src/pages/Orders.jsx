import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/api/orders/admin", {
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

  const handleStatusUpdate = async (orderId, field, value) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/api/orders/admin/${orderId}/status`,
        { [field]: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, [field]: value } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status");
    }
  };

  // ✅ Delete handler
  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(orders.filter((order) => order.id !== orderId));
      alert(`Order #${orderId} has been deleted.`);
    } catch (err) {
      console.error("Failed to delete order:", err);
      alert("Failed to delete order.");
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">All Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Payment Status</th>
              <th className="py-3 px-4 text-left">Delivery Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-3 px-4">#{order.id}</td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium">{order.User?.username}</p>
                    <p className="text-sm text-gray-500">{order.User?.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">${order.total_amount}</td>
                <td className="py-3 px-4">
                  <select
                    value={order.payment_status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        order.id,
                        "payment_status",
                        e.target.value
                      )
                    }
                    className={`px-2 py-1 rounded ${getStatusColor(
                      order.payment_status
                    )}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={order.delivery_status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        order.id,
                        "delivery_status",
                        e.target.value
                      )
                    }
                    className={`px-2 py-1 rounded ${getStatusColor(
                      order.delivery_status
                    )}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 hover:text-blue-700 transition"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleDelete(order.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-red-600 text-red-600 rounded hover:bg-red-50 hover:text-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-gray-200 dark:bg-gray-700 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AdminOrders />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
