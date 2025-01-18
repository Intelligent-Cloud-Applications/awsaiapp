import { useState, useEffect, useContext } from "react";
import Context from "../../../context/Context";
import PhoneImg from "../../../utils/Assets/Dashboard/images/PNG/smartphone.png";
import TabletImg from "../../../utils/Assets/Dashboard/images/PNG/Tablet.png";
import LaptopImg from "../../../utils/Assets/Dashboard/images/PNG/laptop.png";
import Swal from "sweetalert2";
import { API } from "aws-amplify";
import { Button, Modal } from "flowbite-react";

const EditLead = ({ institution, leadsData, id, editUser, setEditUser, isEditUser, setIsEditUser, fetchLeads }) => {
    const { util } = useContext(Context);
    const [name, setName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [emailId2, setEmailId2] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumber2, setPhoneNumber2] = useState("");
    const [age, setAge] = useState("");
    const [device, setDevice] = useState([]);
    const [date, setdate] = useState("");
    const [category, setCategory] = useState("Gold");
    // eslint-disable-next-line no-unused-vars
    const [additionalInfoTitle, setAdditionalInfoTitle] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [isAddingMoreInfo, setIsAddingMoreInfo] = useState(false);
    const [additionalInfoArray, setAdditionalInfoArray] = useState([
        { title: "", info: "" },
    ]);
    const [selectedDevices, setSelectedDevices] = useState({
        SmartPhone: false,
        Tablet: false,
        Laptop: false,
    });
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCancelEdit = () => {
        setIsEditUser(false);
        setEditUser(null);
        setIsAddingMoreInfo(false);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const apiName = "clients";
        const path = `/user/update-Leads/awsaiapp`;
        const myInit = {
            body: {
                institution: institution,
                name: name,
                emailId: emailId,
                emailId2: emailId2,
                phoneNumber: phoneNumber,
                phoneNumber2: phoneNumber2,
                age: age,
                device: device,
                date: new Date(date).getTime(),
                category: category, // Include the category field
                other: {
                    ...editUser.other,
                },
                type: "lead",
            },
        };

        // Include additionalInfoTitle and additionalInfo if available
        if (additionalInfoArray.length > 0) {
            additionalInfoArray.forEach((info) => {
                if (info.title && info.info) {
                    myInit.body.other[info.title] = info.info;
                }
            });
        }

        try {
            const update = await API.put(apiName, path, myInit);
            await fetchLeads(institution);
            console.log(update);
            Swal.fire({
                icon: "success",
                title: "User Updated",
            });
            util.setLoader(false);
        } catch (e) {
            console.log(e);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while updating the user.",
            });
            util.setLoader(false);
        } finally {
            setIsAddingMoreInfo(false);
            setSelectedDevices({
                SmartPhone: false,
                Tablet: false,
                Laptop: false,
            });
        }
    };
    const handleAddMoreInfo = () => {
        setAdditionalInfoArray((prevArray) => [
            ...prevArray,
            { title: "", info: "" },
        ]);
        setIsAddingMoreInfo(true);
    };

    const handleRemoveMoreInfo = (index) => {
        const updatedInfoArray = [...additionalInfoArray];
        updatedInfoArray.splice(index, 1);
        setAdditionalInfoArray(updatedInfoArray);
    };

    const handleInfoTitleChange = (e, index) => {
        const updatedInfoArray = [...additionalInfoArray];
        updatedInfoArray[index].title = e.target.value;
        setAdditionalInfoArray(updatedInfoArray);
    };

    const handleInfoChange = (e, index) => {
        const updatedInfoArray = [...additionalInfoArray];
        updatedInfoArray[index].info = e.target.value;
        setAdditionalInfoArray(updatedInfoArray);
    };

    const getCategoryColor = () => {
        switch (category) {
            case "Gold":
                return "#DAA520";
            case "Silver":
                return "#808080";
            case "Bronze":
                return "#a25b15";
            default:
                return "#DAA520";
        }
    };

    useEffect(() => {
        if (editUser) {
            setName(editUser.name || "");
            setEmailId(editUser.emailId || "");
            setEmailId2(editUser.emailId2 || "");
            setPhoneNumber(editUser.phoneNumber || "");
            setPhoneNumber2(editUser.phoneNumber2 || "");
            setAge(editUser.age || "");
            setdate(editUser.date || "");
            setDevice(editUser.device || []);
            setCategory(editUser.category || "");
            // Destructure the additional data fields from the other object
            const { additionalInfoTitle = "", additionalInfo = "" } =
                editUser.other || {};
            setAdditionalInfoTitle(additionalInfoTitle);
            setAdditionalInfo(additionalInfo);
        }
    }, [editUser]);

    const handleDeviceSelect = (deviceType) => {
        setSelectedDevices((prevDevices) => ({
            ...prevDevices,
            [deviceType]: !prevDevices[deviceType],
        }));
    };

    useEffect(() => {
        const updatedDevices = Object.keys(selectedDevices).filter(
            (device) => selectedDevices[device]
        );
        setDevice(updatedDevices);
    }, [selectedDevices]);

    return (
        <>
            {screenWidth > 1025 ? (
                <Modal show={editUser} onClose={handleCancelEdit} size="3xl" className="p-6">
                    <Modal.Header>
                        <span className=" font-bold text-[35px] cursor-pointer">Lead Information</span>
                    </Modal.Header>
                    <Modal.Body className="bg-[#e6e7e8] shadow-lg rounded-b-lg">
                        <div className="flex">
                            <div className="w-1/2 pr-4">
                                {/* Form inputs */}
                                <p className="text-lg leading-relaxed text-gray-700">
                                    <strong className="font-semibold">Name:</strong>
                                    <input
                                        required
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700 mt-2">
                                    <strong className="font-semibold">Age :</strong>
                                    <input
                                        name="age"
                                        type="number"
                                        value={age}
                                        onChange={(e) => {
                                            setAge(e.target.value);
                                        }}
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700 mt-2">
                                    <strong className="font-semibold">Email :</strong>
                                    <input
                                        readOnly
                                        type="text"
                                        name="emailId"
                                        value={emailId}
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    />
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700 mt-2">
                                    <strong className="font-semibold">Phone Numer :</strong>
                                    <input
                                        required
                                        type="number"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value);
                                        }}
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    />
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700 mt-2">
                                    <strong className="font-semibold"></strong>
                                    <div className="flex flex-row gap-4 mt-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="50"
                                            viewBox="0 0 24 24"
                                            fill={getCategoryColor()} // Fill color based on category color
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-star mt-2"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        <select
                                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="Gold">Gold</option>
                                            <option value="Silver">Silver</option>
                                            <option value="Bronze">Bronze</option>
                                        </select>
                                    </div>
                                </p>
                            </div>
                            <div className="border-r bg-gray-200 mx-4" style={{ height: 'auto' }}></div>
                            <div className="w-1/2 pl-4">
                                <p className="text-lg leading-relaxed text-gray-700">
                                    <strong className="font-semibold">Date :</strong>
                                    <input
                                        readonly
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                        value={date}
                                    />
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700 mt-2">
                                    <strong className="font-semibold">Alternarte Email :</strong>
                                    <input
                                        required
                                        value={emailId2}
                                        type="email"
                                        onChange={(e) => {
                                            setEmailId2(e.target.value);
                                        }}
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    />
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700 mt-2">
                                    <strong className="font-semibold">Alternate Phone Number :</strong>
                                    <input
                                        required
                                        type="number"
                                        value={phoneNumber2}
                                        onChange={(e) => {
                                            setPhoneNumber2(e.target.value);
                                        }}
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    />
                                </p>
                                <div className="flex gap-8 justify-around w-full mt-6">
                                    <div className="flex gap-6">
                                        <div>
                                            <img className="w-[3rem]" src={PhoneImg} alt="" />
                                            <input
                                                className="ml-4"
                                                type="checkbox"
                                                checked={selectedDevices.SmartPhone}
                                                onChange={() => handleDeviceSelect("SmartPhone")}
                                            />
                                        </div>
                                        <div>
                                            <img className="w-[3rem]" src={TabletImg} alt="" />
                                            <input
                                                className="ml-4"
                                                type="checkbox"
                                                checked={selectedDevices.Tablet}
                                                onChange={() => handleDeviceSelect("Tablet")}
                                            />
                                        </div>
                                        <div>
                                            <img className="w-[3rem]" src={LaptopImg} alt="" />
                                            <input
                                                className="ml-4"
                                                type="checkbox"
                                                checked={selectedDevices.Laptop}
                                                onChange={() => handleDeviceSelect("Laptop")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-col w-full justify-start K2D text-[1.2rem] font-[600] mt-6">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex gap-2 items-center">
                                            {isEditUser && (
                                                <div className="font-[500]">
                                                    {leadsData.map((lead) => {
                                                        if (lead.emailId === id) {
                                                            return (
                                                                <div key={lead.id}>
                                                                    {lead.other &&
                                                                        Object.entries(lead.other).map(
                                                                            ([key, value]) => (
                                                                                <div key={key}>
                                                                                    <span className="text-[#257d8d] font-bold">
                                                                                        {key}:
                                                                                    </span>
                                                                                    <span className="text-[#2b2b2b]">
                                                                                        {value}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                </div>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[1.1rem] K2D font-[600] mb-5">
                                    <span className="text-[#257d8d]">{name}</span>
                                    {device ? (
                                        <span>
                                            {" "}
                                            uses <span>{device.join(", ")}</span>
                                        </span>
                                    ) : (
                                        " has no device information"
                                    )}
                                </p>
                            </div>
                        </div>
                        {isAddingMoreInfo && (
                            <div className="flex flex-col gap-3 w-full justify-center items-center mt-4">
                                {additionalInfoArray.map((info, index) => (
                                    <div key={index} className="flex flex-col gap-3 w-full">
                                        <input
                                            placeholder="Title"
                                            className="flex w-[65%] text-[1.1rem] text-[#257d8d] border border-[#5a5a5a] rounded-[6px] p-2"
                                            type="text"
                                            value={info.title}
                                            onChange={(e) => handleInfoTitleChange(e, index)}
                                        />
                                        <textarea
                                            placeholder="Info"
                                            className="flex w-[65%] h-[6rem] text-[1.1rem] text-[#257d8d] border border-[#5a5a5a] rounded-[6px] p-2 resize-none"
                                            value={info.info}
                                            onChange={(e) => handleInfoChange(e, index)}
                                        />
                                        <button
                                            className="flex text-[white] w-[8rem] p-2 rounded-[10px] justify-center bg-[#a72222]"
                                            onClick={() => handleRemoveMoreInfo(index)}
                                        >
                                            Remove Info
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-end w-full">
                            <div
                                className="flex text-[white] w-[8rem] h-[2.5rem] p-2 rounded-[10px] justify-center bg-[#1d1d1d] mt-4"
                                onClick={handleAddMoreInfo}
                            >
                                Add More Info
                            </div>
                        </div>
                        <div className="flex flex-col  gap-3 w-full justify-center items-center">
                            <Button
                                className="bg-[#30afbc] text-white hover:bg-[#30afbc] w-[10rem]"
                                onClick={handleEdit}
                            >
                                Update
                            </Button>
                            {/* <button
                                className="K2D font-[600] tracking-[1.2px] w-full rounded-[4px] py-2 border-[2px] border-[#222222] bg-[#ffffff] text-[#222222]"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button> */}
                        </div>
                    </Modal.Body>
                </Modal>
            ) : (
                <Modal show={editUser} onClose={handleCancelEdit} size="md">
                    <form className="m-auto flex flex-col gap-6 p-4 border border-[#2297a7] rounded-lg items-center justify-center w-[85vw] max-w-[28rem] bg-white shadow-lg max600:w-[95vw]">
                        <div className="flex flex-col gap-4 w-full">
                            <input
                                required
                                placeholder="Name"
                                className="bg-[#f0f0f0] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                required
                                placeholder="Age"
                                className="bg-[#f7f7f7] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div className="bg-[#f0f0f0] text-[#000] px-4 py-2 rounded-md w-full text-sm">
                                {emailId}
                            </div>
                            <input
                                required
                                placeholder="Alternate Email"
                                className="bg-[#f0f0f0] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                                type="email"
                                value={emailId2}
                                onChange={(e) => setEmailId2(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <input
                                required
                                placeholder="Phone Number"
                                className="bg-[#f0f0f0] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                                type="number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <input
                                required
                                placeholder="Alternate Phone Number"
                                className="bg-[#f7f7f7] text-[#000] px-4 py-2 rounded-md w-full text-sm"
                                type="number"
                                value={phoneNumber2}
                                onChange={(e) => setPhoneNumber2(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4 w-full items-center">
                            <select
                                className="bg-[#f0f0f0] h-10 text-[#000] px-4 py-2 rounded-md w-full text-sm"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Gold">Gold</option>
                                <option value="Silver">Silver</option>
                                <option value="Bronze">Bronze</option>
                            </select>
                            <div className="bg-[#f7f7f7] text-[#000] h-10 flex justify-center items-center px-4 py-2 rounded-md text-sm">
                                {date}
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-4 flex-wrap">
                            {[
                                {
                                    src: PhoneImg,
                                    label: "SmartPhone",
                                    value: selectedDevices.SmartPhone,
                                },
                                {
                                    src: TabletImg,
                                    label: "Tablet",
                                    value: selectedDevices.Tablet,
                                },
                                {
                                    src: LaptopImg,
                                    label: "Laptop",
                                    value: selectedDevices.Laptop,
                                },
                            ].map(({ src, label, value }, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <img className="w-10 h-10" src={src} alt={label} />
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => handleDeviceSelect(label)}
                                    />
                                </div>
                            ))}
                        </div>
                        {isAddingMoreInfo && (
                            <div className="flex flex-col gap-4 w-full justify-center items-center px-4">
                                {additionalInfoArray.map((info, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-3 w-full max-w-[28rem] bg-white p-4 rounded-lg shadow-md"
                                    >
                                        <input
                                            placeholder="Title"
                                            className="w-full text-[1rem] text-[#257d8d] border border-[#5a5a5a] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#257d8d]"
                                            type="text"
                                            value={info.title}
                                            onChange={(e) => handleInfoTitleChange(e, index)}
                                        />

                                        <textarea
                                            placeholder="Info"
                                            className="w-full h-[6rem] text-[1rem] text-[#257d8d] border border-[#5a5a5a] rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#257d8d]"
                                            value={info.info}
                                            onChange={(e) => handleInfoChange(e, index)}
                                        />

                                        <button
                                            className="w-full bg-[#a72222] text-white py-2 rounded-md hover:bg-[#8b1c1c] transition-colors"
                                            onClick={() => handleRemoveMoreInfo(index)}
                                        >
                                            Remove Info
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-col gap-3 w-full mt-4">
                            <button
                                className="bg-[#1d1d1d] text-white rounded-md py-2 w-full text-center"
                                onClick={handleAddMoreInfo}
                            >
                                Add More Info
                            </button>
                            <button
                                className="bg-[#2297a7] text-white rounded-md py-2 w-full border border-[#2297a7] hover:bg-white hover:text-[#2297a7]"
                                onClick={handleEdit}
                            >
                                Update
                            </button>
                            <button
                                className="bg-white text-[#222] rounded-md py-2 w-full border border-[#222]"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default EditLead;