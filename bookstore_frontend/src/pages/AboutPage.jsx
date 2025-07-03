import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const AboutPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <div className="sm:flex items-center max-w-screen-xl">
            <div className="sm:w-1/2 p-10">
              <div className="image object-center text-center">
                <img src="https://i.imgur.com/WbQnbas.png" />
              </div>
            </div>
            <div className="sm:w-1/2 p-5">
              <div className="text">
                <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
                  About us
                </span>
                <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
                  About <span className="text-indigo-600">Our Bookstore</span>
                </h2>
                <p className="text-gray-700">
                  Founded with a passion for stories and learning, our bookstore
                  is a cozy haven for readers of all ages. Whether you're
                  searching for bestselling novels, timeless classics, or the
                  latest academic titles, we have something for every curious
                  mind. We believe in building a community around books,
                  offering personalized recommendations, hosting author events,
                  and supporting local writers. Our mission is to make reading
                  accessible and enjoyable for everyone—because every great
                  story deserves to be read.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
