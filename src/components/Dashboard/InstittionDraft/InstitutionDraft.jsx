import React, { useState, useContext, useCallback, useMemo} from "react";
import Context from "../../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Pagination } from "flowbite-react";
import "../Panel/Panel.css";

const InstitutionDraft = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { clients, userData } = useContext(Context);
  const clientsData = Object.entries(clients.data);
  const navigate = useNavigate();
  const Ctx = useContext(Context);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const useDataForSales = Ctx.saleData || [];
  const getUsernameByCognitoId = (cognitoId) => {
    console.log("cognitoid:", cognitoId);
    console.log("data:", useDataForSales.userName);
  
    const trimmedInputId = String(cognitoId).trim();

    const user = useDataForSales.find(user => {
      return user.cognitoId && String(user.cognitoId).trim() === trimmedInputId;
    });
    console.log("user Name:", user);
    return user ? user.userName : 'Unknown'; 
  };
  const filterClients = useCallback(() => {
    const filtered = clientsData
      .filter(([key, client]) => !client.isFormFilled || client.isFormFilled === false) 
      .sort((a, b) => {
      
        const dateA = a[1].date || -Infinity; 
        const dateB = b[1].date || -Infinity;
        return dateB - dateA;
      });

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return filtered.filter(([key, client]) =>
        client.institutionid.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, clientsData]);

  const filteredClients = useMemo(() => filterClients(), [filterClients]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredClients.length);
  const clientsToDisplay = filteredClients.slice(startIndex, endIndex);

  // const onPageChange = (page) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  const handleRowClick = (institutionId) => {
    navigate(`/full?institutionName=${institutionId}`);
  };
  const showCreatedBy = userData.userType === "admin" && userData.role === "owner";
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

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center mt-[-5rem] mx-[4rem] max1300:mt-[-16px] shadow-xl rounded-[0] bg-[#e6e4e4] lg:ml-[9%] px-2">
      <ToastContainer />
      <div className="w-[80%] mt-4 rounded-md flex flex-col justify-center items-center bg-white py-3 flowbite-table">
        {/* Search Bar */}
        <div className="w-full flex justify-end">
          <form className="w-[30%] rounded-sm my-3">
            <div className="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#F9FAFB] shadow-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Table */}
        <div className=" w-full mb-4 max-h-[400px] overflow-y-auto">
          <Table className="w-full text-sm text-left text-gray-500">
            <Table.Head className="text-xs text-[#6B7280] bg-[#F9FAFB]">
              <Table.HeadCell>Index</Table.HeadCell>
              <Table.HeadCell>Logo</Table.HeadCell>
              <Table.HeadCell>Institution</Table.HeadCell>
              {showCreatedBy && <Table.HeadCell>Created By</Table.HeadCell>}
              <Table.HeadCell>Updated Date</Table.HeadCell> 
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>

            <Table.Body className="bg-white">
              {clientsToDisplay.map(([key, client], index) => (
                <Table.Row
                  key={client.institutionid}
                  className="border-b cursor-pointer"
                  onClick={() => handleRowClick(client.institutionid)}
                >
                 
                  <Table.Cell>{startIndex + index + 1}</Table.Cell>

               
                  <Table.Cell>
                    {client.logoUrl ? (
                      <img
                        src={client.logoUrl}
                        alt="logo"
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    ) : (
                      "No Logo"
                    )}
                  </Table.Cell>

          
                  <Table.Cell>{client.institutionid}</Table.Cell>

                
                  {showCreatedBy && (
                    <Table.Cell>
                      {client.createdBy
                      ? getUsernameByCognitoId(client.createdBy)
                      : 'Unknown'}
                    </Table.Cell>
                  )}

                  {/* Updated Date */}
                  <Table.Cell>
                    {client.date ? formatDate(client.date) : "N/A"}
                  </Table.Cell>

            
                  <Table.Cell>
                    <Link
                      to={`/full?institutionName=${client.institutionid}`}
                      className="text-blue-500"
                    >
                    Continue Draft
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="py-2 flex justify-between items-center px-4 w-full">

  <div className="text-sm text-gray-600  px-4 py-2 rounded-md">
    <button className="focus:outline-none">
      Showing <strong>{startIndex + 1}-{startIndex + clientsToDisplay.length}</strong> of <strong>{clientsToDisplay.length}</strong>
    </button>
  </div>

  <div className="flex-shrink-0  px-4 py-2 rounded-md">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      showIcons
      theme={customTheme}
      className="focus:outline-none"
    />
  </div>
</div>

      </div>
    </div>
  );
};

export default InstitutionDraft;
