import { useContext, useEffect, useRef } from "react";
import { Auth, API } from "aws-amplify";
// import { useLocation } from "react-router-dom";
import Context from "./context/Context";
import RoutesContainer from "./Routes";
import LoaderProvider from "./components/LoaderProvider";
import PeendingTasksProvider from "../src/internal/context/PendingTasksProvider";

function App() {
  const UtilCtx = useRef(useContext(Context).util);
  const UserCtx = useRef(useContext(Context));
  const { templateDetails} = useContext(Context);
  // const setUserDataRef = useRef(UserCtx.current.setUserData);



  useEffect(() => {
    templateDetails.fetchTemplateDetails()
    // eslint-disable-next-line
  }, [])

  // const location = useLocation();
  // const institutionFromParams = new URLSearchParams(location.search).get("institution");
  // const institutionFromLocalStorage = localStorage.getItem('institution');
  // const institution = institutionFromParams || institutionFromLocalStorage;
  // console.log(UserCtx)

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const userInfo = await API.get("clients", '/user/check-user-location');
  //     setUserDataRef.current((p) => ({ ...p, ...userInfo }));
  //   };

  //   fetchUserInfo();
  // }, []);

  useEffect(() => {
    const check = async () => {
      UtilCtx.current.setLoader(true);

      try {
        await Auth.currentAuthenticatedUser();

        // if (institution) {
        //   const userdata = await API.get("clients", `/self/read-self/${institution}`);

        //   if (userdata.userType === "admin") {
        //     UserCtx.current.setUserData(userdata);
        //     UserCtx.current.setIsAuth(true);
        //   } else {
        //   }
        // } else {
        const defaultUserdata = await API.get("clients", "/self/read-self/awsaiapp");
        console.log(defaultUserdata)
        if (defaultUserdata.userType === "admin" || defaultUserdata.userType === "member") {
          UserCtx.current.setUserData(defaultUserdata);
          UserCtx.current.setIsAuth(true);
        } else {
          // Handle cases where userType is not 'admin' for default institution
        }
        // }
      } catch (e) {
        console.log(e);
      } finally {
        UtilCtx.current.setLoader(false);
      }
    };

    check();
  }, []);


  return (
    <PeendingTasksProvider>
    <LoaderProvider>
      <RoutesContainer />
    </LoaderProvider>
    </PeendingTasksProvider>
  );
}

export default App;
