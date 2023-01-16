import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

// Components Imports
import PreNav from "./components/PreNav";
import Header from "./components/Header";
import Catagories from "./components/Catagories";
import FeaturedProducts from "./components/FeaturedProducts";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer";
import PreFooter from "./components/PreFooter";

const Home = () => {
  // Changing The Title
  useEffect(() => {
    document.querySelector("title").textContent = "E-Com | Home";
  });

  return (
    <>
      <PreNav />
      <Header />
      <Catagories />
      <FeaturedProducts />
      <NewsLetter />
      <PreFooter />
      <Footer />
    </>
  );
};

export default Home;
