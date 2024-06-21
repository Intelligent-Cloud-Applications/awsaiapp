import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from 'aws-amplify';
import Background from './FrontpageComponents/Background';
import Card from './FrontpageComponents/Card';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './FrontpageComponents/Allpayments.css';
// import Nav from './FrontpageComponents/Nav';

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    />
  );
}

function AllPayment() {
  const { institution } = useParams();
  const [products, setProducts] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.get('user', `/any/products/${institution}`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (institution) {
      fetchData();
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [institution]);

  if (!products || products.length === 0) {
    return <div>Loading products...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div>
      <div className="relative flex flex-col w-full h-screen overflow-hidden ">
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <Background institution={institution} />
        </div>
        <div className="relative m-auto flex items-center justify-center p-4 overflow-hidden z-10 max767:mt-[3rem]">
          {screenWidth >= 1250 ? (
            <Slider {...settings} className="w-[80vw] h-[90%]">
              {products.map((product, index) => (
                <div key={index} className="px-1">
                  <Card product={product} />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="flex justify-center flex-wrap w-full max1250:h-[95vh] max1250:mt-[7rem] overflow-y-auto scrollbar-hide">
              {products.map((product, index) => (
                <div key={index} className="sm:w-1/2 md:w-1/3 px-4 py-2">
                  <Card product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllPayment;
