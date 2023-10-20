import { useContext, useEffect, useRef } from "react";
import { Auth, API } from "aws-amplify";
import Context from "./context/Context";
import RoutesContainer from "./Routes";
import LoaderProvider from "./components/LoaderProvider";


function App() {
  const UtilCtx = useRef(useContext(Context).util);
  const UserCtx = useRef(useContext(Context));

  console.log(process.env)

  useEffect(() => {
    const check = async () => {
      UtilCtx.current.setLoader(true);

      try {
        await Auth.currentAuthenticatedUser();
        const userdata = await API.get('clients', '/self/read-self/awsaiapp');

        console.log(userdata);
        // userdata.Status = true;
        UserCtx.current.setUserData(userdata);
        UserCtx.current.setIsAuth(true);
        UtilCtx.current.setLoader(false);
      } catch (e) {
        console.log(e);
        // UserCtx.current.setUserData({});
        UtilCtx.current.setLoader(false);
      }
    };
    check();
  }, []);

  return (
    <LoaderProvider>
      <RoutesContainer />
    </LoaderProvider>
  );
}

export default App;
