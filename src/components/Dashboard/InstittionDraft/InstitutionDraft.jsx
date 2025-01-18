import React, { useState, useContext, useCallback, useMemo, useEffect } from "react";
import Context from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Pagination } from "flowbite-react";
import "../Panel/Panel.css";
import { API } from "aws-amplify";
import { MdDeleteForever } from 'react-icons/md';
const InstitutionDraft = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { userData, util } = useContext(Context);
  const navigate = useNavigate();
  const Ctx = useContext(Context);
  const [clients, setClients] = useState([]);
  const [LoaderInitialized, setLoaderInitialized] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [institutionIdToDelete, setInstitutionIdToDelete] = useState("");
  const fetchClients = useCallback(async () => {
    try {
      if (!LoaderInitialized) {
        util.setLoader(true);
        setLoaderInitialized(true);
      }

      let response;
      if (userData.role === "owner") {
        response = await API.get("clients", "/admin/list-institution");
      } else {
        response = await API.get("clients", "/admin/list-institutionForSales");
      }
      setClients(response);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {

      util.setLoader(false);
    }
  }, [userData.role, LoaderInitialized, util]);
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
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

  const clientsData = Object.entries(clients);
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
  const handleDeleteClick = (clientData) => {
    setInstitutionIdToDelete(clientData.institutionid);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    console.log("institution to delete", institutionIdToDelete);
    if (!institutionIdToDelete) return;
    try {
      util.setLoader(true);
      setShowConfirm(false);
      await API.del("clients", `/user/development-form/delete-all/${institutionIdToDelete}`);
      alert('All data deleted successfully');
      util.setLoader(false);
      await fetchClients();
      navigate('/dashboard');
    } catch (error) {
      alert('No matching data found', error);
      util.setLoader(false);
    } finally {
      setShowConfirm(false);
      await fetchClients();
      setInstitutionIdToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setInstitutionIdToDelete(null);
  };


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

  const handleContinueDraft = (clientData) => {
    const keyData = clientData.institutionType.trim(); // Remove whitespace
    console.log("key Data:", keyData);
    console.log("key id Data:", clientData.institutionid);
    switch (keyData) {
      case "DanceStudio":
        console.log("Navigating to DanceStudio");
        navigate(`/full?institutionName=${clientData.institutionid}`);
        break;
      case "Dentist":
        console.log("Navigating to Dental");
        navigate(`/completeDraft?institutionName=${clientData.institutionid}`);
        break;
      case "cafe":
        console.log("Navigating to cafe");
        navigate('/cafe');
        break;
      default:
        console.log("Default case reached");
        navigate("");
        break;
    }
  };

  const handleRowClick = (client, event) => {

    if (event.target.closest('.delete-button')) {
      return; // Prevent navigation
    }
    handleContinueDraft(client);
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
        <div className="overflow-x-auto w-full mb-4 max-h-[600px] md:max-h-[600px] overflow-y-auto">
          {clientsToDisplay.length === 0 ? (
            <div className="text-center text-gray-600 py-4 font-bold">
              No drafts found. Please add a new institution to begin.
            </div>
          ) : (
            <Table className="w-full text-sm text-left text-gray-500">
              <Table.Head className="text-xs text-[#6B7280] bg-[#F9FAFB]">
                <Table.HeadCell>Logo</Table.HeadCell>
                <Table.HeadCell>InstitutionId</Table.HeadCell>
                <Table.HeadCell>Type</Table.HeadCell>
                {showCreatedBy && <Table.HeadCell>Created By</Table.HeadCell>}
                <Table.HeadCell>Updated Date</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>

              <Table.Body className="bg-white">
                {clientsToDisplay.map(([key, client], index) => (
                  <Table.Row
                    key={client.institutionid}
                    className="border-b cursor-pointer"
                    onClick={(e) => handleRowClick(client, e)} // Pass the event
                  >
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
                    <Table.Cell>{client.institutionType}</Table.Cell>
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from firing
                          handleContinueDraft(client);
                        }}
                        className="text-blue-500 underline"
                      >
                        Continue Draft
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <Table.Cell>
                        <MdDeleteForever
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event
                            handleDeleteClick(client);
                          }}
                          className="text-red-500 cursor-pointer delete-button"
                        />
                      </Table.Cell>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
        <div className="py-2 flex justify-between items-center px-4 w-full">

          <div className="text-sm text-gray-600  px-4 py-2 rounded-md">
            <button className="focus:outline-none">
              Showing <strong>{startIndex + 1}-{startIndex + clientsToDisplay.length}</strong> of <strong>{filteredClients.length}</strong>
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
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this institution? </p>
            <div className="flex justify-center gap-10 mt-6">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2 transition duration-200"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionDraft;
