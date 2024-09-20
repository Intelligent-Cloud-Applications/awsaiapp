import React, { useContext, useEffect, useState } from 'react';
import Context from "../../../context/Context";
import { Table, Pagination } from 'flowbite-react';
import { API } from 'aws-amplify';
import { FiSearch } from 'react-icons/fi';

const AdminMemberlist = () => {
  const { util } = useContext(Context);
  const [members, setMembers] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Items per page
  const [searchQuery, setSearchQuery] = useState('');

  // Fetching data function
  const fetchData = async (institution = 'awsaiapp') => {
    try {
      util.setLoader(true)
      const memberResponse = await API.get('clients', `/user/list-members/${institution}`);
      const filteredData = memberResponse.filter(
        (member) => member.userType === 'member' || member.userType === 'admin'
      );

      const institutionResponse = await API.get('clients', '/admin/list-institution');
      const institutionData = institutionResponse;

      const statusCount = institutionData.reduce((acc, item) => {
        const { createdBy, isDelivered, isFormFilled } = item;

        if (createdBy) {
          if (!acc[createdBy]) {
            acc[createdBy] = { delivered: 0, inprogress: 0 };
          }

          if (isDelivered) {
            acc[createdBy].delivered += 1;
          } else if (isFormFilled && !isDelivered) {
            acc[createdBy].inprogress += 1;
          }
        }
        return acc;
      }, {});

      const updatedMembers = filteredData.map((member) => {
        const { delivered = 0, inprogress = 0 } = statusCount[member.cognitoId] || {};
        return { ...member, delivered, inprogress };
      });

      setMembers(updatedMembers);
      setMemberData(updatedMembers);
    } catch (error) {
      console.error('Error fetching the members or institution data:', error);
    }
    util.setLoader(false)
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = memberData.slice(indexOfFirstItem, indexOfLastItem);

  //custom theme for pagination
  const customTheme = {
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white"
      },
      next: {
        base: "rounded-r-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        icon: "h-5 w-5 text-gray-500 hover:text-white"
      },
      selector: {
        base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
        active: "bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white",
        disabled: "cursor-not-allowed opacity-50"
      }
    }
  };

  // Handle search across multiple attributes
  const handleSearch = () => {
    const filteredData = members.filter((member) =>
      member.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.emailId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMemberData(filteredData);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  // Utility function to censor email
  const censorEmail = (email) => {
    const [name, domain] = email.split('@');
    const censoredName = name.slice(0, 3) + 'xxxxxx';
    return `${censoredName}@${domain}`;
  };

  // Utility function to censor phone number
  const censorPhoneNumber = (phone) => {
    if (!phone) return 'Phone Number Not Available';

    // Identify the length of the country code (usually 1-3 digits)
    const countryCodeMatch = phone.match(/^\+\d{1,3}/);
    if (!countryCodeMatch) return 'Invalid Phone Number';

    const countryCode = countryCodeMatch[0];
    const numberWithoutCountryCode = phone.slice(countryCode.length);

    if (numberWithoutCountryCode.length < 3) {
      return 'Invalid Phone Number';
    }

    const visibleStart = numberWithoutCountryCode.slice(0, 2);
    const visibleEnd = numberWithoutCountryCode.slice(-1);
    const censoredMiddle = 'x'.repeat(numberWithoutCountryCode.length - 3);

    return `${countryCode}${visibleStart}${censoredMiddle}${visibleEnd}`;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center mt-[-6rem] mx-[4rem] max1300:mt-[-16px] shadow-xl rounded-[0] bg-[#e6e4e4] lg:ml-[9%]">
      <h2 className="text-2xl font-bold mb-4">Admin Member List</h2>

      {/* Table container with reduced width */}
      <div className="w-full max-w-6xl shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="flex justify-end p-4">
          {/* Search bar */}
          <form className="flex items-center w-[30rem] border border-gray rounded-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                id="default-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Quick search Members"
                required
              />
            </div>
          </form>
        </div>
        <Table striped>
          <Table.Head className='border-t border-b border-gray'>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Name</Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Email Address</Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Phone Number</Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Role</Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Date of Joining</Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Delivered</Table.HeadCell>
            <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">In Progress</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentMembers.map((member) => (
              <Table.Row key={member.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline text-center bg-white">
                  {member.userName}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{censorEmail(member.emailId)}</Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{censorPhoneNumber(member.phoneNumber)}</Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{member.role}</Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{new Date(member.joiningDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{member.status}</Table.Cell>
                {member.role === 'sales' ? (
                  <>
                    <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white font-bold">{member.inprogress}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white font-bold">{member.delivered}</Table.Cell>
                  </>
                ) : (
                  <>
                    <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white font-bold">--</Table.Cell>
                    <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white font-bold">--</Table.Cell>
                  </>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center bg-gray-50">
          <span className="text-sm text-gray-700">
            Showing <strong>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, memberData.length)}</strong> of <strong>{memberData.length}</strong> members
          </span>
          <Pagination
            currentPage={currentPage}
            layout="pagination"
            totalPages={Math.ceil(memberData.length / itemsPerPage)}
            onPageChange={handlePageChange}
            showIcons
            theme={customTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminMemberlist;
