import React from "react";

import {
  FaSearch,
  FaShoppingCart,
  FaShippingFast,
  FaBookReader,
  FaGift,
} from "react-icons/fa"; // Import necessary icons

const NoUserPage = () => {
  // Testimonial slider functionality (simplified for static content)
  const handleDotClick = (event) => {
    document
      .querySelectorAll(".dot")
      .forEach((dot) => dot.classList.remove("bg-primary-400"));
    event.target.classList.add("bg-primary-400");
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-24 px-5 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(22, 96, 136, 0.85), rgba(22, 96, 136, 0.85)), url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Explore our curated collection of bestsellers, new releases, and
            timeless classics. Find the perfect book for every mood.
          </p>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 px-5 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-600 mb-2">
            Featured Books
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-md mb-4"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover our handpicked selection of must-read books
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                alt="Book Cover"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">The Midnight Library</h3>
              <p className="text-gray-500 text-sm mb-4">Matt Haig</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-secondary-600 text-2xl">
                  $14.99
                </span>
                <button className="bg-primary-400 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-accent">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>

          <div className="book-card bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="book-img h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                alt="Book Cover"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="book-info p-6">
              <h3 className="book-title text-xl font-bold mb-1">
                Project Hail Mary
              </h3>
              <p className="book-author text-gray-500 text-sm mb-4">
                Andy Weir
              </p>
              <div className="book-price flex justify-between items-center">
                <span className="price font-bold text-secondary-600 text-2xl">
                  $18.99
                </span>
                <button className="add-to-cart bg-primary-400 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-accent">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>

          <div className="book-card bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="book-img h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=898&q=80"
                alt="Book Cover"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="book-info p-6">
              <h3 className="book-title text-xl font-bold mb-1">
                Klara and the Sun
              </h3>
              <p className="book-author text-gray-500 text-sm mb-4">
                Kazuo Ishiguro
              </p>
              <div className="book-price flex justify-between items-center">
                <span className="price font-bold text-secondary-600 text-2xl">
                  $16.49
                </span>
                <button className="add-to-cart bg-primary-400 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-accent">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>

          <div className="book-card bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="book-img h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80"
                alt="Book Cover"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="book-info p-6">
              <h3 className="book-title text-xl font-bold mb-1">
                The Four Winds
              </h3>
              <p className="book-author text-gray-500 text-sm mb-4">
                Kristin Hannah
              </p>
              <div className="book-price flex justify-between items-center">
                <span className="price font-bold text-secondary-600 text-2xl">
                  $15.99
                </span>
                <button className="add-to-cart bg-primary-400 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-accent">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-5 max-w-7xl mx-auto bg-light">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-600 mb-2">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-md mb-4"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            We offer more than just books - discover our full range of services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg text-center shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-20 h-20 bg-primary-400/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-400 text-4xl">
              <FaShippingFast />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-secondary-600">
              Fast Delivery
            </h3>
            <p className="text-gray-700">
              Get your books delivered to your doorstep within 2-3 business days
              with our reliable shipping service.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg text-center shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-20 h-20 bg-primary-400/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-400 text-4xl">
              <FaBookReader />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-secondary-600">
              Book Clubs
            </h3>
            <p className="text-gray-700">
              Join our vibrant book club community and connect with fellow
              readers to discuss your favorite books.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg text-center shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-20 h-20 bg-primary-400/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-400 text-4xl">
              <FaGift />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-secondary-600">
              Gift Wrapping
            </h3>
            <p className="text-gray-700">
              Make your gift extra special with our beautiful gift wrapping
              service, available at no extra cost.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-600 mb-2">
            What Our Readers Say
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-md mb-4"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Hear from our satisfied customers about their experience
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="italic text-xl mb-6">
              "BookNook has completely transformed my reading habits. Their
              recommendations are spot on, and the delivery is always prompt.
              I've discovered so many amazing books through their service!"
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary-400">
                <img
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="Client"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold text-secondary-600">
                  Sarah Johnson
                </h4>
                <p className="text-gray-500 text-sm">Book Club Member</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            <span
              className="dot w-3 h-3 rounded-full bg-primary-400 cursor-pointer"
              onClick={handleDotClick}
            ></span>
            <span
              className="dot w-3 h-3 rounded-full bg-gray-300 cursor-pointer"
              onClick={handleDotClick}
            ></span>
            <span
              className="dot w-3 h-3 rounded-full bg-gray-300 cursor-pointer"
              onClick={handleDotClick}
            ></span>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-primary-400 to-primary-600 py-20 px-5 text-center shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Stay Connected: Unlock Exclusive Content
          </h2>
          <p className="text-xl mb-10 opacity-90 leading-relaxed">
            Join our community for **priority access** to new book releases,
            **member-exclusive deals**, insightful reading recommendations, and
            updates on literary events. Elevate your reading experience with us.
          </p>
          <form className="flex flex-col sm:flex-row max-w-xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Your email address"
              className="flex-1 p-5 border-none text-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-accent-light"
            />
            <button
              type="submit"
              className="bg-accent text-white px-8 py-5 font-bold text-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-custom-red focus:outline-none focus:ring-4 focus:ring-accent-light"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-sm mt-6 opacity-80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </>
  );
};

export default NoUserPage;
