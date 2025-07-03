import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Checkout from "./Checkout";
const CheckoutPage = () => {
  const itemsinthecart = JSON.parse(localStorage.getItem("cart"));
  console.log("itemsinthecart: ", itemsinthecart);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 py-8 px-4 md:px-8">
        {/* Wrap Checkout with container for proper spacing */}
        <div className="max-w-7xl mx-auto">
          <Checkout />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CheckoutPage;
