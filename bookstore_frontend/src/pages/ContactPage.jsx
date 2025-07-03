import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header />

      {/* Main Content Container */}
      <div className="flex justify-center p-6 flex-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
          {/* Flex layout: Image & Info */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Logo & Summary */}
            <div className="md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start">
              <img
                src="https://static.vecteezy.com/system/resources/previews/024/245/907/original/bookstore-logo-template-illustration-free-vector.jpg"
                alt="BookNest Logo"
                className="w-48 h-48 rounded-xl border-4 border-indigo-800 dark:border-blue-900 object-contain transition-transform duration-300 hover:scale-105"
              />
              <h1 className="mt-4 text-2xl font-bold text-indigo-800 dark:text-white mb-2">
                BookNest Bookstore
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4 px-4 md:px-0">
                Kathmandu’s Favorite Online & Offline Bookstore
              </p>
              <button className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 shadow-md">
                Visit Store
              </button>
            </div>

            {/* Right: Info & Contact Details */}
            <div className="md:w-2/3">
              {/* About Us */}
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
                About Us
              </h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                BookNest is a trusted Nepali bookstore offering a wide range of
                academic, fiction, non-fiction, and children’s books. Located in
                the heart of Kathmandu, we aim to inspire learning, imagination,
                and growth through literature. We provide delivery services
                across Nepal and support Nepali authors and publishers.
              </p>

              {/* Services */}
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
                Services
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "Home Delivery",
                  "Online Book Orders",
                  "Pre-orders & Imports",
                  "Student Discounts",
                  "Author Meetups",
                ].map((service) => (
                  <span
                    key={service}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Contact Information */}
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
                Contact Information
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  info@booknest.com.np
                </li>
                <li className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +977-9841234567
                </li>
                <li className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Putalisadak, Kathmandu, Nepal
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Fade-in Animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fadeIn 0.5s ease-out forwards;
            }
          `,
        }}
      />

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default ContactPage;
