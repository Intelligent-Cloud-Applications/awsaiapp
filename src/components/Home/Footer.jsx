import logo from "../../utils/Assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import gmail from '../../utils/Assets/icons8-mail-100.png';
import web from '../../utils/Assets/icons8-website-100.png';
import phone from '../../utils/Assets/icons8-phone-100.png';
import whatsapp from '../../utils/Assets/icons8-whatsapp-100.png';
import instagram from '../../utils/Assets/icons8-instagram-100.png';
import linkdin from '../../utils/Assets/icons8-linkedin-100.png';

export default function Footer(props) {
  const Navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.initialContent]);

  return (

   <div className='w-full h-[90vh] flex flex-col max450px:text-[75%]'>
    <div className="flex flex-col h-[50vh] justify-center item-center gap-10 bg-black text-white py-[5rem] px-[10rem] text-center">
      <h1 className='text-[2.5rem]'>Let's explore what we can create collaboratively</h1>
      <p>Discover your digital potential with us! From simple website design to complex web applications, e-commerce sites, mobile apps, and captivating branding, our platform offers tailored solutions for all your needs. Let's create together and turn your visions into digital reality!</p>
      <div className='flex justify-center item-center'>
      <button className='border-2 border-[#30AFBC] hover:bg-[#30AFBC] px-2 py-2 rounded-full font-bold w-[20%]'>Contact us now</button>
      </div>
    </div>

    
    <div>
      <div className="bg-white h-[40vh] gap-10">
        <div className=" footerheight flex flex-col justify-between sm:flex-row h-[17rem] max600:flex-col max600:justify-center p-12 gap-6 max1358:justify-center w-[100vw]">
          <div className="mb-5">
            <a href="/" className="transition duration-200 flex justify-center">
              <img className="w-[15rem]" src={logo} alt="" />
            </a>
          </div>

          <div className="flex flex-row w-[50%] justify-around">


          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8 max950:gap-4 text-[.8rem] text-black flex-wrap max1050:justify-center">
            <li className="flex flex-col gap-[0.5rem]">
              <h2 className="text-[1.2rem] mb-[0] font-bold">Contact Us</h2>

              <li className="flex gap-3"><img
                src={gmail}
                alt=""
                className="hover:mr-2 hover:w-6 hover:h-6 w-5 h-5"
              />
                <a 
                className="cursor-pointer text-black text-decoration-none"
                href="https://www.bairesdev.com/blog/cutting-edge-web-development-technologies/"
                target="_blank"
                rel="noreferrer"
              >
                admin@awsaiapp.com
              </a></li>

              <li className="flex gap-3"><img
                src={web}
                alt=""
                className="hover:mr-2 hover:w-6 hover:h-6 w-5 h-5"
              />
                <a 
                className="cursor-pointer text-black text-decoration-none"
                href="https://www.bairesdev.com/blog/cutting-edge-web-development-technologies/"
                target="_blank"
                rel="noreferrer"
              >
                awsaiapp.com
              </a></li>
              <li className="flex gap-3"><img
                src={phone}
                alt=""
                className="hover:mr-2 hover:w-6 hover:h-6 w-5 h-5"
              />
                <a 
                className="cursor-pointer text-black text-decoration-none"
                href="https://www.bairesdev.com/blog/cutting-edge-web-development-technologies/"
                target="_blank"
                rel="noreferrer"
              >
                +91 8249675567
              </a></li>

              <ul>
              <h3 className="text-[1.2rem] mb-[0] font-bold pb-[.5rem]">Follow us on:</h3>
              <li className="flex gap-[0.7rem]">
              <img
                src={whatsapp}
                alt=""
                className="hover:mr-2 hover:w-5 hover:h-5 w-4 h-4"
              />
              <img
                src={instagram}
                alt=""
                className="hover:mr-2 hover:w-5 hover:h-5 w-4 h-4"
              />
              <img
                src={linkdin}
                alt=""
                className="hover:mr-2 hover:w-5 hover:h-5 w-4 h-4"
              />
              </li>
              </ul>

              </li>
          </ul>


          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8 max950:gap-4 text-[.8rem] text-black flex-wrap max1050:justify-center">
            <li className="flex flex-col gap-[0.7rem]">
              <h2 className="text-[1.2rem] mb-[0] font-bold">Useful Links</h2>

              <a
                className="cursor-pointer text-black text-decoration-none"
                href="https://www.bairesdev.com/blog/cutting-edge-web-development-technologies/"
                target="_blank"
                rel="noreferrer"
              >
                Cutting edge technologies
              </a>
              <a
                className="cursor-pointer text-black text-decoration-none"
                href="https://searchengineland.com/guide/what-is-seo"
                target="_blank"
                rel="noreferrer"
              >
                SEO
              </a>
              <a
                className="cursor-pointer text-black text-decoration-none"
                href="https://timesofindia.indiatimes.com/blogs/voices/the-rise-of-upi-transforming-the-way-indians-transact/"
                target="_blank"
                rel="noreferrer"
              >
                Seamless payment system
              </a>
              <a
                className="cursor-pointer text-decoration-none text-black"
                href="https://mailchimp.com/marketing-glossary/digital-marketing/#:~:text=Digital%20marketing%2C%20also%20called%20online,messages%20as%20a%20marketing%20channel."
                target="_blank"
                rel="noreferrer"
              >
                Digital Marketing
              </a>
            </li>
          </ul>



          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8 max950:gap-4 text-[.8rem] text-black flex-wrap max1050:justify-center">
            <li className="flex flex-col gap-[0.7rem]">
              <h2 className="text-[1.2rem] mb-[0] font-bold">Our Clients</h2>

              <a
                className="cursor-pointer text-black text-decoration-none"
                href="https://bworkzlive.com/"
                target="_blank"
                rel="noreferrer"
              >
                BWorkz
              </a>
              <a
                className="cursor-pointer text-black text-decoration-none"
                href="https://happyprancer.com/"
                target="_blank"
                rel="noreferrer"
              >
                HappyPrancer
              </a>
              <a
                className="cursor-pointer text-black text-decoration-none"
                href="https://www.lissome.happyprancer.com/"
                target="_blank"
                rel="noreferrer"
              >
                Lissome
              </a>
              <a
                className="cursor-pointer text-decoration-none text-black"
                href="https://betamoda.happyprancer.com/"
                target="_blank"
                rel="noreferrer"
              >
                Michigan
              </a>
            </li>
          </ul>
          </div>
        </div>


        {/* <div className="h-16 bg-[#225c59] flex w-full items-center justify-center px-[2rem] sm:justify-start">
          <div className="flex bg-black justify-between items-center w-[7rem] rounded-2xl h-12 p-4">
            <a
              href="https://instagram.com/HappyPrancer"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={instagram}
                alt=""
                className="hover:mr-2 hover:w-10 hover:h-10 w-8 h-8"
              />
            </a>
            <a
              href="https://www.facebook.com/HappyPrancer"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={facebook}
                alt=""
                className="hover:mr-2 hover:w-10 hover:h-10 w-8 h-8"
              />
            </a>
          </div>
        </div> */}

        <div className="p-[0.5rem] flex justify-center text-black gap-2 font-sans max536:flex-col max536:text-center">
          <Link className="text-black text-decoration-none" to={"/privacypolicy"}>
            Privacy Policy
          </Link>
          <div className="bg-black w-0.5 border-black rounded-md"></div>
          <Link className="text-black text-decoration-none" to={"/terms"}>
            Terms and Condition
          </Link>
          <div className="bg-black w-0.5 border-black rounded-md"></div>
          <Link className="text-black text-decoration-none" to={"/refund"}>
            Cancellation/Refund Policy
          </Link>
          <div className="bg-black w-0.5 border-black rounded-md"></div>
          <h5 className="text-[1rem] sans-sarif mb-0 font-[400]"> All rights reserved. © 2023 awsaiapp.com</h5>
        </div>
      </div>
    </div>

   </div>
  )
}
