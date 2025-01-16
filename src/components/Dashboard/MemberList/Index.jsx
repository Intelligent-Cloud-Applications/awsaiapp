import React, { useContext, useState } from "react";
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
    <div className="w-[97vw] flex flex-col items-center h-[120vh] ml-[220px] bg-[#e6e4e4]">
      <div className="">
        <Navbar />
        <div className="flex flex-col items-center w-full">
          <div className="fixed mt-20 ml-[19.4rem] z-10 w-full flex flex-col items-start">
            <div
              onClick={goBack}
              className="border  bg-[#30afbc] ml-[2rem] rounded cursor-pointer w-[36px] h-[30px] text-[30px] mb-4"
            >
              <IoCaretBack />
            </div>
            <ButtonGroup onTabChange={setActiveTab} institutionNames={institution} institutionType={selectedInstitutionType}/>
          </div>
          <div className="mt-[11rem] w-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
