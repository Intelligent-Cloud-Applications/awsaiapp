import React from "react";

// import VR from "../../Utils/AWS/raw/VR.png";
import "./New.css";



const Header2 = () => {
  return (
    <div 
      className="New	flex justify-between max600:h-[93rem]  h-[60rem] text-[white] w-[auto] relative pt-[3.5rem] pb-20 pr-5 pl-5 max600:flex-col max600:mx-0 max600:items-start
     max600:m-0 max600:w-[90vw] overflow-hidden max800:gap-[2rem] max1008:h-[65rem]"
    >
      <div className="p-10 flex flex-col max600:items-center  justify-between bg-transparent border-y-[0.4rem] rounded-tl-lg rounded-bl-lg border-l-[0.4rem] border-[#86CB92] w-[38vw] h-[54rem] max1008:h-[58rem] max600:h-auto max600:border-0 max600:w-[100%] max600:gap-12">
        <div className="w-[20rem] max800:w-[14rem] max600:w-[100%]">
          <h1 className="text-[2rem] max800:text-[1.5rem] font-russo max600:text-[1.6rem]">
          Service Offered 
          </h1>
          <ul className="max800:text-[0.8rem] list-disc">
          <li>Website design: creating the layout, structure, and visual elements of a website to make it appealing and user-friendly.
          </li>  
          <li>Website development: programming and coding the website to create functionality and interactivity.
          </li> 
          <li>Website hosting: providing server space to host the website and make it accessible on the internet.
          </li> 
          <li>Website monitoring: tracking the website's performance, uptime, and user experience to identify and fix any issues.
          </li> 
          <li>
          Website maintenance: keeping the website up to date, fixing bugs, and making changes to improve functionality and user experience.
          </li> 
          <li>Content management: uploading and managing website content, such as text, images, and videos.

          </li> 
          <li>Search engine optimization (SEO): optimizing the website's content and structure to improve its ranking in search engine results pages.
          </li> 
          <li>E-commerce development: developing and integrating e-commerce functionality, such as payment gateways and shopping carts, to enable online transactions.
          </li> 
          </ul>
        </div>

        
      </div>

      <div className="Over p-10 flex flex-col max600:items-center max600:pt-0 gap-[17rem] items-end bg-transparent border-y-[0.4rem] rounded-tr-lg rounded-br-lg border-r-[0.4rem] border-[#86CB92] w-[38vw] h-[54rem] max1008:h-[58rem]  max600:h-auto max600:border-0 max600:w-[100%]  max800:gap-[15rem] ">
          <div className="w-[20rem] max800:w-[14rem] max600:w-[100%]">
            <h1 className="text-[2rem] max800:text-[1.5rem] max600:text-[1.6rem] font-russo  max950:pl-[3rem] max600:pl-0">
            We strive for
            </h1>
            <ul className="max800:text-[0.8rem] list-disc max950:pl-[3rem] max600:pl-0">
              <li>User-friendly design</li>
              <li>Mobile responsiveness 3. Fast load times 4. Quality content 5. Security 6. Search engine optimization (SEO)</li>
              <li>User Friendly design - We offer user-friendly design that prioritizes intuitive navigation, clear communication, and an enjoyable experience for all users.</li>
              <li>
              Mobile responsiveness - We offer mobile responsiveness that ensures seamless and optimized performance across all devices, providing users with a consistent experience on-the-go.
              </li>
              <li>
              Fast Load times - We offer fast load times that optimize website performance, enhance user experience, and improve search engine rankings.
              </li>
              <li>
              Quality content - We offer quality content that engages, informs, and inspires users, creating valuable experiences that build trust and loyalty.
              </li>
              <li>
              Security - We offer robust security features that protect user data, prevent unauthorized access, and ensure a safe and secure online experience for all users.
              </li>
              <li>
              SEO - We offer SEO strategies that optimize website visibility, increase organic traffic, and improve search engine rankings, leading to greater brand awareness and higher conversions.
              </li>
            </ul>
          </div>
        
      </div>

     {/* <img
        src={VR}
        className="xs:block hidden absolute left-[51.9%] -translate-x-[60%]  w-[28vw] max1078:-left-[50.9%]  borderbox-hidden bottom-[-39px] max1920:bottom-[-52px]"
        alt=""
  /> */}
    </div>
  );
};

export default Header2;
