import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "../Footer";

const Landing = () => {
  return (
    <div className="bg-white text-yellow-metal-900 min-h-screen flex flex-col">
      <Hero/>
      <Features />
      <Footer />
    </div>
  );
};

export default Landing;
