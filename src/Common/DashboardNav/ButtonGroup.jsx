import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { IoMdCash, IoMdPerson } from 'react-icons/io';
import { HiUserGroup, HiUserAdd } from 'react-icons/hi';

const ButtonGroup = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('members');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <Button.Group className="flex h-12">
      <Button
        style={{
          backgroundColor: activeTab === 'economy' ? '#30afbc' : '#fff',
          color: activeTab === 'economy' ? '#fff' : '#000',
          borderColor: activeTab === 'economy' ? '#30afbc' : '#ccc', 
        }}
        onClick={() => handleTabChange('economy')}
        className={`rounded-l-md items-center hover:bg-[#30afbc] hover:text-white border`}
      >
        <IoMdCash className="mr-3 h-4 w-4 mt-0.5" />
        Economy
      </Button>
      <Button
        style={{
          backgroundColor: activeTab === 'members' ? '#30afbc' : '#fff',
          color: activeTab === 'members' ? '#fff' : '#000',
          borderColor: activeTab === 'members' ? '#30afbc' : '#ccc', 
        }}
        onClick={() => handleTabChange('members')}
        className={`items-center hover:bg-[#30afbc] hover:text-white border`}
      >
        <HiUserGroup className="mr-3 h-4 w-4" />
        Members List
      </Button>
      <Button
        style={{
          backgroundColor: activeTab === 'leads' ? '#30afbc' : '#fff',
          color: activeTab === 'leads' ? '#fff' : '#000',
          borderColor: activeTab === 'leads' ? '#30afbc' : '#ccc', 
        }}
        onClick={() => handleTabChange('leads')}
        className={`items-center hover:bg-[#30afbc] hover:text-white border`}
      >
        <HiUserAdd className="mr-3 h-4 w-4" />
        Leads
      </Button>
      <Button
        style={{
          backgroundColor: activeTab === 'client' ? '#30afbc' : '#fff',
          color: activeTab === 'client' ? '#fff' : '#000',
          borderColor: activeTab === 'client' ? '#30afbc' : '#ccc', 
        }}
        onClick={() => handleTabChange('client')}
        className={`rounded-r-md items-center hover:bg-[#30afbc] hover:text-white border`}
      >
        <IoMdPerson className="mr-3 h-4 w-4" />
        Client
      </Button>
    </Button.Group>
  );
};

export default ButtonGroup;
