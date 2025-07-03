import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api";

const Checkout = () => {
  const { cart, totalPrice, totalItems } = useContext(CartContext);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Load saved address if available
  useEffect(() => {
    const savedAddress = localStorage.getItem("shippingAddress");
    if (savedAddress) {
      setShippingAddress(JSON.parse(savedAddress));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate address
    const requiredFields = ["name", "address", "city", "state", "zip", "phone"];
    const missingField = requiredFields.find(
      (field) => !shippingAddress[field]
    );
    if (missingField) {
      setError(`Please fill in ${missingField.replace("_", " ")}`);
      setLoading(false);
      return;
    }

    // Prepare order data
    const orderData = {
      items: cart.map((item) => ({
        book_id: item.id,
        quantity: item.qty,
      })),
      shipping_address: shippingAddress,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Save address for future use
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

      // Clear cart and show success
      localStorage.removeItem("cart");
      setOrderSuccess(true);
    } catch (err) {
      // setError(err.response?.data?.error || "Failed to place order");
      const responseErrors = err.response?.data?.errors;
      if (responseErrors && responseErrors.length > 0) {
        setError(responseErrors.join(", "));
      } else {
        setError(err.response?.data?.error || "Failed to place order");
      }
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-4">
            Order Placed Successfully!
          </h1>
          <p className="mb-6">
            Thank you for your purchase. Your order has been placed and is being
            processed.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={() => (window.location.href = "/user-orders")}
            >
              View Orders
            </button>
            <button
              className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl text-white font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p>Your cart is empty</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => (window.location.href = "/")}
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex">
                  <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.image || "/placeholder-book.jpg"}
                      alt={item.bookName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.bookName}</h3>
                        <p className="ml-4">${item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.qty}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-base font-medium">
                <p>Total</p>
                <p>${totalPrice}</p>
              </div>
              <div className="flex justify-between text-base font-medium">
                <p>Total Items</p>
                <p>{totalItems}</p>
              </div>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={shippingAddress.zip}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
