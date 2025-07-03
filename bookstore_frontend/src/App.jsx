import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import SinglePage from "./pages/SinglePage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicePage from "./pages/ServicePage";
import DeletePage from "./pages/DeletePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";

import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./components/CheckoutPage";
import MyOrders from "./pages/MyOrders";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

const BookRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/single-page/${id}`} replace />;
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* home */}
          <Route path="/" element={<HomePage />} />
          {/* auth */}
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/signup-page" element={<SignUpPage />} />
          {/* static  */}
          <Route path="/about-page" element={<AboutPage />} />
          <Route path="/contact-page" element={<ContactPage />} />
          <Route path="/service-page" element={<ServicePage />} />
          {/* books crud */}
          <Route path="/single-page/:id" element={<SinglePage />} />
          <Route path="/books/:id" element={<BookRedirect />} />
          <Route path="/edit-page" element={<EditPage />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/delete-page" element={<DeletePage />} />
          {/* cart */}
          <Route path="/cart" element={<Cart />} />
          {/* checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* user order  */}
          <Route path="/user-orders" element={<MyOrders />} />
          {/* admin order */}
          <Route path="admin-orders" element={<Orders />} />
          <Route path="/admin/orders/:orderId" element={<OrderDetails />} />

          {/* universal */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
