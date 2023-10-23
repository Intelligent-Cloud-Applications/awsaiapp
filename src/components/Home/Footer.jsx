import logo from "../../utils/Assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import gmail from "../../utils/Assets/icons8-mail-100.png";
import web from "../../utils/Assets/icons8-website-100.png";
import phone from "../../utils/Assets/icons8-phone-100.png";
import whatsapp from "../../utils/Assets/icons8-whatsapp-100.png";
import instagram from "../../utils/Assets/icons8-instagram-100.png";
import linkdin from "../../utils/Assets/icons8-linkedin-100.png";
import "./Footer.css";

export default function Footer(props) {
  const Navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.initialContent]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col h-[60vh] justify-center items-center gap-10 bg-black text-white py-6 px-6 md:px-3 text-center font-inter">
        <h1 className="text-5xl max-w-7xl md:text-21xl lg:max-w-6xl">
          Let's explore what we can create collaboratively
        </h1>
        <p className="text-lg max-w-7xl max670:text-sm">
          Discover your digital potential with us! From simple website design to
          complex web applications, e-commerce sites, mobile apps, and
          captivating branding, our platform offers tailored solutions for all
          your needs. Let's create together and turn your visions into digital
          reality!
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              Navigate("/query");
            }}
            className="border-2 border-[#30AFBC] hover:bg-[#30AFBC] px-6 py-3 rounded-full text-base md:text-xl lg:text-xl "
          >
            Contact us now
          </button>
        </div>
      </div>

      <div>
        <div className="bg-white gap-10 max670:text-xs md:text-base max450:text-[5px] py-5">
          <div className="flex justify-between max670:flex-col md:flex-row p-6 gap-6 max1358:justify-center overflow-hidden items-center md:text-5xl">
            <div className="flex md:w-[30%] max600:h-[25%] max450:h-[10%] flex-row justify-center ">
              <a
                href="/"
                className="transition duration-200 flex justify-center"
              >
                <img
                  className="md:h-[20vh] max1050:h-[13vh] max450:h-[5vh]"
                  src={logo}
                  alt=""
                />
              </a>
            </div>

            <div className="flex flex-row max500:flex-col max500:justify-start max500:w-full md:w-[70%] justify-end gap-10 max450:text-xs">
              <ul className="flex flex-col gap-4 sm:gap-2 max950:gap-3 text-[.8rem] text-black max1050:justify-center">
                <li className="flex flex-col gap-[.5rem] max600:gap-0">
                  <h2 className="text-[1.2rem] mb-[0] font-bold">Contact Us</h2>

                  <li className="flex gap-3">
                    <img
                      src={gmail}
                      alt=""
                      className="w-5 h-5 cursor-pointer"
                    />
                    <a
                      className="cursor-pointer text-black text-decoration-none"
                      href=" "
                      target="_blank"
                      rel="noreferrer"
                    >
                      admin@awsaiapp.com
                    </a>
                  </li>

                  <li className="flex gap-3">
                    <img src={web} alt="" className="w-5 h-5 cursor-pointer" />
                    <Link
                      className="cursor-pointer text-black text-decoration-none"
                      to="/"
                    >
                      awsaiapp.com
                    </Link>
                  </li>
                  <li className="flex gap-3">
                    <img
                      src={phone}
                      alt=""
                      className=" w-5 h-5 cursor-pointer"
                    />
                    <a
                      className="cursor-pointer text-black text-decoration-none"
                      href="https://www.bairesdev.com/blog/cutting-edge-web-development-technologies/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      +91 8249675567
                    </a>
                  </li>

                  <ul>
                    <h3 className="text-[1.2rem] mb-[0] font-bold pb-[.5rem]">
                      Follow us on:
                    </h3>
                    <li className="flex gap-[0.7rem]">
                      <a href="https://wa.me/917077993547">
                        <img
                          src={whatsapp}
                          alt=""
                          className="w-4 h-4 cursor-pointer"
                        />
                      </a>
                      <a href="https://instagram.com/awsaiapp?igshid=NGVhN2U2NjQ0Yg%3D%3D&utm_source=qr">
                        <img
                          src={instagram}
                          alt=""
                          className="w-4 h-4 cursor-pointer"
                        />
                      </a>
                      <a href="https://www.linkedin.com/company/icloudapps/mycompany/">
                        <img
                          src={linkdin}
                          alt=""
                          className="w-4 h-4 cursor-pointer"
                        />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="flex flex-col gap-4 sm:gap-2 max950:gap-3 text-[.8rem] text-black flex-wrap max1050:justify-center">
                <li className="flex flex-col gap-[0.7rem] max600:gap-0">
                  <h2 className="text-[1.2rem] mb-[0] font-bold">
                    Useful Links
                  </h2>

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

              <ul className="flex flex-col gap-4 sm:gap-2 max950:gap-3 text-[.8rem] text-black flex-wrap max1050:justify-center">
                <li className="flex flex-col gap-[0.7rem] max600:gap-0">
                  <h2 className="text-[1.2rem] mb-[0] font-bold">
                    Our Clients
                  </h2>

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

          <div className="px-[0.5rem] pt-8 flex flex-row max500:flex-col justify-center text-black max500:gap-1 gap-2 md:gap-4 font-sans max600:text-center max600:text-xs">
            <Link className="text-black text-decoration-none" to={"/privacy"}>
              Privacy Policy
            </Link>
            <div className="bg-black w-0.5 border-black rounded-md"></div>
            <Link className="text-black text-decoration-none" to={"/term"}>
              Terms and Condition
            </Link>
            <div className="bg-black w-0.5 border-black rounded-md"></div>
            <Link className="text-black text-decoration-none" to={"/refund"}>
              Cancellation/Refund Policy
            </Link>
            <div className="bg-black w-0.5 border-black rounded-md"></div>
            <h5 className="text-black sans-sarif mb-0 font-[400]">
              {" "}
              All rights reserved. © 2023 awsaiapp.com
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
