import React from "react";
import Header from "../components/Home/Header";
import Navbar from "../components/Home/Navbar";
import FAQ from "../components/Home/Faq";
import FOOTER from "../components/Home/Footer";
import Price from "../components/Home/Price";
import Services from "../components/Home/services";
import Testimonial from "../components/Home/Testimonials";

function Home() {

  return (
    <div className=" overflow-hidden">
      <Navbar/>

      <Header/>

      <Services/>

      <Testimonial/>


      <Price/>

      <FAQ />

      <FOOTER/>

      {/* <Testimonial/> */}
    </div>
  );
}

export default Home;
