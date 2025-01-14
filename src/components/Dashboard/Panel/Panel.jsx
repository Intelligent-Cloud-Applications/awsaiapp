import React, { useState, useContext, useCallback, useMemo } from "react";
import Context from "../../../context/Context";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import {  FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Badge, Pagination, Select, TextInput, Dropdown, Button } from "flowbite-react";
import "./Panel.css";
import Index from "../MemberList/Index";

const Panel = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [instituteType, setInstituteType] = useState("");
  const [domainLinks, setDomainLinks] = useState({});
  const [showMemberList, setShowMemberList] = useState(false);
  const [tempInstitution, setTempInstitution] = useState(null);
  const [selectedInstitutionType, setSelectedInstitutionType] = useState("");

  const { clients, userData } = useContext(Context);
  const clientsData = Object.entries(clients.data);
  const type = ["Dance Studio", "Dentist", "Cafe"];
  const Ctx = useContext(Context);

  // Filter clients based on search query
  const filterClients = useCallback(() => {
    if (!searchQuery) {
      return Array.isArray(clientsData)
        ? clientsData
            .filter(([_, client]) => client?.isFormFilled || false)
            .sort((a, b) => (b[1].date || -Infinity) - (a[1].date || -Infinity))
        : [];
    }
    const query = searchQuery.toLowerCase();
    return Array.isArray(clientsData)
      ? clientsData.filter(([_, client]) =>
          String(client.institutionid || "").toLowerCase().includes(query)
        )
      : [];
  }, [searchQuery, clientsData]);

  const filteredClients = useMemo(() => filterClients(), [filterClients]);

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredClients.length);
  const clientsToDisplay = filteredClients.slice(startIndex, endIndex);

  // Handle deliverable update
  const handleDeliverableUpdate = async (institutionid, deliverable) => {
    const domainLink = domainLinks[institutionid];
    if (deliverable === "Completed" && !domainLink) return;

    try {
      const body = { institutionid, deliverable, ...(deliverable === "Completed" && { domainLink }) };
      await API.put("clients", `/admin/update-deliverable`, { body });

      if (deliverable === "Completed") {
        setDomainLinks((prev) => ({ ...prev, [institutionid]: domainLink }));
        toast.success("Domain link and deliverable updated successfully!");
      } else {
        toast.success("Deliverable updated successfully!");
      }

      const response = await API.get("clients", "/admin/list-institution");
      clients.setClients(response);
    } catch (error) {
      console.error("Error updating deliverable:", error);
      toast.error("An error occurred while updating the deliverable.");
    }
  };

  // Handle domain link submission
  const handleDomainLinkSubmit = async (institutionid) => {
    const domainLink = domainLinks[institutionid];
    if (!domainLink) {
      toast.error("Domain link cannot be empty for Completed deliverables.");
      return;
    }

    try {
      await API.put("clients", `/admin/update-deliverable`, {
        body: { institutionid, deliverable: "Completed", domainLink },
      });

      setDomainLinks((prev) => ({ ...prev, [institutionid]: domainLink }));
      const response = await API.get("clients", "/admin/list-institution");
      clients.setClients(response);
      toast.success("Domain link submitted successfully!");
    } catch (error) {
      console.error("Error submitting domain link:", error);
      toast.error("An error occurred while submitting the domain link.");
    }
  };

  // Handle institution click
  const handleInstitutionClick = (client) => {
    const updatedUserData = { ...userData, tempinstitutionName: client.institutionid };
    Ctx.setUserData(updatedUserData);
    setTempInstitution(client.institutionid);
    setSelectedInstitutionType(client.institutionType);
    setShowMemberList(true);
  };

  // Get link path based on institution type
  const getLinkPath = (instituteType) => {
    switch (instituteType) {
      case "Dance Studio":
        return "/dance-studio";
      case "Dentist":
        return "/dental";
      case "Cafe":
        return "/cafe";
      default:
        return "";
    }
  };

  // Get badge props based on status
  const getBadgeProps = (web, payment, delivered) => {
    if (web) {
      return payment && delivered
        ? { text: "Active", color: "success" }
        : { text: "Pending", color: "warning" };
    }
    return { text: "InActive", color: "failure" };
  };

  // Split and join string for display
  const splitAndJoin = (str) => {
    if (typeof str !== "string") return "";
    return str
      .split(/(?=[A-Z])/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  };

  return (
    <>
      {!showMemberList ? (
        <div className="w-screen h-screen flex flex-col justify-center items-center mx-[4rem] mt-[40px] shadow-xl rounded-[0] bg-[#e6e4e4] lg:ml-[10%]">
          <ToastContainer />
          <div className="w-[78%] mt-4 rounded-[0] flex flex-col md:flex-row justify-end space-y-4 items-center bg-white py-3 pr-4 shadow-lg lg:space-x-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row sm:w-auto space-y-4 sm:space-x-4 justify-center items-center md:items-end">
              <Select
                value={instituteType && splitAndJoin(instituteType)}
                onChange={(e) => setInstituteType(e.target.value)}
                className="text-white font-semibold shadow-md border-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
              >
                {instituteType === "" && <option value="" disabled hidden>Type</option>}
                {type.map((type) => (
                  <option key={type} value={type} className="hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out rounded-[0]">
                    {splitAndJoin(type)}
                  </option>
                ))}
              </Select>
              <Link
                to={getLinkPath(instituteType)}
                onClick={(e) => {
                  if (instituteType === "") {
                    e.stopPropagation();
                    toast.error("Please Select a type of Institution.", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      style: { backgroundColor: "#f8d7da", color: "#721c24" },
                    });
                  }
                }}
                className="hover:no-underline"
              >
                <button className="flex items-center gap-2 p-2 bg-[#48d6e0] font-semibold text-sm rounded-md hover:bg-[#3ae1f7] focus:outline-none focus:ring-2 focus:ring-[#6cebff] transition duration-300 ease-in-out transform hover:scale-105 shadow-md w-full sm:w-auto">
                  <p className="text-white">Create New Institution</p>
                </button>
              </Link>
            </div>
          </div>
          <div className="w-[78%] mt-4 rounded-md flex flex-col justify-center bg-white py-3 flowbite-table">
            <div className="flex flex-row justify-end w-[95%] items-center mt-[1rem] my-10 md:my-0 max850:flex-col max850:justify-center max850:items-center">
              <form className="w-full min800:w-[30%] rounded-sm my-3">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#F9FAFB] shadow-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="overflow-x-auto w-full mb-4 max-h-[600px] md:max-h-[600px] overflow-y-auto">
              <Table className="w-full text-sm text-left text-gray-500">
                <Table.Head className="text-xs text-[#6B7280] bg-[#F9FAFB]">
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Institution Id</Table.HeadCell>
                  {Ctx.userData.userType === "member" && Ctx.userData.role === "operation" && (
                    <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Institution Name</Table.HeadCell>
                  )}
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Type</Table.HeadCell>
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</Table.HeadCell>
                  {Ctx.userData.role !== "operation" && (
                    <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Is Delivered</Table.HeadCell>
                  )}
                  {Ctx.userData.role !== "operation" && (
                    <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Payment</Table.HeadCell>
                  )}
                  <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Deliverable</Table.HeadCell>
                  {Ctx.userData.role !== "sales" && (
                    <Table.HeadCell className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase">Domain Link</Table.HeadCell>
                  )}
                </Table.Head>
                <Table.Body className="bg-white">
                  {clientsToDisplay.map(([key, client]) => (
                    <Table.Row key={client.institutionid} className="clients-data-table border-b hover:bg-gray-100 hover:cursor-pointer">
                      <Table.Cell className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline text-center bg-white">
                        <Link onClick={() => Ctx.userData.role !== "operation" && handleInstitutionClick(client)}>
                          <div className="email-hover uppercase font-semibold text-[#11192B]">{client.institutionid}</div>
                        </Link>
                      </Table.Cell>
                      {Ctx.userData.userType === "member" && Ctx.userData.role === "operation" && (
                        <Table.Cell className="whitespace-nowrap text-sm text-gray-900 text-center bg-white text-transform: capitalize">{client.companyName}</Table.Cell>
                      )}
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{splitAndJoin(client.institutionType)}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        <Badge color={getBadgeProps(client.isFormFilled, client.payment, client.isDelivered).color} size="sm" className="flex justify-center items-center">
                          {getBadgeProps(client.isFormFilled, client.payment, client.isDelivered).text}
                        </Badge>
                      </Table.Cell>
                      {Ctx.userData.role !== "operation" && (
                        <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                          <select
                            value={client.isDelivered ? "Delivered" : "Not Delivered"}
                            onChange={(e) => handleDeliverableUpdate(client, e.target.value)}
                            className="bg-white border border-gray-300 rounded-md p-1 text-gray-900"
                          >
                            <option value="Not Delivered">Not Delivered</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </Table.Cell>
                      )}
                      {Ctx.userData.role !== "operation" && (
                        <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">{client.payment ? "Paid" : "Not Paid"}</Table.Cell>
                      )}
                      <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white">
                        <Dropdown label={client.deliverable || "Pending"} inline>
                          <Dropdown.Item onClick={() => handleDeliverableUpdate(client.institutionid, "Pending")}>Pending</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeliverableUpdate(client.institutionid, "In-progress")}>In-progress</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeliverableUpdate(client.institutionid, "Completed")}>Completed</Dropdown.Item>
                        </Dropdown>
                      </Table.Cell>
                      {Ctx.userData.role !== "sales" && (
                        <Table.Cell className="whitespace-nowrap text-sm text-gray-500 text-center bg-white flex gap-2 items-center">
                          <TextInput
                            id="domain"
                            value={domainLinks[client.institutionid] || ""}
                            placeholder={client.domainLink || "Enter the Domain link"}
                            required
                            disabled={client.deliverable !== "Completed"}
                            className="w-[150px]"
                            onChange={(e) => setDomainLinks((prev) => ({ ...prev, [client.institutionid]: e.target.value }))}
                          />
                          {client.deliverable === "Completed" && (
                            <Button onClick={() => handleDomainLinkSubmit(client.institutionid)} className="flex items-center h-[25px] w-[40px]">
                              <FaCheck />
                            </Button>
                          )}
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div className="py-2 flex justify-between items-center px-4">
              <div className="text-sm text-gray-600">
                Showing <strong>{startIndex + 1}-{startIndex + clientsToDisplay.length}</strong> of <strong>{filteredClients.length}</strong>
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="flex justify-end" showIcons />
            </div>
          </div>
        </div>
      ) : Ctx.userData.userType === "admin" ? (
        <Index tempInstitution={tempInstitution} setShowMemberList={setShowMemberList} selectedInstitutionType={selectedInstitutionType} />
      ) : (
        setShowMemberList(false)
      )}
    </>
  );
};

export default Panel;