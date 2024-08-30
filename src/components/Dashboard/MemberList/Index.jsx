import React, { useState } from 'react';
import NewMemberList from './NewMemberList';
import ButtonGroup from '../../../Common/DashboardNav/ButtonGroup';
import Navbar from '../../Home/Navbar';
import ClientsProfile from '../ClientsHome/ClientsProfile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('members');

  const renderContent = () => {
    switch (activeTab) {
      // case 'economy':
      //   return <EconomyComponent />;
      case 'members':
        return <NewMemberList />;
      // case 'leads':
      //   return <LeadsComponent />;
      case 'client':
        return <ClientsProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[97vw] flex flex-col items-center h-[120vh] bg-[#e6e4e4]">
      <div className="p-4">
        <Navbar />
        <div className="flex flex-col items-center w-full">
        <div className="fixed mt-20 ml-[19.7rem] z-10 w-full ">
          <ButtonGroup onTabChange={setActiveTab} />
        </div>
        <div className="mt-[8rem] w-full">
          {renderContent()}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;
