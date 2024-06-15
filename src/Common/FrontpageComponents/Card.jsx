import React, { useEffect, useState, useContext } from 'react';
import tick from '../utils/tick.png';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Context from '../../context/Context';
import colors from '../../color.json';

function Card({ product, setActiveComponent }) {
  const [isLoading, setIsLoading] = useState(true);
  const { institution, cognitoId } = useParams();
  const { getCartItems, isProductInCart, addCartItem } = useContext(Context);
  const [isAnimating, setIsAnimating] = useState(false);
  const color = colors[institution];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = async () => {
    try {
      setIsAnimating(true);
      await addCartItem(product, institution, cognitoId);
      await getCartItems(institution, cognitoId);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAnimating(false);
    }
  };

  const isInCart = isProductInCart(product.planId);

  return (
    <div className='bg-white w-80 min-h-[30rem] flex flex-col' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 className='text-xl font-bold text-center text-white py-2 px-1 capitalize'
        style={{
          backgroundColor: color.primary
        }}
      >
        {isLoading ? <Skeleton width={150} /> : product.heading}
      </h2>
      <div className="flex flex-col flex-grow mt-9 h-full">
        <ul className='space-y-3 px-4'>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className='flex items-start'>
                <Skeleton width={20} height={20} />
                <Skeleton width={200} height={20} className='ml-2' />
              </li>
            ))
          ) : (
            product.provides ? (
              product.provides.map((item, index) => (
                <li key={index} className='flex items-start'>
                  <img className='mt-[8px]' src={tick} alt="" />
                  <span className={`ml-2 text-[#202020] text-[1.2rem] font-[600]${institution === "lissome" ? " text-[0.80rem]" : ""}`}>{item}</span>
                </li>
              ))
            ) : null
          )}
        </ul>
      </div>
      <div className='flex flex-col items-center justify-center relative bottom-8'>
        <div className='text-center mb-6'>
          {isLoading ? (
            <Skeleton width={100} height={30} />
          ) : (
            <span className='text-[2rem] font-bold'>{product.currency === 'INR' ? '₹' : '$'}{(product.amount / 100).toFixed(2)}</span>
          )}
        </div>
        <button
          className={`w-[90%] text-white p-2 text-center gap-4 flex items-center justify-center ${isAnimating ? 'animate-loader' : ''}`}
          onClick={isInCart ? () => setActiveComponent('Cart') : handleAddToCart}
          disabled={isLoading}
          style={{
            backgroundColor: color.primary
          }}
        >
          {isLoading ? <Skeleton width={100} height={30} /> : isAnimating ? (
            <div className="loader2"></div>
          ) : isInCart ? 'GO TO CART' : 'ADD TO CART'}
          {!isLoading && !isAnimating && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Card;