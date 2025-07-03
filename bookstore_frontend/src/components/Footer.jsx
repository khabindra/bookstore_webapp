import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">
      {/* Main grid: 4 columns on md+ screens, stacked on smaller */}
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="font-extrabold text-3xl text-indigo-600 mb-4">
            BookNest
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-xs">
            Your cozy corner for books in Budhanilkantha, Kathmandu, Nepal.
            Dedicated to fostering a love for reading.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm uppercase text-indigo-600 font-semibold mb-4">
            Resources
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href="/documentation"
                className="block text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="/tutorials"
                className="block text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Tutorials
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="flex items-center justify-between text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Support
                <span className="ml-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                  New
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm uppercase text-indigo-600 font-semibold mb-4">
            Support
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href="/help-center"
                className="block text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="block text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-conditions"
                className="block text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-sm uppercase text-indigo-600 font-semibold mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href="https://maps.app.goo.gl/your-map-link"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Budhanilkantha, Kathmandu, Nepal
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@booknest.com"
                className="block text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                contact@booknest.com
              </a>
            </li>
            <li>
              <a
                href="tel:+977-9801234567"
                className="block text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                +977-9801234567
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom section: social icons and copyright */}
      <div className="bg-gray-50 border-t border-gray-200 py-6 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-600 text-sm text-center md:text-left">
            © {new Date().getFullYear()} BookNest Bookstore — All rights
            reserved.
          </div>

          {/* Social Icons */}
          <div className="flex space-x-8 justify-center md:justify-end">
            <a
              href="https://facebook.com/booknest"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/booknest"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/booknest"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://pinterest.com/booknest"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 text-2xl"
            >
              <FaPinterest />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
