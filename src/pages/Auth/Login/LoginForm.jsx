import {CountrySelect, PhoneInput, PrimaryButton} from "../../../common/Inputs";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
//import {useSelector} from "react-redux";
import {useContext, useState} from "react";
import { Auth, API } from "aws-amplify";
import institutionContext from "../../../Context/InstitutionContext";
import Context from "../../../context/Context";
import {toast} from "react-toastify";

const LoginForm = ({ setSigninResponse }) => {
  const { InstitutionId } = useContext(institutionContext).institutionData;
  const { util } = useContext(Context);
//  const { InstitutionId } = useSelector((state) => state.institutionData.data);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  

  const sendOtp = async (event) => {
    event.preventDefault()
    util.setLoader(true);
    const countryCode = event.target.country.value;
    const phoneNumber = event.target.phone.value;
    

    try {
      console.log(countryCode, phoneNumber);
      const exist = await API.post(
        'clients',
        `/any/phone-exists/${InstitutionId}`,
        {
          body: {
            phoneNumber: `+${countryCode}${phoneNumber}`
          }
        }
      );
      
      console.log('Exist: ', exist);

        if (exist.exists) {
            const response = await Auth.signIn(`+${countryCode}${phoneNumber}`)
            setSigninResponse(response)
        } else {
            throw new Error('Unexpected Lambda Output');
        }
    } catch (e) {
      if (e.message === 'Unexpected Lambda Output') {
        toast.info('Sign Up First')
        util.setLoader(false);
        navigate(`/signup${redirect ? `?redirect=${redirect}` : ''}`)
      }
      setErrorText(e.message)
    } finally {
      util.setLoader(false);
    }
  }

  return (
    <form
      onSubmit={sendOtp}
      className={
        `flex flex-col items-center gap-6
        w-full`
      }
    >
      <CountrySelect name='country' className='rounded w-full' />
      <PhoneInput name='phone' className='rounded w-full' />
      <PrimaryButton>Send OTP</PrimaryButton>
      <p className='text-red-400'>{errorText}</p>
      <p>Don't have an account? <Link to='/signup'>Register Now</Link></p>
    </form>
  )
}

export default LoginForm;