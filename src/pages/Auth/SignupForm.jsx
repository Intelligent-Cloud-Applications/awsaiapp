import {BaseTextInput, EmailInput,PrimaryButton} from "../../components/Auth/Inputs";
import {useState} from "react";
import {Link} from "react-router-dom";
import signUpPng from "../../utils/Signup.png";
import "./Login.css";
const SignupForm = ({ handler }) => {
  const [errorText, setErrorText] = useState('')
  console.log(setErrorText);
  return (
    
    <div className="flex flex-col items-center mt-8 text-black ">
        <div className="flex w-[100%] gap-16 justify-center items-end mt-20 ">
    <form
      onSubmit={handler}
      className={
        `flex flex-col items-center gap-6
        w-full`
      }
    >
       <div className="flex max767:flex-col">
          <div
            className=" mobile1 flex flex-col justify-evenly items-center Inter bg-[#30AFBC] p-8 rounded-tl-[2rem] rounded-bl-[2rem] shadow-md w-[30rem] max767:bg-transparent max1050:w-[48vw]"
            style={{ boxShadow: "0 9px 14px rgba(48, 175, 188, 0.5)" }}
          >
            <img src={signUpPng} alt="" />
            <div className="text-center">
              <p className="Inter font-[500] my-1 text-[1rem] text-white">
                Unlock Success Online! Sign Up for Your Professional Website Today.
              </p>
            </div>
          </div>
          <div className=" mobile2 Inter flex flex-col justify-evenly bg-white p-8 rounded-tr-[2rem] rounded-br-[2rem] shadow-md w-[30rem] max1050:w-[48vw] text-center"
            style={{ boxShadow: "12px 9px 14px rgba(48, 175, 188, 0.5)" }}>
            <h3 className="text-[1.1rem] font-[700] text-center mb-2">Login/Signup</h3>
            <ul className="flex flex-col items-center px-0 pb-5 lg:gap-6 md:gap-3 gap-1">
      <BaseTextInput
        placeholder='First Name'
        name='firstName'
        className='rounded w-full'
      />
      <BaseTextInput
        placeholder='Last Name'
        name='lastName'
        className='rounded w-full'
      />
      <EmailInput
          name='email'
          className='rounded w-full col-span-2'
      />
    

      <PrimaryButton className='col-span-2 m-auto'>Send OTP</PrimaryButton>
      <p className='text-red-400 col-span-2'>{errorText}</p>
      <p className='col-span-2 text-center'>
        *By creating an account you agree to our
        <Link to='/signup'> Terms of use</Link> as well as
        <Link to='/signup'> Privacy Policy</Link>
      </p>
      </ul>
      </div>
      </div>
      {/*<p className='col-span-2 text-center'>Already have an account? <Link to='/signup'>Login</Link></p>*/}
    </form>
    </div>
    </div>
  )
}

export default SignupForm;