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
  const { getCartItems, cartState, setCartState, getPaymentHistory } = useContext(Context);
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [referralCode, setReferralCode] = useState(''); // State to hold the referral code
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
          productId,
          referralCode,
        },
      });
  
      const totalAmount = response.reduce((acc, current) => acc + current.subscriptionResult.amount, 0);
      const subscriptionIds = response.map(subscription => subscription.subscriptionResult.paymentId);
      const invoiceId = response[0].invoiceId; // Get the invoice ID
  
      const options = {
        key: "rzp_test_blkHaVbIxIwCZK",
        subscription_id: response[0].subscriptionResult.paymentId,
        amount: totalAmount,
        currency: response[0].subscriptionResult.currency,
        name: institution.toUpperCase(),
        description: response[0].subscriptionResult.subscriptionType,
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
  
            const verify = async () => {
              try {
                const verifyResponse = await API.put('clients', `/payment/webhook`, {
                  body: {
                    institutionId,
                    cognitoId,
                    subscriptionIds,
                    products: productItems.map(item => item.heading),
                    razorpay_payment_id: paymentResponse.razorpay_payment_id,
                    amount: totalAmount,
                    invoiceId // Send the invoice ID to the webhook API
                  },
                });
  
                console.log("Verification response:", verifyResponse);
  
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
                    email: response[0].subscriptionResult.emailId,
                  });
  
                  setTimeout(() => {
                    setIsModalOpen(true);
                    setIsLoading(false);
                    getPaymentHistory(institutionId, cognitoId);
                    getCartItems(institutionId, cognitoId);
                  }, 1500);
                } else {
                  throw new Error(verifyResponse.failureReason || 'Payment verification failed!');
                }
              } catch (error) {
                console.error('Payment verification error:', error);
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
            }
            verify();
          } catch (error) {
            console.error('Error during payment handler:', error);
            setIsLoading(false);
            setIsLoading1(false);
          }
        },
        prefill: {
          email: response[0].subscriptionResult.emailId,
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
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                },
              });
              setIsLoading(false);
              setIsLoading1(false);
            } catch (error) {
              toast.error('Error occurred while cancelling payment process.', {
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
          }
        }
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error in checkout:', error);
      toast.error('An error occurred while processing your request.', {
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
    <div className="Poppins mx-auto h-screen w-screen flex flex-col justify-around items-center border-b py-5 inter max767:h-full max767:flex-col max767:justify-center">
      <ToastContainer />
      <div className={`w-full max767:mt-[3rem] flex justify-center ${isModalOpen ? "hidden" : ""}`}>
        <CartTable
          product={productItems}
          removeItem={removeItem}
          updateQuantity={updateQuantity}
          quantities={cartState.quantities}
        />
      </div>

      <div className={`w-full Poppins max767:w-[98vw] ${isModalOpen ? "hidden" : ""}`}>
        <section className="mx-auto px-4 min-w-[35vw]">
          <div className="w-full flex justify-evenly max767:flex-col-reverse">
            <div className="w-[36vw] py-5 px-4 max767:w-full">
              <p className="font-bold text-xl mb-5">Cart Total</p>
              <div className="flex justify-between border-b py-5">
                <p>Subtotal</p>
                <p>{currencySymbol}{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-b py-5">
                <p>Discount</p>
                <p>0%</p>
              </div>
              <div className="flex justify-between py-5 font-bold text-lg">
                <p>Total</p>
                <p>{currencySymbol}{subtotal.toFixed(2)}</p>
              </div>
              <button
                className="w-full px-5 py-2 text-white font-bold bg-red-500 hover:bg-red-600"
                onClick={handleCheckout}
                style={{ backgroundColor: color.primary }}
              >
                {isLoading1 ? 'Loading...' : 'Proceed to checkout'}
              </button>
            </div>
            <div className="flex flex-col justify-center items-center py-5 px-4 ">
              <p className="mb-2 w-full text-left text-[gray] text-[0.76rem]">If you have a Referral code, enter it here</p>
              <div className='flex justify-center items-center'>
                <input
                  type="text"
                  placeholder="Referral code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-[18vw] px-4 py-3 border outline-none focus:outline-none max767:w-auto"
                />
                <button className="w-[8vw] px-5 py-3 text-white border border-black bg-black hover:bg-gray-800 max767:w-auto">
                  Submit
                </button>
              </div>
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