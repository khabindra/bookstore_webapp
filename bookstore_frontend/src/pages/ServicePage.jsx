import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ServicePage = () => {
  const services = [
    {
      title: "Smart Recommendations",
      description:
        "Discover books tailored to your taste using our AI-powered recommendation engine.",
      image:
        "https://thumbs.dreamstime.com/b/recommended-sign-thumb-up-approval-banner-approval-positive-rating-feedback-clients-customers-isolated-banner-208567611.jpg",
      alt: "Recommendations",
    },
    {
      title: "E-Library",
      description:
        "Access thousands of books anytime, anywhere from our digital library.",
      image:
        "https://images.vexels.com/media/users/3/216637/raw/5cb9c03787ab7860fdd5dc4d13a72043-digital-library-logo-design.jpg",
      alt: "Library",
    },
    {
      title: "Book Reviews",
      description:
        "Read and share honest book reviews with a passionate community of readers.",
      image:
        "https://st3.depositphotos.com/11956860/18595/v/600/depositphotos_185952126-stock-illustration-logo-icon-search-concept-reading.jpg",
      alt: "Reviews",
    },
    {
      title: "Reading Tracker",
      description:
        "Track your reading goals and habits to stay motivated and consistent.",
      image:
        "https://as2.ftcdn.net/v2/jpg/02/32/40/13/1000_F_232401359_x1kbjF4f5UOIO3HLs3GULeui1AA0X2pL.jpg",
      alt: "Tracker",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 py-12 flex-1">
        {/* Intro Section */}
        <div className="mb-12 text-center md:text-left md:w-2/3 lg:w-1/2 mx-auto md:mx-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-8 h-8 mx-auto md:mx-0 mb-4 text-secondary"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3 4.5A1.5 1.5 0 014.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19.5v-15zM7 7v10h10V7H7z" />
          </svg>
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl text-gray-900">
            BookNest Services
          </h2>
          <p className="text-gray-700 dark:text-gray-700 text-lg">
            At BookNest, we help you turn reading into an experience. Explore
            our core services below.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  width={80}
                  height={80}
                  className="mb-4 rounded-full object-cover"
                />
                <h5 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white hover:text-secondary transition-colors">
                  {service.title}
                </h5>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServicePage;
