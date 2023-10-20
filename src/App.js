// import { useContext, useEffect, useRef } from "react";
// import { Auth, API } from "aws-amplify";
// import Context from "./context/Context";
import { useContext, useEffect, useRef } from "react";
import RoutesContainer from "./Routes";
import LoaderProvider from "./components/LoaderProvider";
import {  Auth } from "aws-amplify";
import Context from "./context/Context";

function App() {
  const UtilCtx = useRef(useContext(Context).util);
  // const UserCtx = useRef(useContext(Context));
  const Ctx = useContext(Context);

  useEffect(() => {
    const check = async () => {
      UtilCtx.current.setLoader(true);

      try {
        const user = await Auth.signIn("bworkztester@gmail.com", "Password@123")

        console.log(user)
        console.log("fetchingMembers")
        Ctx.member.fetchMember()
        // await Auth.currentAuthenticatedUser();
        // const userdata = await API.get("clients", "/user/profile/awsaiapp");
        // userdata.Status = true;
        // console.log(userdata);
        // UserCtx.current.setUserData(userdata);
        // UserCtx.current.setIsAuth(true);
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
