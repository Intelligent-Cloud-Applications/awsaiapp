import React from 'react';
import { Button } from 'flowbite-react';
import { IoMdCash } from 'react-icons/io';
import { HiUserGroup, HiUserAdd } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const ButtonGroup = ({ activeTab }) => {
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="flex items-center gap-4">
      <Button.Group className="flex-grow h-12">
        <Button
          color="gray"
          className={`rounded-l-md flex items-center px-6 h-full ${
            activeTab === 'economy' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabChange('economy')}
        >
          <IoMdCash className="mr-2 h-5 w-5 mt-0.5" />
          <span className="text-base font-medium">Economy</span>
        </Button>
        <Button
          color="gray"
          className={`rounded-none flex items-center px-6 h-full ${
            activeTab === 'members' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabChange('members')}
        >
          <HiUserGroup className="mr-2 h-5 w-5" />
          <span className="text-base font-medium">Members List</span>
        </Button>
        <Button
          color="gray"
          className={`rounded-r-md flex items-center px-6 h-full ${
            activeTab === 'leads' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabChange('leads')}
        >
          <HiUserAdd className="mr-2 h-5 w-5" />
          <span className="text-base font-medium">Leads</span>
        </Button>
      </Button.Group>
    </div>
  );
};

export default ButtonGroup;
