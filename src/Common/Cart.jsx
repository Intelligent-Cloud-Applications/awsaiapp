import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import CartTable from './Cart/CartTable';

const Cart = ({ institution }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [productItems, setProductItems] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState('$'); // Default currency symbol
  const { cognitoId } = useParams();

  const initialQuantities = productItems.map(() => 1);
  const [quantities, setQuantities] = useState(initialQuantities);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      return;
    }
    setQuantities(
      quantities.map((qty, i) => (i === index ? newQuantity : qty))
    );
  };

  const calculateSubtotal = (items) => {
    return items.reduce((total, item, index) => {
      return total + (item.product.amount / 100) * quantities[index];
    }, 0);
  };

  const removeItem = (index) => {
    const newProductItems = [...productItems];
    const newQuantities = [...quantities];

    newProductItems.splice(index, 1);
    newQuantities.splice(index, 1);

    setProductItems(newProductItems);
    setQuantities(newQuantities);
    setSubtotal(calculateSubtotal(newProductItems));
  };

  const getCartItems = async () => {
    try {
      const response = await API.get('clients', `/any/getcartitems/${institution}/${cognitoId}`);
      setProductItems(response);
      setQuantities(response.map(() => 1));

      let subtotal = 0;
      let currency = '$'; // Default currency

      if (response.length > 0) {
        currency = response[0].product.currency === 'INR' ? '₹' : '$';
      }

      response.forEach(item => {
        subtotal += item.product.amount / 100;
      });

      setSubtotal(subtotal);
      setCurrencySymbol(currency);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className=" mx-auto h-screen w-screen flex flex-col justify-around items-center border-b py-5 inter max767:h-full max767:flex-col max767:justify-center">
        <div className='w-full max767:mt-[3rem] flex justify-center'>
          <CartTable
            product={productItems}
            removeItem={removeItem}
          />
        </div>
        {/* Order summary */}
        <div className='max767:w-[98vw]'>
          <section className="mx-auto px-4 min-w-[35vw]">
            <div className="w-full flex justify-center">
              <div className="w-full border py-5 px-4 shadow-md">
                <p className="font-bold">ORDER SUMMARY</p>
                <div className="flex justify-between border-b py-5">
                  <p>Subtotal</p>
                  <p>{currencySymbol}{subtotal.toFixed(2)}</p> {/* Display updated subtotal with currency symbol */}
                </div>
                <div className="flex justify-between border-b py-5">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between py-5">
                  <p>Total</p>
                  <p>{currencySymbol}{subtotal.toFixed(2)}</p> {/* Display updated subtotal with currency symbol */}
                </div>
                <a href="checkout-address.html">
                  <button className="w-full bg-[#005B50] px-5 py-2 text-white">
                    Proceed to checkout
                  </button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Cart;
