// Preview.js
import React from 'react';
import Navbar1 from './Preview/Navbar1';
import Home1 from './Preview/Home1';
import Home2 from './Preview/Home2';
import Testimonial1 from './Preview/Testimonial1';
import Subscription1 from './Preview/Subscription1';
import FAQ1 from './Preview/FAQ1';
import Footer1 from './Preview/Footer1';
import Instructors1 from './Preview/Instructors1';
import Terms1 from './Preview/Terms1';

const Preview = ({ currentSection }) => {

  return (
    <div className='h-[100%] pb-[29%]'>
      <Navbar1 />
      {(currentSection === 0 ||
        currentSection === 1 ||
        currentSection === 2) &&
        <div className=" bg-[#30AFBC]">
          <Home1 />
          <Home2 />
        </div>}
      {currentSection === 3 && <Testimonial1 />}
      {currentSection === 4 && <Subscription1 />}
      {currentSection === 5 && <FAQ1 />}
      {currentSection === 6 && <Instructors1 />}
      {currentSection === 7 && <Terms1 />}
      <Footer1 />
    </div>
  );
};

export default Preview;
