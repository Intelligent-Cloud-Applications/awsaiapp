import React, { useState, useContext, useRef, useCallback, useMemo, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import Context from "../../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { FaChevronRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Badge } from "flowbite-react";
import "./Panel.css";
import { Pagination } from "flowbite-react";
import Index from "../MemberList/Index";
import { TextInput, Dropdown, Button, Modal, Select } from "flowbite-react";
import { FaCheck } from "react-icons/fa";
import { RiExternalLinkLine } from "react-icons/ri";
import { BsQrCodeScan } from "react-icons/bs";
import QR from "../../../Common/Qr";
import { HiChevronDown, HiChevronUp, HiChevronRight } from "react-icons/hi";
import StatsGrid from './StatsGrid';
import { useTableManagement } from '../AdminMemberlist/hooks/useTableManagement.js';

const Panel = () => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState(null);
    const [isMonthlyReport, setisMonthlyReport] = useState("");

    const { clients, userData } = useContext(Context);
    const clientsData = Object.entries(clients?.data || {});
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const [deliveryStatuses, setDeliveryStatuses] = useState([]); // Initialize as an array
    const [planStatuses, setPlanStatuses] = useState({});
    const [userCheck, setUserCheck] = useState(0);
    const [isMoreVisible, setIsMoreVisible] = useState(false);
    const [showHiddenContent, setShowHiddenContent] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const isDeliveredOptions = ["Delivered", "Not Delivered"];
    const handleMenuToggle = (menu) => {
        setActiveSubMenu((prev) => (prev === menu ? null : menu));
    };

    const [instituteTypes, setInstituteTypes] = useState([]);
    const [instituteType, setInstituteType] = useState("");
    const Ctx = useContext(Context);
    const type = ["Dance Studio", "Dentist", "Cafe", "Course Based"];
    const filterType = [
        "Dance Studio",
        "Dentist",
        "Cafe",
        "Course Based",
        "Parlour",
        "Furniture",
        "Marble shop",
    ];
    const [filterStatus, setFilterStatus] = useState(null);
    const [domainLinks, setDomainLinks] = useState({});
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isResponsive, setIsResponsive] = useState(false);
    const [pendingFilter, setPendingFilter] = useState(false);
    const [completedFilter, setCompletedFilter] = useState(false);
    const [deliveredFilter, setDeliveredFilter] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setIsResponsive(window.innerWidth < 1030);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // domain link Start
    const allowedDomains = ["awsaiapp.com", "happyprancer.com"];

    const formatDomainLink = (url) => {
        url = url.trim();
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        if (url.endsWith("/")) {
            url = url.slice(0, -1);
        }
        return url;
    };

    const validateDomainLink = (url) => {
        try {
            const parsedUrl = new URL(url);
            return (
                (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") &&
                allowedDomains.some((domain) => parsedUrl.hostname.endsWith(domain))
            );
        } catch (e) {
            return false;
        }
    };
    const handleDeliverableUpdate = async (institutionid, deliverable) => {
        const domainLink = domainLinks[institutionid];

        if (deliverable === "Completed" && !domainLink) {
            return;
        }

        try {
            const body = {
                institutionid,
                deliverable,
                ...(deliverable === "Completed" && { domainLink }),
            };

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

    const handleDomainLinkSubmit = async (institutionid) => {
        let domainLink = domainLinks[institutionid]?.trim() || "";

        if (!domainLink) {
            toast.error("You can't fill an empty domain link with status Completed.");
            return;
        }

        domainLink = formatDomainLink(domainLink); // Ensure correct format

        if (!validateDomainLink(domainLink)) {
            toast.error("Invalid domain. Allowed domains: awsaiapp.com, happyprancer.com");
            return;
        }

        try {
            await API.put("clients", `/admin/update-deliverable`, {
                body: {
                    institutionid,
                    deliverable: "Completed",
                    domainLink,
                },
            });

            setDomainLinks((prev) => ({ ...prev, [institutionid]: domainLink }));
            const response = await API.get("clients", "/admin/list-institution");
            clients.setClients(response);
            toast.success("Domain link updated successfully!");
        } catch (error) {
            console.error("Error submitting domain link:", error);
            toast.error("An error occurred while updating the domain link.");
        }
    };

    //   domain link ends

    const [openModal, setOpenModal] = useState(false);
    const [modalPlacement] = useState("center");

    const customTheme = {
        pages: {
            base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
            showIcon: "inline-flex",
            previous: {
                base: "ml-0 rounded-l-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
                icon: "h-5 w-5 text-gray-500 hover:text-white",
            },
            next: {
                base: "rounded-r-md border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
                icon: "h-5 w-5 text-gray-500 hover:text-white",
            },
            selector: {
                base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 hover:bg-[#30afbc] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:dark:bg-[#30afbc] hover:dark:text-white",
                active: "bg-[#30afbc] text-white hover:bg-[#30afbc] hover:text-white",
                disabled: "cursor-not-allowed opacity-50",
            },
        },
    };

    const handlePlanChange = async (data, plan) => {
        // Store the previous state before making the API call
        const previousPlanStatus = { ...planStatuses };

        try {
            const body = {
                institution: data.institutionid,
                plan,
            };

            await API.put("clients", `/admin/update-plan`, { body });
            toast.success("Plan updated successfully!");
        } catch (error) {
            console.error("Error Updating Plan:", error);
            toast.error("An error occurred while updating the plan.");

            // Reset to the previous state if an error occurs
            setPlanStatuses(previousPlanStatus);
        }
    };

    const handleTypeFilter = (typeSelected) => {
        if (typeSelected === "Dance Studio") {
            setSelectedType("DanceStudio");
        } else if (typeSelected === "Course Based") {
            setSelectedType("CourseBased");
        } else {
            setSelectedType(typeSelected);
        }
        setActiveMenu(null);
        setActiveSubMenu(null);
    };
    const handleAllFilter = () => {
        setFilterStatus(null);
        setSelectedType(null);
        setActiveMenu(null);
        setActiveSubMenu(null);
        setCompletedFilter(false);
        setPendingFilter(false);
        setDeliveredFilter(false);
    };
    const handleDeliverFilter = (value) => {
        if (value === "Delivered") {
            setFilterStatus(true);
        } else {
            setFilterStatus(false);
        }
        setActiveMenu(null);
        setActiveSubMenu(null);
    };

    const navigate = useNavigate();
    const filterClients = useCallback(() => {
        if (!Array.isArray(clientsData)) return [];

        // Step 1: Get initial data where isFormFilled is true and sort it by date
        let initialData = clientsData
            .filter(([key, client]) => client?.isFormFilled)
            .sort((a, b) => {
                const dateA = a[1].date || -Infinity;
                const dateB = b[1].date || -Infinity;
                return dateB - dateA; // Sort in descending order (latest date first)
            });

        // Step 2: If no filters are applied, return the initial sorted data
        if (!searchQuery && !selectedType && filterStatus === null && !pendingFilter && !deliveredFilter && !completedFilter) {
            return initialData;
        }

        // Step 3: Apply filters only on the initially displayed data
        const query = searchQuery?.toLowerCase();
        const filtered = initialData.filter(([key, client]) => {
            let pendingFilterData = pendingFilter ? (!client.payment || client.deliverable !== 'Completed' || !client.isDelivered) : true;
            let completedFilterData = completedFilter ? (client.deliverable === 'Completed') : true;
            let deliveredFilterData = deliveredFilter ? (client.isDelivered) : true;

            const institution = client?.institutionid
                ? String(client.institutionid).toLowerCase()
                : "";
            const matchesQuery = !searchQuery || institution.includes(query);
            const matchesType =
                !selectedType || client.institutionType === selectedType;
            const matchesDelivery =
                filterStatus === null || client.isDelivered === filterStatus;
            return matchesQuery && matchesType && matchesDelivery && pendingFilterData && completedFilterData && deliveredFilterData;

        });

        return filtered;
    }, [searchQuery, selectedType, clientsData, filterStatus, completedFilter, deliveredFilter, pendingFilter]);

    const filteredClients = useMemo(() => filterClients(), [filterClients]);

    useEffect(() => {
        if (!Array.isArray(filteredClients)) {
            console.error("filteredClients is not an array:", filteredClients);
            return;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(
            startIndex + itemsPerPage,
            filteredClients.length
        );

        const clientsToDisplay = filteredClients.slice(startIndex, endIndex);

        const newInstituteTypes = Array.from(
            new Set(clientsToDisplay.map((client) => client[1].institutionType))
        );

        setInstituteTypes((prevTypes) => {
            const combinedTypes = [...prevTypes, ...newInstituteTypes];
            const uniqueCombinedTypes = Array.from(new Set(combinedTypes));

            if (uniqueCombinedTypes.length !== prevTypes.length) {
                return uniqueCombinedTypes;
            } else {
                return prevTypes;
            }
        });
    }, [currentPage, itemsPerPage, filteredClients]);

    useEffect(() => {
        const newInstituteType = userData.institutionType;

        if (!instituteTypes.includes(newInstituteType)) {
            setInstituteTypes((prev) => [...prev, newInstituteType]);
        }
    }, [userData, instituteTypes]);
    useEffect(() => {
        const handleResize = () => {
            const max670Hidden = window.innerWidth <= 670;
            const max600Hidden = window.innerWidth <= 600;
            const max800Hidden = window.innerWidth <= 800;
            const max1008Hidden = window.innerWidth <= 1008;

            setIsMoreVisible(
                max670Hidden || max600Hidden || max800Hidden || max1008Hidden
            );
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const useDataForSales = Ctx.saleData || [];

    const getUsernameByCognitoId = (cognitoId) => {
        // console.log("cognitoid:", cognitoId);
        // console.log("data:", useDataForSales.userName);
        // Normalize the input ID
        const trimmedInputId = String(cognitoId).trim();

        // Find the user with matching Cognito ID
        const user = useDataForSales.find((user) => {
            return user.cognitoId && String(user.cognitoId).trim() === trimmedInputId;
        });
        return user ? user.userName : "Unknown"; // Return userName if found, otherwise 'Unknown'
    };

    if (1 < 0) {
        setShowHiddenContent(true);
        isMonthlyReport.toUpperCase();
        userCheck === 0 && setUserCheck(1);
    }

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredClients.length);
    const clientsToDisplay = filteredClients.slice(startIndex, endIndex);

    useEffect(() => {
        if (currentPage < 1 && totalPages > 0) {
            setCurrentPage(1);
        } else if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const getBadgeProps = (payment, delivered, deliverable) => {
        let text, color;

        // if (web) {
        if (payment && deliverable === 'Completed' && delivered) {
            text = "Active";
            color = "success";
        } else {
            text = "Pending";
            color = "warning";
        }
        // } else {
        //   text = "InActive";
        //   color = "failure";
        // }

        return { text, color };
    };

    const splitandjoin = (str) => {
        if (typeof str !== "string") {
            return "";
        }
        if (str.match(/[A-Z]/) !== null) {
            return str
                .split(/(?=[A-Z])/)
                .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                .join(" ");
        } else {
            console.error("Invalid input: The input is not a string or is empty.");
            return "";
        }
    };

    const handleRowClick = (institution) => {
        setTempInstitution(institution.institutionid);
        setSelectedInstitutionType(institution.instituteType);
        setisMonthlyReport(institution.institutionid);
        setisMonthlyReport(institution.institutionid);
        if (institution.payment ? !institution.payment : true) {
            navigate(`/pricing?institutionId=${institution.institutionid}`, {
                state: {
                    institutionId: institution.institutionid,
                    cognitoId: Ctx.userData.cognitoId
                }
            });
        } else {
            if (Ctx.userData.userType === "admin") {
                setShowMemberList(true);
            }
        }
    };

    // const handlePayment = () => {
    //     console.log("redirect to pricing");

    //     setShowMemberList(false);
    //     navigate("/pricing", {
    //         state: {
    //             institutionId: tempInstitution,
    //             cognitoId: Ctx.userData.cognitoId
    //         }
    //     });
    // };

    const handleDropdownChange = useCallback(
        async (clientInstitution, status) => {
            const isDelivered = status === "Delivered";
            try {
                let response;
                const body = {
                    institutionId: clientInstitution.institutionid,
                    index: clientInstitution.index,
                    isDelivered,
                };
                response = await API.put("clients", "/user/updateDelivary", {
                    body,
                    headers: { "Content-Type": "application/json" },
                });
                console.log("API response:", response);
                toast.success("The Delivery status Updated Successfully");
            } catch (error) {
                console.error("Error updating delivery status:", error);
                toast.error("Error updating delivery status:");
            }
        },
        []
    );
    // eslint-disable-next-line
    const [tempInstitution, setTempInstitution] = useState(null);
    const [showMemberList, setShowMemberList] = useState(false);
    // eslint-disable-next-line
    const [selectedInstitutionType, setSelectedInstitutionType] = useState(null);

    const handleInstitutionClick = (client) => {
        if (!client.payment) {
            navigate(`/pricing?institutionId=${client.institutionid}`, {
                state: {
                    institutionId: client.institutionid,
                    cognitoId: Ctx.userData.cognitoId,
                },
            });
        } else {
            setTempInstitution(client.institutionid);
            setSelectedInstitutionType(client.institutionType);
            setisMonthlyReport(client.institutionid);
            setShowMemberList(true);
        }
    };

    const getLinkPath = (instituteType) => {
        switch (instituteType) {
            case "Dance Studio":
                return "/dance-studio";
            case "Dentist":
                return "/dentist";
            case "Cafe":
                return "/cafe";
            case "Course Based":
                return "/course-based";
            default:
                return "";
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
                setActiveSubMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const {
        activeSort,
        handleStatClick,
    } = useTableManagement([], filterStatus);


    const handleStatClickWrapper = (sortConfig, index) => {
        let newFilterStatus = null;
        if (index === 0) {
            setDeliveredFilter(!deliveredFilter);
            setPendingFilter(false);
            setCompletedFilter(false);
        } else if (index === 1) {
            setDeliveredFilter(false);
            setPendingFilter(!pendingFilter);
            setCompletedFilter(false);
        } else if (index === 2) {
            setPendingFilter(false);
            setDeliveredFilter(false);
            setCompletedFilter(!completedFilter);
        }
        setFilterStatus(newFilterStatus);
        handleStatClick(sortConfig, index);
    };


    const stats = {
        total_delivered: clientsData?.filter(m => m[1].isDelivered === true).length,
        Completed: clientsData?.filter(m => m[1].deliverable === 'Completed').length,
        Pending: clientsData?.filter(m => m[1].isFormFilled && (!m[1].payment || m[1].deliverable !== 'Completed' || !m[1].isDelivered)).length,
    };

    return (
        <>
            {!showMemberList ? (
                <>
                    {screenWidth > 1023 ? (
                        <>
                            <div
                                className={`w-screen flex flex-col justify-center items-center mx-[4rem] shadow-xl rounded-[0] pt-20 bg-[#e6e4e4] panel pb-20 ${isResponsive ? "px-4" : "lg:ml-[10%]"
                                    }`}
                            >
                                <ToastContainer />
                                <div className="md:mb-6">
                                    <StatsGrid
                                        stats={stats}
                                        onStatClick={handleStatClickWrapper}
                                        activeSort={activeSort}
                                        deliverableStatus={deliveryStatuses}
                                    />
                                </div>
                                <div
                                    className={`w-[78%] mt-2 rounded-[0] flex flex-col md:flex-row justify-end space-y-4 items-center bg-white py-3 pr-4 shadow-lg lg:space-x-4 lg:space-y-0 upper-section ${isResponsive ? "flex-col" : "flex-row"
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row sm:w-auto space-y-4 sm:space-x-4 justify-center items-center md:items-end">
                                        <Select
                                            value={instituteType}
                                            onChange={(e) => setInstituteType(e.target.value)}
                                            className={`text-white font-semibold shadow-md border-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${isResponsive ? "mt-2" : "sm:w-auto"
                                                }`}
                                        >
                                            {instituteType === "" && (
                                                <option value="" disabled hidden>
                                                    Type
                                                </option>
                                            )}
                                            {type.map((type) => (
                                                <option
                                                    key={type}
                                                    value={type}
                                                    className="hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out rounded-[0]"
                                                >
                                                    {type}
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
                                                        style: {
                                                            backgroundColor: "#f8d7da",
                                                            color: "#721c24",
                                                        },
                                                    });
                                                }
                                            }}
                                            className="hover:no-underline"
                                        >
                                            <button
                                                className={`flex items-center gap-2 p-2 bg-[#48d6e0] font-semibold text-sm rounded-md hover:bg-[#3ae1f7] focus:outline-none focus:ring-2 focus:ring-[#6cebff] transition duration-300 ease-in-out transform hover:scale-105 shadow-md w-full ${isResponsive ? "mt-2" : "sm:w-auto"
                                                    }`}
                                            >
                                                <p className="text-white">Create New Institution</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-[78%] mt-4 rounded-md flex flex-col justify-center bg-white py-3 flowbite-table">
                                    <div className="flex flex-row w-[95%] items-center mt-[1rem] my-10 md:my-0 max850:flex-col max850:justify-center max850:items-center justify-between">
                                        <div className="relative inline-block ml-5" ref={menuRef}>
                                            <button
                                                className="flex flex-row bg-[#3cc0c9] text-white px-4 py-2  font-semibold text-sm rounded-md "
                                                onClick={() =>
                                                    setActiveMenu((prev) => (prev ? null : "main"))
                                                }
                                            >
                                                {(selectedType !== null || filterStatus !== null) && (
                                                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                                                )}
                                                Filter
                                                {activeMenu ? (
                                                    <HiChevronUp className="ml-2" />
                                                ) : (
                                                    <HiChevronDown className="ml-2" />
                                                )}
                                            </button>
                                            {activeMenu && (
                                                <div className="absolute mt-2 bg-white border rounded shadow-lg w-[9rem] z-10">
                                                    {/* Main Dropdown Menu */}
                                                    {activeMenu === "main" && (
                                                        <div>
                                                            <div
                                                                onClick={() => handleAllFilter()}
                                                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                            >
                                                                All
                                                            </div>
                                                            <div
                                                                onClick={() => handleMenuToggle("type")}
                                                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                            >
                                                                <span>
                                                                    {selectedType !== null
                                                                        ? selectedType
                                                                        : "Type"}
                                                                </span>
                                                                <HiChevronRight />
                                                            </div>
                                                            <div
                                                                onClick={() => handleMenuToggle("isDelivered")}
                                                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                            >
                                                                <span>
                                                                    {filterStatus === false
                                                                        ? "Not Delivered"
                                                                        : "Delivered"}
                                                                </span>
                                                                <HiChevronRight />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* Type Submenu */}
                                                    {activeSubMenu === "type" && (
                                                        <div className="absolute top-0 left-full ml-2 bg-white border rounded shadow-lg w-48 z-10">
                                                            {filterType.map((type) => (
                                                                <div
                                                                    key={type}
                                                                    onClick={() => handleTypeFilter(type)}
                                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                >
                                                                    {type}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {/* Is Delivered Submenu */}
                                                    {activeSubMenu === "isDelivered" && (
                                                        <div className="absolute top-0 left-full ml-2 bg-white border rounded shadow-lg w-48 z-10">
                                                            {isDeliveredOptions.map((option) => (
                                                                <div
                                                                    key={option}
                                                                    onClick={() => handleDeliverFilter(option)}
                                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                >
                                                                    {option}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {/* Search Bar */}
                                        <form class="w-full min800:w-[30%] rounded-sm my-3">
                                            <label
                                                for="default-search"
                                                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                            >
                                                Search
                                            </label>
                                            <div class="relative">
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
                                                    id="default-search"
                                                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#F9FAFB]  shadow-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                                                    placeholder="Search"
                                                    required
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    {/* Headings */}
                                    <div
                                        className={`overflow-x-auto w-full mb-4 max-h-[600px] md:max-h-[600px] overflow-y-auto ${isResponsive ? "px-2" : ""
                                            }`}
                                    >
                                        <Table className="w-full text-sm text-left text-gray-500">
                                            <Table.Head className="text-xs text-[#6B7280] bg-[#F9FAFB]">
                                                {/* <Table.HeadCell></Table.HeadCell> */}

                                                <Table.HeadCell className=" py-2  text-xs font-medium text-gray-500 uppercase">
                                                    Institution Id
                                                </Table.HeadCell>

                                                {Ctx.userData.userType === "member" &&
                                                    Ctx.userData.role === "operation" && (
                                                        <Table.HeadCell className=" py-2  text-xs font-medium text-gray-500 uppercase">
                                                            Institution Name
                                                        </Table.HeadCell>
                                                    )}
                                                <Table.HeadCell className=" py-2  text-xs font-medium text-gray-500 uppercase">
                                                    Type
                                                </Table.HeadCell>
                                                <Table.HeadCell
                                                    className={`${showHiddenContent ? "" : "max1008:hidden"
                                                        }  py-2  text-xs font-medium text-gray-500 uppercase`}
                                                >
                                                    Created By
                                                </Table.HeadCell>
                                                {(Ctx.userData.role === "owner" ||
                                                    Ctx.userData.role === "sale") && (
                                                        <Table.HeadCell className=" py-2 text-xs font-medium text-gray-500 uppercase">
                                                            Plan
                                                        </Table.HeadCell>
                                                    )}
                                                {Ctx.userData.role !== "operation" && (
                                                    <Table.HeadCell className=" py-2  text-xs font-medium text-gray-500 uppercase">
                                                        Payment
                                                    </Table.HeadCell>
                                                )}
                                                <Table.HeadCell className=" py-2  text-xs font-medium text-gray-500 uppercase">
                                                    Deliverable
                                                </Table.HeadCell>
                                                {Ctx.userData.role !== "operation" && (
                                                    <Table.HeadCell className=" py-2 text-xs font-medium text-gray-500 uppercase">
                                                        Delivered
                                                    </Table.HeadCell>
                                                )}
                                                <Table.HeadCell className=" py-2 text-xs font-medium text-gray-500 uppercase">
                                                    Status
                                                </Table.HeadCell>
                                                <Table.HeadCell className=" py-2 text-xs font-medium text-gray-500 uppercase text-center">
                                                    Links
                                                </Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body className="bg-white">
                                                {clientsToDisplay.map(([key, client], index) => (
                                                    <Table.Row
                                                        key={client.institutionid}
                                                        className="clients-data-table border-b hover:cursor-pointer hover:bg-white"
                                                    >
                                                        <Table.Cell
                                                            className="whitespace-nowrap text-sm font-medium text-gray-900 hover:underline py-0 bg-white"
                                                            onClick={(e) => handleRowClick(client, e)}
                                                        >
                                                            <Link
                                                                onClick={() => {
                                                                    handleInstitutionClick(client);
                                                                }}
                                                            >
                                                                <div className="email-hover font-semibold text-[#11192B]">
                                                                    {client.institutionid}
                                                                </div>
                                                            </Link>
                                                        </Table.Cell>

                                                        {Ctx.userData.userType === "member" &&
                                                            Ctx.userData.role === "operation" && (
                                                                <Table.Cell className="whitespace-nowrap text-sm text-gray-900 py-0 bg-white text-transform: capitalize">
                                                                    {client.companyName}
                                                                </Table.Cell>
                                                            )}
                                                        <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white">
                                                            {splitandjoin(client.institutionType)}
                                                        </Table.Cell>
                                                        <Table.Cell
                                                            className={`${showHiddenContent ? "" : "max1008:hidden"
                                                                } whitespace-nowrap text-sm text-gray-500  bg-white`}
                                                        >
                                                            {client.createdBy
                                                                ? getUsernameByCognitoId(client.createdBy)
                                                                : "Unknown"}{" "}
                                                        </Table.Cell>
                                                        {(Ctx.userData.role === "owner" ||
                                                            Ctx.userData.role === "sale") &&
                                                            (client.payment ? (
                                                                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white">
                                                                    <Dropdown
                                                                        label={
                                                                            planStatuses[client.institutionid] ||
                                                                            client.plan
                                                                        }
                                                                        inline
                                                                    >
                                                                        <Dropdown.Item
                                                                            className="hover:bg-gray-200 focus:bg-gray-200"
                                                                            onClick={() => {
                                                                                setPlanStatuses((prev) => ({
                                                                                    ...prev,
                                                                                    [client.institutionid]: "Basic",
                                                                                }));
                                                                                handlePlanChange(client, "Basic");
                                                                            }}
                                                                        >
                                                                            Basics
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                            className="hover:bg-gray-200 focus:bg-gray-200"
                                                                            onClick={() => {
                                                                                setPlanStatuses((prev) => ({
                                                                                    ...prev,
                                                                                    [client.institutionid]: "Standard",
                                                                                }));
                                                                                handlePlanChange(client, "Standard");
                                                                            }}
                                                                        >
                                                                            Standard
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                            className="hover:bg-gray-200 focus:bg-gray-200"
                                                                            onClick={() => {
                                                                                setPlanStatuses((prev) => ({
                                                                                    ...prev,
                                                                                    [client.institutionid]: "Advance",
                                                                                }));
                                                                                handlePlanChange(client, "Advance");
                                                                            }}
                                                                        >
                                                                            Advance
                                                                        </Dropdown.Item>
                                                                    </Dropdown>
                                                                </Table.Cell>
                                                            ) : (
                                                                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white">
                                                                    No Plan
                                                                </Table.Cell>
                                                            ))}
                                                        {Ctx.userData.role !== "operation" && (
                                                            <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white">
                                                                {client.payment ? "Paid" : "Not Paid"}
                                                            </Table.Cell>
                                                        )}
                                                        <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white">
                                                            {Ctx.userData.role !== "sale" ? (
                                                                <Dropdown
                                                                    label={
                                                                        selectedStatuses[client.institutionid] ||
                                                                        client.deliverable ||
                                                                        "Pending"
                                                                    }
                                                                    inline
                                                                >
                                                                    <Dropdown.Item
                                                                        className="hover:bg-gray-200 focus:bg-gray-200"
                                                                        onClick={() => {
                                                                            setSelectedStatuses((prev) => ({
                                                                                ...prev,
                                                                                [client.institutionid]: "Pending",
                                                                            }));
                                                                            handleDeliverableUpdate(
                                                                                client.institutionid,
                                                                                "Pending"
                                                                            );
                                                                        }}
                                                                    >
                                                                        Pending
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item
                                                                        className="hover:bg-gray-200 focus:bg-gray-200"
                                                                        onClick={() => {
                                                                            setSelectedStatuses((prev) => ({
                                                                                ...prev,
                                                                                [client.institutionid]: "In-progress",
                                                                            }));
                                                                            handleDeliverableUpdate(
                                                                                client.institutionid,
                                                                                "In-progress"
                                                                            );
                                                                        }}
                                                                    >
                                                                        In-progress
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item
                                                                        className="hover:bg-gray-200 focus:bg-gray-200"
                                                                        onClick={() => {
                                                                            setSelectedStatuses((prev) => ({
                                                                                ...prev,
                                                                                [client.institutionid]: "Completed",
                                                                            }));
                                                                            handleDeliverableUpdate(
                                                                                client.institutionid,
                                                                                "Completed"
                                                                            );
                                                                        }}
                                                                    >
                                                                        Completed
                                                                    </Dropdown.Item>
                                                                </Dropdown>
                                                            ) : (
                                                                <span className="text-gray-500">
                                                                    {client.deliverable || "Pending"}
                                                                </span>
                                                            )}
                                                        </Table.Cell>
                                                        {Ctx.userData.role !== "operation" &&
                                                            (client.payment ? (
                                                                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white">
                                                                    <Dropdown
                                                                        label={
                                                                            deliveryStatuses[client.institutionid] ??
                                                                            (client.isDelivered
                                                                                ? "Delivered"
                                                                                : "Not Delivered")
                                                                        }
                                                                        inline
                                                                    >
                                                                        <Dropdown.Item
                                                                            className="hover:bg-gray-200 focus:bg-gray-200"
                                                                            onClick={() => {
                                                                                setDeliveryStatuses((prev) => ({
                                                                                    ...prev,
                                                                                    [client.institutionid]:
                                                                                        "Not Delivered",
                                                                                }));
                                                                                handleDropdownChange(
                                                                                    client,
                                                                                    "Not Delivered"
                                                                                );
                                                                            }}
                                                                        >
                                                                            Not Delivered
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                            className="hover:bg-gray-200 focus:bg-gray-200"
                                                                            onClick={() => {
                                                                                setDeliveryStatuses((prev) => ({
                                                                                    ...prev,
                                                                                    [client.institutionid]: "Delivered",
                                                                                }));
                                                                                handleDropdownChange(
                                                                                    client,
                                                                                    "Delivered"
                                                                                );
                                                                            }}
                                                                        >
                                                                            Delivered
                                                                        </Dropdown.Item>
                                                                    </Dropdown>
                                                                </Table.Cell>
                                                            ) : (
                                                                <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white">
                                                                    {client.isDelivered
                                                                        ? "Delivered"
                                                                        : "Not Delivered"}
                                                                </Table.Cell>
                                                            ))}
                                                        <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white">
                                                            {(() => {
                                                                const { text, color } = getBadgeProps(
                                                                    // client.isFormFilled,
                                                                    client.payment,
                                                                    client.isDelivered,
                                                                    client.deliverable
                                                                );
                                                                return (
                                                                    <Badge
                                                                        color={color}
                                                                        size="sm"
                                                                        className="flex justify-center items-center"
                                                                    >
                                                                        {text}
                                                                    </Badge>
                                                                );
                                                            })()}
                                                        </Table.Cell>

                                                        {Ctx.userData.role !== "sale" && (
                                                            <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white ">
                                                                <div className="flex items-center gap-2">
                                                                    <TextInput
                                                                        id="domain"
                                                                        value={
                                                                            domainLinks[client.institutionid] || ""
                                                                        }
                                                                        // placeholder={
                                                                        //   client.domainLink
                                                                        //     ? client.domainLink
                                                                        //     : "Enter the Domain link"
                                                                        // }
                                                                        placeholder="Enter the Domain Link"
                                                                        required
                                                                        disabled={
                                                                            selectedStatuses[client.institutionid] !==
                                                                            "Completed" &&
                                                                            client.deliverable !== "Completed"
                                                                        }
                                                                        className="w-[160px]"
                                                                        onChange={(e) =>
                                                                            setDomainLinks((prev) => ({
                                                                                ...prev,
                                                                                [client.institutionid]: e.target.value,
                                                                            }))
                                                                        }
                                                                    />
                                                                    {(selectedStatuses[client.institutionid] ===
                                                                        "Completed" ||
                                                                        client.deliverable === "Completed") && (
                                                                            <Button
                                                                                onClick={() =>
                                                                                    handleDomainLinkSubmit(
                                                                                        client.institutionid
                                                                                    )
                                                                                }
                                                                                className="flex items-center h-[25px] w-[40px] bg-[#30AFBC]"
                                                                            >
                                                                                <FaCheck />
                                                                            </Button>
                                                                        )}
                                                                </div>
                                                            </Table.Cell>
                                                        )}

                                                        <Table.Cell className="whitespace-nowrap text-sm text-gray-500  py-0 bg-white mt-2">
                                                            <div className="flex items-center gap-2">
                                                                {client.domainLink ? (
                                                                    <RiExternalLinkLine
                                                                        onClick={() => {
                                                                            window.open(client.domainLink, "_blank");

                                                                            navigator.clipboard
                                                                                .writeText(client.domainLink)
                                                                                .then(() => {
                                                                                    toast.success(
                                                                                        "Domain link copied to clipboard!"
                                                                                    );
                                                                                })
                                                                                .catch((err) => {
                                                                                    toast.error(
                                                                                        "Failed to copy domain link."
                                                                                    );
                                                                                    console.error(
                                                                                        "Clipboard copy failed:",
                                                                                        err
                                                                                    );
                                                                                });
                                                                        }}
                                                                        className="text-blue-500 cursor-pointer h-5 w-5"
                                                                    />
                                                                ) : null}

                                                                {client.institutionType === "DanceStudio" &&
                                                                    client.domainLink && (
                                                                        <>
                                                                            <BsQrCodeScan
                                                                                className="text-blue-500 cursor-pointer h-5 w-5"
                                                                                onClick={() =>
                                                                                    setOpenModal(client.institutionid)
                                                                                }
                                                                            />
                                                                            <Modal
                                                                                show={
                                                                                    openModal === client.institutionid
                                                                                }
                                                                                position={modalPlacement}
                                                                                onClose={() => setOpenModal(false)}
                                                                            >
                                                                                <Modal.Header>
                                                                                    Attendance QR
                                                                                </Modal.Header>
                                                                                <Modal.Body>
                                                                                    <div className="flex flex-col items-center space-y-4">
                                                                                        <figure className="w-fit flex flex-col items-center">
                                                                                            <QR
                                                                                                url={`${client.domainLink}/put-attendance?id=${client.institutionid}`}
                                                                                                download={`${client.companyName} Attendance QR Code.png`}
                                                                                                size={300}
                                                                                            />
                                                                                        </figure>
                                                                                        <h1 className=" font-semibold">
                                                                                            Institution Name:{" "}
                                                                                            {client.companyName}
                                                                                        </h1>
                                                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 ">
                                                                                            This is the attendance QR for the{" "}
                                                                                            {client.companyName} institution.
                                                                                            Please tap on the QR code to
                                                                                            download it.
                                                                                        </p>
                                                                                    </div>
                                                                                </Modal.Body>
                                                                                <Modal.Footer>
                                                                                    <a
                                                                                        href={
                                                                                            client.domainLink +
                                                                                            "/put-attendance"
                                                                                        }
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        onClick={(e) => {
                                                                                            const linkToCopy =
                                                                                                client.domainLink +
                                                                                                "/put-attendance";

                                                                                            navigator.clipboard
                                                                                                .writeText(linkToCopy)
                                                                                                .then(() => {
                                                                                                    toast.success(
                                                                                                        "Link copied to clipboard!"
                                                                                                    );
                                                                                                })
                                                                                                .catch((err) => {
                                                                                                    toast.error(
                                                                                                        "Failed to copy link."
                                                                                                    );
                                                                                                    console.error(
                                                                                                        "Clipboard copy failed:",
                                                                                                        err
                                                                                                    );
                                                                                                });
                                                                                        }}
                                                                                    >
                                                                                        <RiExternalLinkLine className="text-blue-500 cursor-pointer h-5 w-5" />
                                                                                    </a>
                                                                                </Modal.Footer>
                                                                            </Modal>
                                                                        </>
                                                                    )}
                                                            </div>
                                                        </Table.Cell>

                                                        {/* <Link
                                                            onClick={() => handleInstitutionClick(client)}
                                                            className="hidden change-page"
                                                        ></Link> */}

                                                        <Table.Cell className="whitespace-nowrap text-sm text-gray-500 py-0 bg-white">
                                                            <Link
                                                            // onClick={() => handleInstitutionClick(client)}
                                                            >
                                                                {isMoreVisible ? <FaChevronRight /> : ""}
                                                            </Link>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table>
                                    </div>

                                    {clientsToDisplay.map(([key, client], index) => (
                                        <div key={client.institutionid}></div>
                                    ))}

                                    <div className="py-2 flex justify-between items-center px-4">
                                        <div className="text-sm text-gray-600">
                                            Showing{" "}
                                            <strong>
                                                {startIndex + 1}-{startIndex + clientsToDisplay.length}
                                            </strong>{" "}
                                            of <strong>{filteredClients.length}</strong>
                                        </div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                            className="flex justify-end"
                                            showIcons
                                            theme={customTheme}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full [@media(max-width:1000px)]:ml-[8%] [@media(max-width:550px)]:ml-2 [@media(max-width:550px)]:mx-2 mb-[5rem]">
                            <div className="mt-[5rem] md:mb-6">
                                <StatsGrid
                                    stats={stats}
                                    onStatClick={handleStatClickWrapper}
                                    activeSort={activeSort}
                                    deliverableStatus={deliveryStatuses}
                                />
                            </div>
                            <Select
                                value={instituteType}
                                onChange={(e) => setInstituteType(e.target.value)}
                                className=" font-semibold w-full border rounded-lg mt-20"
                            >
                                {instituteType === "" && (
                                    <option value="" disabled hidden>
                                        Type
                                    </option>
                                )}
                                {filterType.map((type) => (
                                    <option key={type} value={type} className=" hover:text-white">
                                        {splitandjoin(type)}
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
                                            style: {
                                                backgroundColor: "#f8d7da",
                                                color: "#721c24",
                                            },
                                        });
                                    }
                                }}
                                className="mt-3 block"
                            >
                                <button className="w-full bg-[#48d6e0] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#3ae1f7] transition">
                                    Create New Institution
                                </button>
                            </Link>
                            <div className="relative mt-4">
                                <button
                                    className="w-full bg-[#0891b2] text-white py-2 px-4 rounded-md flex justify-between items-center"
                                    onClick={() =>
                                        setActiveMenu((prev) => (prev ? null : "main"))
                                    }
                                >
                                    {(selectedType !== null || filterStatus !== null) && (
                                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                                    )}
                                    Filter
                                    {activeMenu ? <HiChevronUp /> : <HiChevronDown />}
                                </button>
                                {activeMenu && (
                                    <div className="absolute mt-2 w-full bg-white border rounded shadow-lg z-10">
                                        {activeMenu === "main" && (
                                            <div>
                                                <div
                                                    onClick={() => handleAllFilter()}
                                                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                >
                                                    All
                                                </div>
                                                <div
                                                    onClick={() => handleMenuToggle("type")}
                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                >
                                                    <span>
                                                        {selectedType !== null ? selectedType : "Type"}
                                                    </span>
                                                </div>
                                                <div
                                                    onClick={() => handleMenuToggle("isDelivered")}
                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                >
                                                    <span>
                                                        {filterStatus === false
                                                            ? "Not Delivered"
                                                            : "Delivered"}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {activeSubMenu === "type" && (
                                            <div className="mt-2">
                                                {type.map((type) => (
                                                    <div
                                                        key={type}
                                                        onClick={() => handleTypeFilter(type)}
                                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        {type}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {activeSubMenu === "isDelivered" && (
                                            <div className="mt-2">
                                                {isDeliveredOptions.map((option) => (
                                                    <div
                                                        key={option}
                                                        onClick={() => handleDeliverFilter(option)}
                                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <form className="mt-5">
                                <div className="relative">
                                    <input
                                        type="search"
                                        className="w-full border rounded-md py-2 px-10 bg-[#F9FAFB] text-gray-700 shadow-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 left-3 flex items-center">
                                        <svg
                                            className="w-5 h-5 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </form>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
                                {clientsToDisplay.map(([key, client], index) => (
                                    <div
                                        key={client.institutionid}
                                        className="bg-white p-4 rounded-md shadow-md border hover:shadow-lg"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <div
                                                className="flex justify-between items-center "

                                                onClick={(e) => handleRowClick(client, e)}
                                            >
                                                <div className="font-semibold text-[#11192B]">
                                                    {client.institutionid}
                                                </div>
                                                <Link
                                                    onClick={() => {
                                                        handleInstitutionClick(client);
                                                    }}
                                                >
                                                    <div className="text-[#30AFBC] text-sm">
                                                        <AiOutlineEye size={20} />
                                                    </div>
                                                </Link>
                                            </div>

                                            {/* Company Name */}
                                            {Ctx.userData.userType === "member" &&
                                                Ctx.userData.role === "operation" && (
                                                    <div className="flex flex-row gap-2">
                                                        <h5>Institution Name:</h5>
                                                        <div>{client.companyName}</div>
                                                    </div>
                                                )}

                                            <div className="flex flex-row gap-2">
                                                <h5>Institution Type:</h5>
                                                <div>{splitandjoin(client.institutionType)}</div>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <h5>Status:</h5>
                                                <div className="flex justify-center items-center">
                                                    <Badge
                                                        color={
                                                            getBadgeProps(
                                                                // client.isFormFilled,
                                                                client.payment,
                                                                client.isDelivered,
                                                                client.deliverable
                                                            ).color
                                                        }
                                                        size="sm"
                                                    >
                                                        {
                                                            getBadgeProps(
                                                                // client.isFormFilled,
                                                                client.payment,
                                                                client.isDelivered,
                                                                client.deliverable
                                                            ).text
                                                        }
                                                    </Badge>
                                                </div>
                                            </div>
                                            {/* Delivery Status */}
                                            {Ctx.userData.role !== "operation" && (
                                                <div className="flex flex-row gap-2">
                                                    <h5 className="mt-1">Is Delivered:</h5>
                                                    <div className="text-md">
                                                        <select
                                                            value={
                                                                client.payment
                                                                    ? client.isDelivered
                                                                        ? "Delivered"
                                                                        : "Not Delivered"
                                                                    : "Not Delivered"
                                                            }
                                                            onChange={(e) =>
                                                                handleDropdownChange(client, e.target.value)
                                                            }
                                                            className="bg-white border border-gray-300 rounded-md p-1 text-gray-900 "
                                                            disabled={!client.payment}
                                                        >
                                                            <option value="Not Delivered">
                                                                Not Delivered
                                                            </option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                            {(Ctx.userData.role === "owner" ||
                                                Ctx.userData.role === "sale") && (
                                                    <div className="flex flex-row gap-2">
                                                        <h5>Plan:</h5>
                                                        <div className="flex flex-col gap-2">
                                                            {client.payment ? (
                                                                <Dropdown
                                                                    label={
                                                                        planStatuses[client.institutionid] ||
                                                                        client.plan
                                                                    }
                                                                    inline
                                                                >
                                                                    <Dropdown.Item
                                                                        onClick={() => {
                                                                            setPlanStatuses((prev) => ({
                                                                                ...prev,
                                                                                [client.institutionid]: "Basics",
                                                                            }));
                                                                            handlePlanChange(client, "Basic");
                                                                        }}
                                                                    >
                                                                        Basics
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item
                                                                        onClick={() => {
                                                                            setPlanStatuses((prev) => ({
                                                                                ...prev,
                                                                                [client.institutionid]: "Standard",
                                                                            }));
                                                                            handlePlanChange(client, "Standard");
                                                                        }}
                                                                    >
                                                                        Standard
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item
                                                                        onClick={() => {
                                                                            setPlanStatuses((prev) => ({
                                                                                ...prev,
                                                                                [client.institutionid]: "Advance",
                                                                            }));
                                                                            handlePlanChange(client, "Advance");
                                                                        }}
                                                                    >
                                                                        Advance
                                                                    </Dropdown.Item>
                                                                </Dropdown>
                                                            ) : (
                                                                <div>No Plan</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            {/* Payment Status */}
                                            {Ctx.userData.role !== "operation" && (
                                                <div className="flex flex-row gap-2">
                                                    <h5>Payment:</h5>
                                                    <div className="">
                                                        {client.payment ? "Paid" : "Not Paid"}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex flex-row gap-2">
                                                <h5>Created By:</h5>

                                                <div>
                                                    {client.createdBy
                                                        ? getUsernameByCognitoId(client.createdBy)
                                                        : "Unknown"}
                                                </div>
                                            </div>

                                            {/* Delivery Status Update */}
                                            {Ctx.userData.role !== "sale" ? (
                                                <div className="flex flex-row gap-2">
                                                    <h5>Deliverable:</h5>
                                                    <div className="flex flex-col gap-2">
                                                        <Dropdown
                                                            label={
                                                                selectedStatuses[client.institutionid] ||
                                                                client.deliverable ||
                                                                "Pending"
                                                            }
                                                            inline
                                                        >
                                                            <Dropdown.Item
                                                                onClick={() => {
                                                                    setSelectedStatuses((prev) => ({
                                                                        ...prev,
                                                                        [client.institutionid]: "Pending",
                                                                    }));
                                                                    handleDeliverableUpdate(
                                                                        client.institutionid,
                                                                        "Pending"
                                                                    );
                                                                }}
                                                            >
                                                                Pending
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                onClick={() => {
                                                                    setSelectedStatuses((prev) => ({
                                                                        ...prev,
                                                                        [client.institutionid]: "In-progress",
                                                                    }));
                                                                    handleDeliverableUpdate(
                                                                        client.institutionid,
                                                                        "In-progress"
                                                                    );
                                                                }}
                                                            >
                                                                In-progress
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                onClick={() => {
                                                                    setSelectedStatuses((prev) => ({
                                                                        ...prev,
                                                                        [client.institutionid]: "Completed",
                                                                    }));
                                                                    handleDeliverableUpdate(
                                                                        client.institutionid,
                                                                        "Completed"
                                                                    );
                                                                }}
                                                            >
                                                                Completed
                                                            </Dropdown.Item>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-row gap-2">
                                                    <h5>Deliverable:</h5>
                                                    <span className="text-gray-500">
                                                        {client.deliverable || "Pending"}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Domain Link */}
                                            {Ctx.userData.role !== "sale" && (
                                                <div className="flex items-center justify-between gap-2 mt-2">
                                                    <TextInput
                                                        value={domainLinks[client.institutionid] || ""}
                                                        placeholder={
                                                            client.domainLink || "Enter the Domain link"
                                                        }
                                                        // placeholder="Enter the Domain Link"
                                                        required
                                                        disabled={
                                                            selectedStatuses[client.institutionid] !==
                                                            "Completed" &&
                                                            client.deliverable !== "Completed"
                                                        }
                                                        className="w-[160px]"
                                                        onChange={(e) =>
                                                            setDomainLinks((prev) => ({
                                                                ...prev,
                                                                [client.institutionid]: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                    {(selectedStatuses[client.institutionid] ===
                                                        "Completed" ||
                                                        client.deliverable === "Completed") && (
                                                            <Button
                                                                onClick={() =>
                                                                    handleDomainLinkSubmit(client.institutionid)
                                                                }
                                                                className="flex items-center h-[25px] w-[40px] bg-[#30AFBC]"
                                                            >
                                                                <FaCheck />
                                                            </Button>
                                                        )}
                                                </div>
                                            )}

                                            {/* QR Code and External Link */}
                                            <div className="flex justify-between items-center gap-4 mt-2">
                                                {client.domainLink && (
                                                    <>
                                                        <RiExternalLinkLine
                                                            className="text-blue-500 cursor-pointer h-5 w-5"
                                                            onClick={() => {
                                                                window.open(client.domainLink, "_blank");
                                                                navigator.clipboard
                                                                    .writeText(client.domainLink)
                                                                    .then(() => {
                                                                        toast.success(
                                                                            "Domain link copied to clipboard!"
                                                                        );
                                                                    })
                                                                    .catch((err) => {
                                                                        toast.error("Failed to copy domain link.");
                                                                        console.error(
                                                                            "Clipboard copy failed:",
                                                                            err
                                                                        );
                                                                    });
                                                            }}
                                                        />
                                                        <BsQrCodeScan
                                                            className="text-blue-500 cursor-pointer h-5 w-5"
                                                            onClick={() => setOpenModal(client.institutionid)}
                                                        />
                                                        <Modal
                                                            show={openModal === client.institutionid}
                                                            position={modalPlacement}
                                                            onClose={() => setOpenModal(false)}
                                                        >
                                                            <Modal.Header>Attendance QR</Modal.Header>
                                                            <Modal.Body>
                                                                <div className="flex flex-col items-center space-y-4">
                                                                    <QR
                                                                        url={`${client.domainLink}/put-attendance?id=${client.institutionid}`}
                                                                        download={`${client.companyName} Attendance QR Code.png`}
                                                                        size={300}
                                                                    />
                                                                    <h1 className="text-center font-semibold">
                                                                        Institution Name: {client.companyName}
                                                                    </h1>
                                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center">
                                                                        This is the attendance QR for the{" "}
                                                                        {client.companyName} institution. Please tap
                                                                        on the QR code to download it.
                                                                    </p>
                                                                </div>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <a
                                                                    href={client.domainLink + "/put-attendance"}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    onClick={(e) => {
                                                                        const linkToCopy =
                                                                            client.domainLink + "/put-attendance";
                                                                        navigator.clipboard
                                                                            .writeText(linkToCopy)
                                                                            .then(() => {
                                                                                toast.success(
                                                                                    "Link copied to clipboard!"
                                                                                );
                                                                            })
                                                                            .catch((err) => {
                                                                                toast.error("Failed to copy link.");
                                                                                console.error(
                                                                                    "Clipboard copy failed:",
                                                                                    err
                                                                                );
                                                                            });
                                                                    }}
                                                                >
                                                                    <RiExternalLinkLine className="text-blue-500 cursor-pointer h-5 w-5" />
                                                                </a>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {setShowMemberList && (
                                <div className="flex justify-between items-center mt-4 max600:mb-[7rem]">
                                    <span className="text-sm text-gray-600">
                                        Page <strong>{currentPage}</strong> of{" "}
                                        <strong>{totalPages}</strong>
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                currentPage > 1 && setCurrentPage(currentPage - 1)
                                            }
                                            disabled={currentPage === 1}
                                            className={`px-2 py-1 text-xs font-medium rounded ${currentPage === 1
                                                ? "bg-gray-200 text-gray-500"
                                                : "bg-[#30afbc] text-white hover:bg-[#28a2ab]"
                                                }`}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() =>
                                                currentPage < totalPages &&
                                                setCurrentPage(currentPage + 1)
                                            }
                                            disabled={currentPage === totalPages}
                                            className={`px-2 py-1 text-xs font-medium rounded ${currentPage === totalPages
                                                ? "bg-gray-200 text-gray-500"
                                                : "bg-[#30afbc] text-white hover:bg-[#28a2ab]"
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <Index
                    tempInstitution={tempInstitution}
                    setShowMemberList={setShowMemberList}
                    selectedInstitutionType={selectedInstitutionType}
                />
                // ) : (
                //     handlePayment()
            )}
        </>
    );
};

export default Panel;
