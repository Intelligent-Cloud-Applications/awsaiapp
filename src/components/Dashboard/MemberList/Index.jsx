import React, { useContext, useState, useEffect } from "react";
import NewMemberList from './NewMemberList';
import ButtonGroup from '../../../Common/DashboardNav/ButtonGroup';
import Navbar from '../../Home/Navbar';
import ClientsProfile from '../ClientsHome/ClientsProfile';
import Context from "../../../context/Context";
import LeadsList from "../LeadsList/LeadsList";
import InstitutionRevenue from "../InstitutionRevenue";
import { IoCaretBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BatchJobs from "../BatchJobs/BatchJobs";
const Index = ({ tempInstitution, setShowMemberList, selectedInstitutionType }) => {
  const { user, userData } = useContext(Context);
  const [activeTab, setActiveTab] = useState('members');
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  let institution;
  if (user.profile.tempinstitutionName === "awsaiapp") {
    institution = userData.tempinstitutionName;
  } else {
    institution = userData.tempinstitutionName || tempInstitution;
  }
  const renderContent = () => {
    switch (activeTab) {
      case 'members':
        return <NewMemberList tempInstitution={tempInstitution}/>;
      case 'leads':
        return <LeadsList tempInstitution={tempInstitution}/>;
      case 'client':
        return <ClientsProfile institution={tempInstitution} />;
      case 'economy':
        return <InstitutionRevenue institution={tempInstitution} />
      case 'batch':
        return <BatchJobs tempInstitution={tempInstitution}/>
      default:
        return null;
    }
  };

  const goBack = () => {
    setShowMemberList(false);
    navigate("/dashboard");
  };

  return (
    <div className="w-screen ml-[4rem] bg-[#f1f1f1] [@media(max-width:600px)]:ml-0">
      {screenWidth > 1023 ? (
        <>
          <div className="w-full h-[98vh] flex flex-col items-center ml-[5%] [@media(max-width:1260px)]:ml-[2%] [@media(max-width)]:mb-0">
            <div>
              <Navbar />
              <div className="flex flex-col items-center mt-t [@media(max-width:1260px)]:mt-2">
                <div className="fixed mt-14 z-50 bg-transperent w-[calc(80vw-200px)] flex justify-evenly items-center">
                  <div
                    onClick={goBack}
                    className="border bg-[#30afbc] ml-[2rem] rounded cursor-pointer w-[36px] h-[30px] text-[30px] mb-4 [@media(max-width:1260px)]:top-0  [@media(max-width:1260px)]:ml-0"
                  >
                    <IoCaretBack />
                  </div>
                  <ButtonGroup onTabChange={setActiveTab} institutionNames={institution} institutionType={selectedInstitutionType} />
                </div>
                <div className="mt-[8rem] w-full">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="gap-5 ml-[1rem] pb-[4rem]">
            <div className="">
              <div
                onClick={goBack}
                className="border bg-[#30afbc] rounded cursor-pointer w-[36px] text-[30px] "
              >
                <IoCaretBack />
              </div>
            </div>
            <ButtonGroup onTabChange={setActiveTab} institutionNames={institution} institutionType={selectedInstitutionType} />
            <div>
              {renderContent()}
            </div>
          </div>
        </>
      )
      }
    </div>
  );
};

export default Index;
