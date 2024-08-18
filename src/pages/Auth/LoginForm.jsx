import {CountrySelect, PhoneInput, PrimaryButton} from "../../components/Auth/Inputs";

const LoginForm = ({ handler }) => {
  return (
    <form
      onSubmit={handler}
      className={
        `flex flex-col items-center gap-6
        w-full`
      }
    >
      <CountrySelect name='country' className='rounded w-full'/>
      <PhoneInput name='phone' className='rounded w-full'/>
      <PrimaryButton>Send OTP</PrimaryButton>
    </form>
  )
}

export default LoginForm;