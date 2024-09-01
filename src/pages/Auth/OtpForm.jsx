import {OtpInput, PrimaryButton} from "../../components/Auth/Inputs";
import {useState, useEffect} from "react";
import {Auth} from "aws-amplify";
import {toast} from "react-toastify";

const OtpForm = ({ handler, phoneNumber, setSignInResponse }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const resendOtp = async () => {
    setTimer(30);
    try {
      setSignInResponse(
        await Auth.signIn(phoneNumber)
      );


      toast.info('OTP sent');
    } catch (error) {
      console.log(error)
      toast.error('Could not resend OTP');
    }
  }

  return (
    <div className='flex flex-col items-center mt-20 lg:mt-[10rem]'>
      <div
          className={
            `flex flex-col items-center gap-4
            shadow-xl px-20 py-12 w-[480px] rounded-xl`
          }
        >
            <h2 className='font-bold text-2xl'>Login/Signup</h2>
           
          <p className='text-center w-64'>{
            'Please enter the otp to finish your login process Otp is send to number'
          }</p>
    <form
      onSubmit={handler}
      className={
        `flex flex-col items-center gap-6
        w-full`
      }
    >
      <OtpInput name='otp' className='w-full rounded'/>
      <PrimaryButton>Login</PrimaryButton>
      {timer > 0 ?
      <p>Resend OTP in {timer} seconds</p> :
      <button type='button' onClick={resendOtp}>Resend OTP</button>}
      {/*<p className='text-red-400'>{errorText}</p>*/}
    </form>
    </div>
    </div>
  )
}

export default OtpForm;