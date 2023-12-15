import { useContext, useEffect, useRef } from "react";
import { Auth, API } from "aws-amplify";
import { useLocation } from "react-router-dom";
import Context from "./context/Context";
import RoutesContainer from "./Routes";
import LoaderProvider from "./components/LoaderProvider";

function App() {
  const UtilCtx = useRef(useContext(Context).util);
  const UserCtx = useRef(useContext(Context));
  const location = useLocation();
  const institutionFromParams = new URLSearchParams(location.search).get("institution");
  const institutionFromLocalStorage = localStorage.getItem('institution');
  const institution = institutionFromParams || institutionFromLocalStorage;

  useEffect(() => {
    const check = async () => {
      UtilCtx.current.setLoader(true);

      try {
        await Auth.currentAuthenticatedUser();
        
        if (institution) {
          const userdata = await API.get("clients", `/self/read-self/${institution}`);
          
          if (userdata.userType === "admin") { 
            UserCtx.current.setUserData(userdata);
            UserCtx.current.setIsAuth(true);
            UtilCtx.current.setLoader(false);
          } else {
            // Handle cases where userType is not 'admin'
            UtilCtx.current.setLoader(false);
          }
        } else {
          // Handle cases where institution is null or empty
          UtilCtx.current.setLoader(false);
        }
      } catch (e) {
        console.log(e);
        UtilCtx.current.setLoader(false);
      }
    };

    if (institution !== null) {
      check();
    }
  }, [UtilCtx, UserCtx, institution]);

  return (
    <LoaderProvider>
      <RoutesContainer />
    </LoaderProvider>
  );
}

export default App;
