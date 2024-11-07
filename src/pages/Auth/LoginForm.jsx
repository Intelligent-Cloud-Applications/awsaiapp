import {CountrySelect, PhoneInput, PrimaryButton} from "../../components/Auth/Inputs";
import LoginPng from "../../utils/Assets/Login.png";
import "./Login.css";
const LoginForm = ({ handler }) => {
  return (
    <div className=" bg-[#f7f7f7] flex justify-center items-center h-[100vh] pt-[2rem]">
    <div className="flex max767:flex-col h-[35rem]">
      <div
        className=" mobile1 flex flex-col justify-evenly items-center Inter bg-[#30AFBC] p-8 rounded-tl-[2rem] rounded-bl-[2rem] shadow-md w-[30rem] max767:bg-transparent max1050:w-[48vw]"
        style={{ boxShadow: "0 9px 14px rgba(48, 175, 188, 0.5)" }}
      >
        <img src={LoginPng} alt="" />
        <h1 className="font-[900] text-[2rem] max767:text-[5vw] text-white Laila max767:text-black">
          Let’s Get Started
        </h1>
      </div>
      <div
        className=" mobile2 Inter flex flex-col justify-evenly bg-white p-8 rounded-tr-[2rem] rounded-br-[2rem] shadow-md w-[30rem] max1050:w-[48vw]"
        style={{ boxShadow: "12px 9px 14px rgba(48, 175, 188, 0.5)" }}
      >
    <form
      onSubmit={handler}
      className={
        `flex flex-col items-center gap-6
        w-full`
      }
    >
      <h2 className='font-bold text-2xl'>Login</h2>
      <CountrySelect name='country' className='rounded w-full'/>
      <PhoneInput name='phone' className='rounded w-full'/>
      <PrimaryButton>Send OTP</PrimaryButton>
    </form>
    </div> </div> </div>
  )
}

export default LoginForm;