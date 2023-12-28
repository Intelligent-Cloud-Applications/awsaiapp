import { useEffect, useRef } from 'react';
import Navbar1 from './Preview/Navbar1';
import Home1 from './Preview/Home1';
import Home2 from './Preview/Home2';
import Testimonial1 from './Preview/Testimonial1';
import Subscription1 from './Preview/Subscription1';
import FAQ1 from './Preview/FAQ1';
import Footer1 from './Preview/Footer1';
import Instructors1 from './Preview/Instructors1';
import Terms1 from './Preview/Terms1';

const Preview = ({ currentSection, logo, setLogo, tagline, setTagline, video, setVideo, services, setServices, faqs, setFaqs}) => {
  const home1Ref = useRef(null);
  const testimonial1Ref = useRef(null);
  const subscription1Ref = useRef(null);
  const faq1Ref = useRef(null);
  const home2Ref = useRef(null);

  useEffect(() => {

    // Scroll to Home1 when currentSection is 1
    if (currentSection === 1 && home1Ref.current) {
      home1Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    // Scroll to Home2 when currentSection is 2
    if (currentSection === 2 && home2Ref.current) {
      home2Ref.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Scroll to Testimonial1 when currentSection is 3
    if (currentSection === 3 && testimonial1Ref.current) {
      testimonial1Ref.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Scroll to Subscription1 when currentSection is 4
    if (currentSection === 4 && subscription1Ref.current) {
      subscription1Ref.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Scroll to FAQ1 when currentSection is 5
    if (currentSection === 5 && faq1Ref.current) {
      faq1Ref.current.scrollIntoView({ behavior: 'smooth' });
    }

  });

  return (
    <div className='h-[100%] pb-[29%]'>
      <Navbar1 logo={logo} setLogo={setLogo} />
      {(currentSection === 0 || currentSection === 1 || currentSection === 2 || currentSection === 3 || currentSection === 4 || currentSection === 5) && (
        <div className=" bg-[#30AFBC]">
          <div ref={home1Ref} ><Home1 tagline={tagline} setTagline={setTagline} video={video} setVideo={setVideo} /></div>
          <div ref={home2Ref}><Home2 services={services}  setServices={setServices}/></div>
          <div ref={testimonial1Ref}><Testimonial1/></div>
          <div ref={subscription1Ref}><Subscription1 /></div>
          <div ref={faq1Ref}><FAQ1 faqs={faqs} setFaqs={setFaqs}/></div>
        </div>
      )}
      {currentSection === 6 && <Instructors1 />}
      {currentSection === 7 && <Terms1 />}
      <Footer1 />
    </div>
  );
};

export default Preview;
