import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import Navbar from "../components/Home/Navbar";
import "./Full.css";
import { useNavigate } from 'react-router-dom';
import Context from "../context/Context";
const CompleteDraft = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const institutionNames = searchParams.get("institutionName");
    const [templateDetails, setTemplateDetails] = useState(null);
    const [loader, setLoader] = useState(true);
    const { userData } = useContext(Context)
    const util = useContext(Context).util;
    const goBack = () => {
        navigate('/dashboard');
    };
    const [loaderInitialized, setLoaderInitialized] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            if (institutionNames) {
                try {
                    if (!loaderInitialized) { // Check if loader is false and not initialized
                        util.setLoader(true);
                        setLoaderInitialized(true);
                    }

                    const templateResponse = await API.get(
                        "clients",
                        `/user/get-companyData/${institutionNames}`
                    );
                    await setTemplateDetails(templateResponse);

                } catch (error) {
                    console.error("Error fetching details:", error);
                } finally {
                    setLoader(false);
                    util.setLoader(false);
                }
            }
        };

        fetchData();
    }, [institutionNames, loader, loaderInitialized, util]);

    const handleChange = (event, key) => {
        const { value } = event.target;
        setTemplateDetails((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSocialsChange = (event, key) => {
        const { value } = event.target;
        setTemplateDetails((prevState) => ({
            ...prevState,
            socials: {
                ...prevState.socials,
                [key]: value,
            },
        }));
    };

    const downloadImage = (imageUrl) => {
        if (imageUrl) {
            window.open(imageUrl, '_blank');
        } else {
            alert("Please provide an image URL");
        }
    };

    const handleFileChange = async (event, key) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            setTemplateDetails((prevState) => ({
                ...prevState,
                [key]: reader.result,
            }));
            try {
                const response = await Storage.put(
                    `${templateDetails.companyName}/images/${file.name}`,
                    file,
                    {
                        contentType: file.type,
                    }
                );
                let imageUrl = await Storage.get(response.key);
                imageUrl = imageUrl.split("?")[0];
                setTemplateDetails((prevState) => ({
                    ...prevState,
                    [key]: imageUrl,
                }));
                console.log("Uploaded file URL: ", imageUrl);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        };
    };

    const handleVideoChange = async (event) => {
        const videoFile = event.target.files[0];
        try {
            const response = await Storage.put(
                `${templateDetails.companyName}/videos/${videoFile.name}`,
                videoFile,
                {
                    contentType: videoFile.type,
                }
            );
            let videoUrl = await Storage.get(response.key);
            videoUrl = videoUrl.split("?")[0];
            setTemplateDetails((prevState) => ({
                ...prevState,
                videoUrl: videoUrl,
            }));
            console.log("Video uploaded successfully:", videoUrl);
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };

    const handleCountBannerChange = (index, key, value) => {
        setTemplateDetails((prevState) => ({
            ...prevState,
            countBanner: prevState.countBanner.map((item, idx) =>
                idx === index ? { ...item, [key]: value } : item
            ),
        }));
    };

    const handleFileChangeImage = async (event, imageIndex) => {
        const file = event.target.files[0];
        if (!file) return; // Ensure a file is selected

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            try {
                const response = await Storage.put(
                    `${templateDetails.companyName}/AboutUsImage/${file.name}`,
                    file,
                    {
                        contentType: file.type,
                    }
                );
                console.log("File uploaded successfully:", response);

                let imageUrl = await Storage.get(response.key);
                imageUrl = imageUrl.split("?")[0];

                // Update the image URL in `aboutImages`
                setTemplateDetails((prevState) => {
                    const updatedImages = [...prevState.aboutImages];
                    updatedImages[imageIndex] = imageUrl; // Set the uploaded image URL at the right index
                    return { ...prevState, aboutImages: updatedImages };
                });
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        };
    };

    const saveChanges = async () => {
        if (institutionNames === null ||
            templateDetails.companyName === null ||
            templateDetails.description === null ||
            templateDetails.TagLine === "" ||
            templateDetails.TagLine1 === "" ||
            templateDetails.TagLine2 === "" ||
            templateDetails.TagLine3 === "" ||
            templateDetails.address === "" ||
            templateDetails.ownerName === "" ||
            templateDetails.UpiId === "" ||
            templateDetails.estYear === "" ||
            templateDetails.videoUrl === null ||
            templateDetails.phone === "") {
            alert("You have not filled all the required filled please follow up and fill all the required field");
        }
        else {
            util.setLoader(true);
            try {
                console.log("cognito id passing", userData.cognitoId);
                const body = {
                    institutionid: institutionNames,
                    index: "0", // Example index value, replace as needed
                    companyName: templateDetails.companyName || null,
                    PrimaryColor: templateDetails.PrimaryColor || null,
                    SecondaryColor: templateDetails.SecondaryColor || null,
                    logoUrl: templateDetails.logoUrl,
                    LightPrimaryColor: templateDetails.LightPrimaryColor || null,
                    LightestPrimaryColor: templateDetails.LightestPrimaryColor || null,
                    TagLine: templateDetails.TagLine || null,
                    TagLine1: templateDetails.TagLine1 || null,
                    TagLine2: templateDetails.TagLine2 || null,
                    TagLine3: templateDetails.TagLine3 || null,
                    videoUrl: templateDetails.videoUrl,
                    aboutParagraphs: templateDetails.aboutParagraphs || [],
                    aboutImages: templateDetails.aboutImagesUrls,
                    address: templateDetails.address || null,
                    countBanner: templateDetails.countBanner || [],
                    description: templateDetails.description || null,
                    email: templateDetails.email || null,
                    ownerName: templateDetails.ownerName || null,
                    phone: templateDetails.phone || null,
                    privacyPolicy: templateDetails.privacyPolicy || [],
                    socials: templateDetails.socials,
                    ourValues: templateDetails.ourValues || [],
                    estYear: templateDetails.estYear || null,
                    UpiId: templateDetails.UpiId || null,
                    testimonials: templateDetails.testimonials || [],
                    isFormFilled: true,
                    cognitoId:userData.cognitoId,
                };
                console.log("Data requesting for PUT", body);

                // Call the API
                const response = await API.put("clients", "/user/dentalWebDevForm", {
                    body,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("API response:", response);
            } catch (error) {
                console.error("Error saving changes:", error);
                alert("Failed to save changes. Please try again.");
            }
            util.setLoader(false);
            navigate("/dashboard");
        }
    };

    return (
        <>
            <Navbar />
            <div className="mt-[4.5rem] flex justify-center">
                {loader ? (
                    <div className="bg-[#30AFBC] h-screen">
                        <p>Loading...</p> </div>
                ) : (
                    <>
                        <div className="container w-full">
                            <h2 className="text-[40px]">Template Details</h2>
                            <div className="middle-right-section mt-5">
                                <div className="col gap-4">
                                    <h2 className="text-[20px] font-bold ">Company Name<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <p>{templateDetails.companyName}</p>
                                    </div>
                                    <h2 className="text-[20px] font-bold ">Company Description<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.description}
                                            onChange={(event) =>
                                                handleChange(event, "description")
                                            }
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Company Description "
                                            autoFocus
                                        />
                                    </div>
                                    <div>
                                        <p>
                                            <h2 className="text-[20px] font-bold ">Theme Color<span className="text-red-500 ml-1">*</span> :</h2>
                                            <input
                                                type="color"
                                                value={templateDetails.PrimaryColor}
                                                onChange={(event) =>
                                                    handleChange(event, "PrimaryColor")
                                                }
                                                class="rounded-xl h-12 w-12 cursor-pointer border-none outline-none mx-6"
                                                alt=""
                                            />
                                            <input
                                                type="color"
                                                value={templateDetails.SecondaryColor}
                                                onChange={(event) =>
                                                    handleChange(event, "SecondaryColor")
                                                }
                                                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none mx-6"
                                            />
                                            <input
                                                type="color"
                                                value={templateDetails.LightPrimaryColor}
                                                onChange={(event) =>
                                                    handleChange(event, "LightPrimaryColor")
                                                }
                                                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none mx-6"
                                            />
                                            <input
                                                type="color"
                                                value={templateDetails.LightestPrimaryColor}
                                                onChange={(event) =>
                                                    handleChange(event, "LightestPrimaryColor")
                                                }
                                                className="rounded-xl h-12 w-12 cursor-pointer border-none outline-none mx-6"
                                            />
                                        </p>
                                    </div>
                                    <h2 className="text-[20px] font-bold">Logo<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="file"
                                            onChange={(event) => handleFileChange(event, "logoUrl")}
                                            className="w-full text-black border-none outline-none bg-transparent"
                                        />
                                        <button
                                            onClick={() => downloadImage(templateDetails.logoUrl)}
                                            className="absolute top-0 right-0 mt-[15px] mr-2 px-4 py-2 rounded bg-[#30AFBC] text-white"
                                        >
                                            View
                                        </button>
                                    </div>
                                    <h2 className="text-[20px] font-bold">Address<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.address}
                                            onChange={(event) =>
                                                handleChange(event, "address")
                                            }
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Address "
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold">Owner Name<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.ownerName}
                                            onChange={(event) =>
                                                handleChange(event, "ownerName")
                                            }
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Owner Name "
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold">Phone Number<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.phone}
                                            onChange={(event) =>
                                                handleChange(event, "phone")
                                            }
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter PhoneNumber"
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold">Upi Id<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.UpiId}
                                            onChange={(event) =>
                                                handleChange(event, "UpiId")
                                            }
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Upi Id"
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold">Youtube:</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.socials.youTube}
                                            onChange={(event) =>
                                                handleSocialsChange(event, "youTube")
                                            }
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Youtube Link "
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold">Facebook:</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.socials.facebook}
                                            onChange={(event) =>
                                                handleSocialsChange(event, "facebook")
                                            }
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Facebook Link"
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold">Instagram:</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.socials.instagram}
                                            onChange={(event) =>
                                                handleSocialsChange(event, "instagram")
                                            }
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Instagram"
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold">Establishment Year<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="number"
                                            value={templateDetails.estYear}
                                            onChange={(event) =>
                                                handleChange(event, "estYear")
                                            }
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Establishment Year of your company"
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold ">Tagline<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.TagLine}
                                            onChange={(event) => handleChange(event, "TagLine")}
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Short Description TagLine "
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold ">Heading<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.TagLine1}
                                            onChange={(event) => handleChange(event, "TagLine1")}
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Short Description TagLine "
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold ">Short Heading<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.TagLine2}
                                            onChange={(event) => handleChange(event, "TagLine2")}
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Short Description TagLine "
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold ">Descriptive Heading<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="text"
                                            value={templateDetails.TagLine3}
                                            onChange={(event) => handleChange(event, "TagLine3")}
                                            className="w-full text-black border-none outline-none bg-transparent "
                                            placeholder="Enter Short Description TagLine "
                                            autoFocus
                                        />
                                    </div>
                                    <h2 className="text-[20px] font-bold">Video<span className="text-red-500 ml-1">*</span> :</h2>
                                    <div className="rectangular-box">
                                        <input
                                            type="file"
                                            onChange={handleVideoChange}
                                            className="w-full text-black border-none outline-none bg-transparent"
                                        />
                                        <button
                                            onClick={() => downloadImage(templateDetails.videoUrl)}
                                            className="absolute top-0 right-0 mt-[15px] mr-2 px-4 py-2 rounded bg-[#30AFBC] text-white"
                                        >
                                            View
                                        </button>
                                    </div>
                                    {templateDetails.countBanner.map((item, index) => (
                                        <div key={index} className="mb-4">
                                            <h2 className="text-[20px] font-bold">{item.title}<span className="text-red-500 ml-1">*</span> :</h2>
                                            <div className="rectangular-box">
                                                <input
                                                    type="number"
                                                    value={item.count || ""}
                                                    onChange={(event) =>
                                                        handleCountBannerChange(index, "count", event.target.value)
                                                    }
                                                    className="w-full text-black border-none outline-none bg-transparent"
                                                    placeholder={`Enter count for ${item.title}`}
                                                    autoFocus={index === 0}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <h2 className="text-[20px] font-bold">Company Values:</h2>
                                    <div>
                                        {templateDetails.ourValues.length > 0 ? (
                                            templateDetails.ourValues.map((item, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="rectangular-box flex-1">
                                                        <input
                                                            type="text"
                                                            value={item || ""}
                                                            onChange={(event) =>
                                                                setTemplateDetails((prevState) => ({
                                                                    ...prevState,
                                                                    ourValues: prevState.ourValues.map((val, idx) =>
                                                                        idx === index ? event.target.value : val
                                                                    ),
                                                                }))
                                                            }
                                                            className="w-full text-black border-none outline-none bg-transparent"
                                                            placeholder="Enter Company Value"
                                                        />
                                                    </div>
                                                    <span
                                                        onClick={() =>
                                                            setTemplateDetails((prevState) => ({
                                                                ...prevState,
                                                                ourValues: prevState.ourValues.filter(
                                                                    (_, idx) => idx !== index
                                                                ),
                                                            }))
                                                        }
                                                        className="ml-2 cursor-pointer text-red-600 font-bold text-[54px]"
                                                    >
                                                        ×
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No values yet. Add one below!</p>
                                        )}
                                        <button
                                            onClick={() =>
                                                setTemplateDetails((prevState) => ({
                                                    ...prevState,
                                                    ourValues: [...prevState.ourValues, ""],
                                                }))
                                            }
                                            className="bg-[#30AFBC] mb-4 text-white px-4 py-2 rounded-md mt-5"
                                        >
                                            Add Value
                                        </button>
                                    </div>
                                    <h2 className="text-[20px] font-bold">Privacy Policy:</h2>
                                    <div>
                                        {templateDetails.privacyPolicy.length > 0 ? (
                                            templateDetails.privacyPolicy.map((item, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="rectangular-box flex-1">
                                                        <input
                                                            type="text"
                                                            value={item || ""}
                                                            onChange={(event) =>
                                                                setTemplateDetails((prevState) => ({
                                                                    ...prevState,
                                                                    privacyPolicy: prevState.privacyPolicy.map((val, idx) =>
                                                                        idx === index ? event.target.value : val
                                                                    ),
                                                                }))
                                                            }
                                                            className="w-full text-black border-none outline-none bg-transparent"
                                                            placeholder="Enter Privacy Policy"
                                                        />
                                                    </div>
                                                    <span
                                                        onClick={() =>
                                                            setTemplateDetails((prevState) => ({
                                                                ...prevState,
                                                                privacyPolicy: prevState.privacyPolicy.filter(
                                                                    (_, idx) => idx !== index
                                                                ),
                                                            }))
                                                        }
                                                        className="ml-2 cursor-pointer text-red-600 font-bold text-[54px]"
                                                    >
                                                        ×
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No policies yet. Add one below!</p>
                                        )}
                                        <button
                                            onClick={() =>
                                                setTemplateDetails((prevState) => ({
                                                    ...prevState,
                                                    privacyPolicy: [...prevState.privacyPolicy, ""],
                                                }))
                                            }
                                            className="bg-[#30AFBC] mb-4 text-white px-4 py-2 rounded-md mt-5"
                                        >
                                            Add Policy
                                        </button>
                                    </div>
                                    <h2 className="text-[20px] font-bold">About Us:</h2>
                                    <div>
                                        {templateDetails.aboutParagraphs.length > 0 ? (
                                            templateDetails.aboutParagraphs.map((item, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="rectangular-box flex-1">
                                                        <input
                                                            type="text"
                                                            value={item || ""}
                                                            onChange={(event) =>
                                                                setTemplateDetails((prevState) => ({
                                                                    ...prevState,
                                                                    aboutParagraphs: prevState.aboutParagraphs.map((val, idx) =>
                                                                        idx === index ? event.target.value : val
                                                                    ),
                                                                }))
                                                            }
                                                            className="w-full text-black border-none outline-none bg-transparent"
                                                            placeholder="Enter About Us"
                                                        />
                                                    </div>
                                                    <span
                                                        onClick={() =>
                                                            setTemplateDetails((prevState) => ({
                                                                ...prevState,
                                                                aboutParagraphs: prevState.aboutParagraphs.filter(
                                                                    (_, idx) => idx !== index
                                                                ),
                                                            }))
                                                        }
                                                        className="ml-2 cursor-pointer text-red-600 font-bold text-[54px]"
                                                    >
                                                        ×
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No policies yet. Add one below!</p>
                                        )}
                                        <button
                                            onClick={() =>
                                                setTemplateDetails((prevState) => ({
                                                    ...prevState,
                                                    aboutParagraphs: [...prevState.aboutParagraphs, ""],
                                                }))
                                            }
                                            className="bg-[#30AFBC] mb-4 text-white px-4 py-2 rounded-md mt-5"
                                        >
                                            Add About Us
                                        </button>
                                    </div>
                                    <h2 className="text-[20px] font-bold">About Us Images:</h2>
                                    <div>
                                        {templateDetails.aboutImages.length > 0 ? (
                                            templateDetails.aboutImages.map((item, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="rectangular-box flex-1">
                                                        <input
                                                            type="file"
                                                            onChange={(event) => handleFileChangeImage(event, index)}
                                                            className="w-full text-black border-none outline-none bg-transparent"
                                                            placeholder="Choose file"
                                                        />
                                                    </div>
                                                    <span
                                                        onClick={() =>
                                                            setTemplateDetails((prevState) => ({
                                                                ...prevState,
                                                                aboutImages: prevState.aboutImages.filter((_, idx) => idx !== index),
                                                            }))
                                                        }
                                                        className="ml-2 cursor-pointer text-red-600 font-bold text-[54px]"
                                                    >
                                                        ×
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No images yet. Add one below!</p>
                                        )}
                                        <button
                                            onClick={() =>
                                                setTemplateDetails((prevState) => ({
                                                    ...prevState,
                                                    aboutImages: [...prevState.aboutImages, ""],
                                                }))
                                            }
                                            className="bg-[#30AFBC] mb-4 text-white px-4 py-2 rounded-md mt-5"
                                        >
                                            Add Image
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className="px-[50px] mt-4">
                                        <button onClick={goBack} className="bg-[#000000] text-[rgb(255,255,255)] font-bold py-2 px-4 rounded-xl shadow-lg">Back</button>
                                        <button onClick={saveChanges} className="bg-[#000000] text-[#ffffff] font-bold py-2 px-4 rounded-xl shadow-lg">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )};
            </div>
        </>
    );
}

export default CompleteDraft;