import React, { useContext, useState } from "react";
import NewMemberList from './NewMemberList';
import ButtonGroup from '../../../Common/DashboardNav/ButtonGroup';
import Navbar from '../../Home/Navbar';
import ClientsProfile from '../ClientsHome/ClientsProfile';
import Context from "../../../context/Context";
import LeadsList from "../LeadsList/LeadsList";

const Index = ({ institution: tempInstitution }) => {
  const {  user, userData } = useContext(Context);
  const [activeTab, setActiveTab] = useState('members');
  let institution
  if (user.profile.tempinstitutionName === "awsaiapp") {
    institution = userData.tempinstitutionName;
  } else {
    institution = userData.tempinstitutionName || tempInstitution;
  }
  const renderContent = () => {
    switch (activeTab) {
      // case 'economy':
      //   return <EconomyComponent />;
      case 'members':
        return <NewMemberList />;
      case 'leads':
        return <LeadsList />;
      case 'client':
        return <ClientsProfile institution={institution}/>;
      default:
        return null;
    }
  };

  return (
    <div className="w-[97vw] flex flex-col items-center h-[120vh] ml-[220px] bg-[#e6e4e4]">
      <div className="">
        <Navbar />
        <div className="flex flex-col items-center w-full">
        <div className="fixed mt-20 ml-[19.4rem] z-10 w-full ">
          <ButtonGroup onTabChange={setActiveTab} />
        </div>
        <div className="mt-[8rem] w-full ">
          {renderContent()}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;
