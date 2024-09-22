import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { IoMdCash, IoMdPerson } from 'react-icons/io';
import { HiUserGroup, HiUserAdd } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const ButtonGroup = ({ onTabChange,institutionNames }) => {
  const [activeTab, setActiveTab] = useState('members');
  const navigate = useNavigate();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const institutionNames = queryParams.get("institution");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex items-center justify-start"> {/* Aligns items horizontally */}
      <Button.Group className="flex h-12">
        <Button
          style={{
            backgroundColor: activeTab === 'members' ? '#30afbc' : '#fff',
            color: activeTab === 'members' ? '#fff' : '#000',
            borderColor: activeTab === 'members' ? '#30afbc' : '#ccc', 
          }}
          onClick={() => handleTabChange('members')}
          className={`items-center hover:bg-[#30afbc] hover:text-white border rounded-l-md`}
        >
          <HiUserGroup className="mr-3 h-4 w-4" />
          Members List
        </Button>
        <Button
          style={{
            backgroundColor: activeTab === 'economy' ? '#30afbc' : '#fff',
            color: activeTab === 'economy' ? '#fff' : '#000',
            borderColor: activeTab === 'economy' ? '#30afbc' : '#ccc', 
          }}
          onClick={() => handleTabChange('economy')}
          className={`items-center hover:bg-[#30afbc] hover:text-white border`}
        >
          <IoMdCash className="mr-3 h-4 w-4 mt-0.5" />
          Economy
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
          Profile
        </Button>
      </Button.Group>
      
      <Button
        style={{
          backgroundColor: '#30afbc',
          color: '#fff',
        }}
        className="flex items-center rounded-md ml-[38rem]"  // Adjust the margin-left (ml-4) for desired spacing
        onClick={() => {
          navigate({
            pathname: '/full',
            search: `?institutionName=${institutionNames}`,
          });
        }}
      >
        <MdEdit className="mr-2 h-4 w-4 mt-0.5" />
        Edit Website
      </Button>
    </div>
  );
};

export default ButtonGroup;
