import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartTable from './Cart/CartTable';
import Context from '../context/Context';
import { API } from 'aws-amplify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import colors from '../color.json';
import ReceiptCard from './FrontpageComponents/ReceiptCard';
import { useSpring, animated } from '@react-spring/web';
import { BarLoader } from 'react-spinners';

const Cart = ({ institution }) => {
  const { cognitoId } = useParams();
  const { getCartItems, cartState, setCartState } = useContext(Context);
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const color = colors[institution];
  const animation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20 },
  });

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
    setIsLoading1(true);
    
    const { productItems } = cartState;
    const institutionId = institution;
    const productId = productItems.map(item => item.productId);
    const planIds = productItems.map(item => item.planId);
    
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
          backgroundColor: '#f8d7da',
          color: '#721c24',
        },
      });
      setIsLoading(false);
      setIsLoading1(false);
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
          setIsLoading(true);
          try {
            setStatusMessage('Payment successful');
  
            // Schedule status message updates with delays
            setTimeout(() => {
              setStatusMessage('Generating receipt');
            }, 1000);
  
            setTimeout(() => {
              setStatusMessage('Receipt generated');
            }, 5000);
  
            const verifyResponse = await API.put('clients', `/payment/webhook`, {
              body: {
                institutionId,
                cognitoId,
                subscriptionIds,
                products: productItems.map(item => item.heading),
              },
            });
  
            if (verifyResponse.signatureIsValid) {
              const formattedDate = new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
  
              const renewalDates = verifyResponse.renewalDates.map(date => new Date(date).toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }));
  
              setReceiptDetails({
                subscriptionId: subscriptionIds,
                amount: totalAmount / 100,
                paymentDate: formattedDate,
                renewalDate: renewalDates.join(', '),
                institution: institution,
                planDetails: productItems.map(item => `${item.heading}`).join(', '),
                email: response[0].emailId,
              });
  
              setTimeout(() => {
                setIsModalOpen(true);
                setIsLoading(false);
              }, 1500);
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
                backgroundColor: '#f8d7da',
                color: '#721c24',
              },
            });
            setIsLoading(false);
            setIsLoading1(false);
          }
        },
        prefill: {
          email: response[0].emailId,
        },
        notes: {
          cognitoId: cognitoId,
          productIds: productId.join(','),
          planIds: planIds.join(",")
        },
        theme: {
          color: '#205b8f',
        },
        modal: {
          ondismiss: async function () {
            try {
              await API.del('clients', `/cancel/payment`, {
                body: {
                  cognitoId,
                  subscriptionIds
                },
              });
              toast.info('Payment process was cancelled.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                  backgroundColor: '#fff3cd',
                  color: '#856404',
                },
              });
            } catch (error) {
              console.error('Error during payment cancellation:', error);
              toast.error('Failed to cancel payment process.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                },
              });
            }
            setIsLoading(false);
            setIsLoading1(false);
          }
        }
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('You have already subscribed to this Plan!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#f8d7da',
          color: '#721c24',
        },
      });
      setIsLoading(false);
      setIsLoading1(false);
    }
  };  

  if (!cartState) {
    return <div>Loading...</div>;
  }

  const { productItems, subtotal, currencySymbol } = cartState;

  return (
    <div className="mx-auto h-screen w-screen flex flex-col justify-around items-center border-b py-5 inter max767:h-full max767:flex-col max767:justify-center">
      <ToastContainer />
      <div className={`w-full max767:mt-[3rem] flex justify-center ${isModalOpen ? "hidden" : ""}`}>
        <CartTable
          product={productItems}
          removeItem={removeItem}
          updateQuantity={updateQuantity}
          quantities={cartState.quantities}
        />
      </div>
      <div className={`max767:w-[98vw] ${isModalOpen ? "hidden" : ""}`}>
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
                {isLoading1 ? 'Loading...' : 'Proceed to checkout'}
              </button>
            </div>
          </div>
        </section>
      </div>
      {isLoading && !isModalOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-2xl mb-2">{statusMessage}</p>
            <BarLoader
              color="#000000"
              height={6}
              speedMultiplier={1}
              width={400}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <animated.div style={animation} className=' absolute m-auto top-[20%] z-[1000]'>
          <ReceiptCard
            subscriptionIds={receiptDetails.subscriptionId}
            amount={receiptDetails.amount}
            currencySymbol={currencySymbol}
            renewalDate={receiptDetails.renewalDate}
            paymentDate={receiptDetails.paymentDate}
            institution={receiptDetails.institution}
            planDetails={receiptDetails.planDetails}
            email={receiptDetails.email}
          />
        </animated.div>
      )}
    </div>
  );
};

export default Cart;
