// Packages
import React, { useState} from 'react';
import { Select, TextInput } from "flowbite-react";

// Local
import countries from './countries.json';
// import institutionContext from "../../Context/InstitutionContext";
import {LuHash, LuMail, LuPhone, LuText} from "react-icons/lu";
//import {useSelector} from "react-redux";
// import {useContext} from "react";
// import Context from "../../../context/Context";

export const CountrySelect = (props) => {
  // const { userData } = useContext(Context);
  // const [country, setCountry] = useState(userData?.countryValue);
  const { country, setCountry } = useState(91);

  // const handleChange = (event) => {
  //   setCountry(event.target.value);
  // };

  return (
    <Select value={country} onChange={setCountry} {...props}>
      {countries.map((item, index) => (
        <option key={index} value={item.value}>
          {item.name}
        </option>
      ))}
    </Select>
  );
}


export const PhoneInput = (props) => {
  return (
    <TextInput
      type='tel'
      placeholder='Phone Number'
      icon={LuPhone}
      required
      pattern='[0-9]{9,10}'
      title='Phone Numbers are 9 or 10 digits'
      {...props}
    />
  )
}


export const EmailInput = (props) => {
  return (
    <TextInput
      type='email'
      placeholder='Email Address'
      icon={LuMail}
      required
      {...props}
    />
  )
}


export const OtpInput = (props) => {
  return (
    <TextInput
      type='text'
      placeholder='OTP'
      icon={LuHash}
      required
      pattern='[0-9]{6}'
      title='OTP is 6 digits'
      {...props}
    />
  )
}


export const BaseTextInput = (props) => {
  return (
    <TextInput
      type='text'
      placeholder='Enter text here...'
      icon={LuText}
      required
      {...props}
    />
  )
}


export const PrimaryButton = ({ children, ...props }) => {

  
  return (
    <button
      style={{
        backgroundColor: "#30AFBC",
        width: '100%',
        height: '40px',
        color: 'white',
        borderRadius: '10px'
      }}
      {...props}
    >
      { children }
    </button>
  )
}


// Components used in old components

export const Button1 = ({ data, fn, w = 'auto', h = 'auto' }) => {
  return (
    <button
      className={`sans-serif tracking-wider bg-[#2f2f2f] text-[#e1e1e1] h-[${h}] rounded-lg py-2 px-2 w-[${w}]`}
      onClick={fn}
    >
      {data}
    </button>
  )
}

export const Button2 = ({ data, fn, w = 'auto', h = 'auto', className = '' }) => {

  return (
    <button
      className={`sans-serif tracking-wider font-semibold rounded-lg py-2 px-2 text-white h-[${h}] w-[${w}] ${className}`}
      style={{
        backgroundColor: "#30AFBC"
      }}
      onClick={fn}
    >
      {data}
    </button>
  )
}