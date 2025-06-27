import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import Hero from "./Hero";
import Features from "./Features";

const Landing = () => {
  return (
    <div className="bg-white text-yellow-metal-900 min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Landing;
