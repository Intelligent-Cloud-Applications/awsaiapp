import React from "react";
import Header from "../components/Home/Header";
import Testimonial from "../components/Home/testimonial";
import Navbar from "../components/Home/Navbar";
import FAQ from "../components/Home/Faq";
import FOOTER from "../components/Home/Footer";


function Home() {




  return (
    <div className=" overflow-hidden">
      <Navbar />

      <Header />

<Testimonial/>

<FAQ/>

<FOOTER/>



      {/* <Testimonial/> */}


    </div>
  );
}

export default Home;