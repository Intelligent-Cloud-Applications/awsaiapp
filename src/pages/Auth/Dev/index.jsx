import {useContext, useState} from "react";
import {Select} from "flowbite-react";
import {PrimaryButton} from "../../../components/Auth/Inputs";
import {API, Auth} from "aws-amplify";
import {toast} from "react-toastify";
import Context from "../../../context/Context";
import {useNavigate} from "react-router-dom";
import Header from "../../../components/Home/Navbar";

const AuthPage = () => {
  const options = [
    { userType: 'owner', email: 'admin@tester.com' },
    { userType: 'sales', email: 'user@tester.com' },
    { userType: 'operation', email: 'lopaf96595@matmayer.com' },
  ]

  const { util, setUserData, setIsAuth } = useContext(Context);
  const [email, setEmail] = useState(options[0].email);
  const navigate = useNavigate();
  // const { "*": link } = useParams();

  const handleLogin = async (e) => {
    e.preventDefault();
    util.setLoader(true);
    try {
      await Auth.signIn(email, 'Password@123');

      const userdata = await API.get(
        "beta_dance", `/user/profile/awsaiapp`,
        {}
      );
      setUserData(userdata);
      navigate(`/dashboard`);
      setIsAuth(true);
      util.setLoader(false);

      toast.info('Logged in');

    } catch (e) {
      console.log(e);
      toast.error('Unknown error occurred');
    } finally {
      util.setLoader(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className='w-80 mx-auto flex flex-col justify-center gap-4'>
          <p>Login as: </p>
          <Select
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option.email}>{option.userType}</option>
            ))}
          </Select>
          <PrimaryButton onClick={handleLogin}> Login </PrimaryButton>
        </div></div>
    </div>
  )
}

export default AuthPage;