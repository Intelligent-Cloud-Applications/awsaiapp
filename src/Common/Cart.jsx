import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartTable from './Cart/CartTable';
import Context from '../context/Context';
import { API } from 'aws-amplify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import colors from '../color.json';


const Cart = ({ institution }) => {
  const { cognitoId } = useParams();
  const { getCartItems, cartState, setCartState } = useContext(Context);
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const color = colors[institution];

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartData = await getCartItems(institution, cognitoId);
        if (cartData) {
          setCartState(cartData);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setCartState({ productItems: [], quantities: [], subtotal: 0, currencySymbol: '$' });
      }
    };

    if (isInitialFetch) {
      fetchCartItems();
      setIsInitialFetch(false);
    }
  }, [getCartItems, institution, cognitoId, setCartState, isInitialFetch]);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) return;

    setCartState((prevState) => {
      const newQuantities = prevState.quantities.map((qty, i) => (i === index ? newQuantity : qty));
      const subtotal = calculateSubtotal(prevState.productItems, newQuantities);

      return { ...prevState, quantities: newQuantities, subtotal };
    });
  };

  const calculateSubtotal = (items, quantities) => {
    return items.reduce((total, item, index) => total + (item.amount / 100) * quantities[index], 0);
  };

  const removeItem = (index) => {
    setCartState((prevState) => {
      const newProductItems = [...prevState.productItems];
      const newQuantities = [...prevState.quantities];

      newProductItems.splice(index, 1);
      newQuantities.splice(index, 1);

      const subtotal = calculateSubtotal(newProductItems, newQuantities);

      return { ...prevState, productItems: newProductItems, quantities: newQuantities, subtotal };
    });
  };
  
  
  const handleCheckout = async () => {
    const {productItems } = cartState;
    const institutionId = institution;
    const productId = productItems.map(item => item.productId);

    // Check for duplicate items
    const uniqueProductIds = new Set(productId);
    if (uniqueProductIds.size !== productId.length) {
      toast.error('You cannot buy the same item more than once.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#f8d7da', // Background color
          color: '#721c24', // Text color
        },
      });
      return;
    }

    try {
      const response = await API.put('clients', `/payment/checkout`, {
        body: {
          institutionId,
          cognitoId,
          productId
        },
      });

      const totalAmount = response.reduce((acc, current) => acc + current.amount, 0);
      const subscriptionIds = response.map(subscription => subscription.paymentId);

      const options = {
        key: "rzp_live_KBQhEinczOWwzs",
        amount: totalAmount,
        currency: response[0].currency,
        name: institution.toUpperCase(),
        description: 'Total Subscription Payment',
        handler: async function (paymentResponse) {
          try {
            // const payload = {
            //   razorpay_order_id: paymentResponse.razorpay_order_id,
            //   razorpay_payment_id: paymentResponse.razorpay_payment_id,
            //   razorpay_signature: paymentResponse.razorpay_signature,
            // };
            // Verify the payment for all subscriptions
            const verifyResponse = await API.put('clients', `/payment/webhook`, {
              body: {
                institutionId,
                cognitoId,
                subscriptionIds
              },
            });

            if (verifyResponse) {
              toast.success(
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <p className='font-[600] inter text-center'>
                    🎉Payment Successful!🎉 <br/> Go back to {institution}.
                  </p>
                  <button className='mx-auto'
                    onClick={() => window.close()}
                    style={{
                      backgroundColor: "#05754a",
                      color: 'white',
                      border: 'none',
                      padding: '3px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      marginTop: '10px',
                      width: '70%',
                    }}
                  >
                    OK
                  </button>
                </div>,
                {
                  position: "top-right",
                  autoClose: false,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  style: {
                    backgroundColor: '#d4edda', // Background color
                    color: '#155724', // Text color
                  },
                }
              );
            } else {
              throw new Error('Payment verification failed!');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            toast.error('Payment verification failed!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: {
                backgroundColor: '#f8d7da', // Background color
                color: '#721c24', // Text color
              },
            });
          }
        },
        prefill: {
          email: response[0].emailId,
        },
        notes: {
          cognitoId: cognitoId,
          productIds: productId.join(','),
        },
        theme: {
          color: '#205b8f',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Error during checkout!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#f8d7da', // Background color
          color: '#721c24', // Text color
        },
      });
    }
  };

  if (!cartState) {
    return <div>Loading...</div>;
  }

  const { productItems, subtotal, currencySymbol } = cartState;

  return (
    <div className="mx-auto h-screen w-screen flex flex-col justify-around items-center border-b py-5 inter max767:h-full max767:flex-col max767:justify-center">
      <ToastContainer />
      <div className='w-full max767:mt-[3rem] flex justify-center'>
        <CartTable
          product={productItems}
          removeItem={removeItem}
          updateQuantity={updateQuantity}
          quantities={cartState.quantities}
        />
      </div>
      <div className='max767:w-[98vw]'>
        <section className="mx-auto px-4 min-w-[35vw]">
          <div className="w-full flex justify-center">
            <div className="w-full border py-5 px-4 shadow-md">
              <p className="font-bold">ORDER SUMMARY</p>
              <div className="flex justify-between border-b py-5">
                <p>Subtotal</p>
                <p>{currencySymbol}{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-b py-5">
                <p>Discount</p>
                <p>0%</p>
              </div>
              <div className="flex justify-between py-5">
                <p>Total</p>
                <p>{currencySymbol}{subtotal.toFixed(2)}</p>
              </div>
              <button className="w-full px-5 py-2 text-white" onClick={handleCheckout} style={{ backgroundColor: color.primary }}>
                Proceed to checkout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
