import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AllPayment from './AllPayment';
import Cart from './Cart';
import Nav from './FrontpageComponents/Nav';
import Query from '../pages/Query';
import PaymentHistory from './PaymentHistory';

function HomePayment() {
  const { institution } = useParams();
  const [activeComponent, setActiveComponent] = useState('AllPayment');

  return (
    <div className='z-1000'>
      <Nav institution={institution} setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
      
      <div style={{ display: activeComponent === 'AllPayment' ? 'block' : 'none' }}>
        <AllPayment institution={institution} setActiveComponent={setActiveComponent}/>
      </div>
      
      <div style={{ display: activeComponent === 'Cart' ? 'block' : 'none' }}>
        <Cart institution={institution} />
      </div>
            
      <div style={{ display: activeComponent === 'contact' ? 'block' : 'none' }}>
        <Query activeComponent={activeComponent}/>
      </div>

      <div style={{ display: activeComponent === 'history' ? 'block' : 'none' }}>
        <PaymentHistory institution={institution}  activeComponent={activeComponent}/>
      </div>
    </div>
  );
}

export default HomePayment;