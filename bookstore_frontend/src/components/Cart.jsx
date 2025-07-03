import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const MainCart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    totalItems,
  } = useContext(CartContext);

  const navigate = useNavigate(); // Hook to navigate

  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="bg-white shadow rounded p-4 my-6 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">No items in cart.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Table for large screens */}
          <table className="w-full min-w-[600px] table-fixed border-collapse border border-gray-300 hidden md:table">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 px-4 py-2 w-1/4">
                  Book Name
                </th>
                <th className="border border-gray-300 px-4 py-2 w-1/6">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 w-1/6">
                  Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2 w-1/6">
                  Total
                </th>
                <th className="border border-gray-300 px-4 py-2 w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    {item.bookName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Rs. {item.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => increaseQty(item.id)}
                      >
                        <FaPlus />
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => decreaseQty(item.id)}
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Rs. {item.price * item.qty}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove Item"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view: stacked */}
          <div className="md:hidden space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="border border-gray-300 rounded p-4">
                <h4 className="font-medium mb-2">{item.bookName}</h4>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Price:</span>
                  <span>Rs. {item.price}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => increaseQty(item.id)}
                    >
                      <FaPlus />
                    </button>
                    <span className="px-2">{item.qty}</span>
                    <button
                      className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => decreaseQty(item.id)}
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total:</span>
                  <span>Rs. {item.price * item.qty}</span>
                </div>
                <div className="flex justify-end">
                  <button
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove Item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 max-w-2xl mx-auto px-4">
          <div className="flex justify-between mb-2 font-semibold text-lg">
            <span>Total Items:</span>
            <span className="text-red-600">{totalItems}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Price:</span>
            <span className="text-green-600">Rs. {totalPrice}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

import Header from "./Header";
import Footer from "./Footer";

const Cart = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-gray-200 dark:bg-gray-700 py-8 px-4 md:px-8">
        {/* Wrap Checkout with container for proper spacing */}
        <div className="max-w-7xl mx-auto">
          <MainCart />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Cart;
