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
const Index = ({ institution: tempInstitution, setShowMemberList, selectedInstitutionType }) => {
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
        return <NewMemberList />;
      case 'leads':
        return <LeadsList />;
      case 'client':
        return <ClientsProfile institution={institution} />;
      case 'economy':
        return <InstitutionRevenue institution={userData.tempinstitutionName} />
      case 'batch':
        return <BatchJobs />
      default:
        return null;
    }
  };

  const goBack = () => {
    setShowMemberList(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-35px)] bg-[#f1f1f1]">
      {screenWidth > 1025 ? (
        <>
          <div className="w-[97vw] flex flex-col items-center ml-[220px]">
            <div>
              <Navbar />
              <div className="flex flex-col items-center">
                <div className="fixed mt-14 z-50 bg-[#f1f1f1] w-[calc(90vw-100px)] flex justify-evenly items-center">
                  <div
                    onClick={goBack}
                    className="border bg-[#30afbc] ml-[2rem] rounded cursor-pointer w-[36px] h-[30px] text-[30px] mb-4"
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
          <div className="w-full gap-2">
            <div className="mt-10">
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
