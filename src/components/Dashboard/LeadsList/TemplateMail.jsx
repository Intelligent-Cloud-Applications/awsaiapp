import React, { useState, useContext, useEffect } from 'react';
import { API } from 'aws-amplify';
import Context from '../../../context/Context';
import { useLocation } from 'react-router-dom';
import SearchIcon from '../../../utils/Assets/Dashboard/images/SVG/Search.svg';
import Arrow from '../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg';
import './TemplateMail.css';
import Pagination from "@mui/material/Pagination";

const TemplateMail = () => {
    const { util } = useContext(Context);
    const location = useLocation();
    const itemsPerPage = 9;
    const { dataToMail } = location.state || {};
    const institution = dataToMail?.[0]?.institution || '';
    const [searchInput, setSearchInput] = useState('');
    const [templateData, setTemplateData] = useState([]);
    const [templateName, setTemplateName] = useState('');
    const [templateSubject, setTemplateSubject] = useState('');
    const [addNewValue, setAddNewValue] = useState(false);
    const [templateContent, setTemplateContent] = useState('');
    const [viewTemplate, setViewTemplate] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (event, pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastLead = currentPage * itemsPerPage;
    const indexOfFirstLead = indexOfLastLead - itemsPerPage;
    const newName = `${institution}_${templateName}`;

    // const currentLeads = searchInput.slice(indexOfFirstLead, indexOfLastLead);

    // Fetch templates based on institution
    const fetchTemplates = async (institution) => {
        util.setLoader(true);
        try {
            const response = await API.get('clients', `/user/get-ses-templates/${institution}?action=list`);
            setTemplateData(response || []);
            console.log("template", response);
        } catch (error) {
            console.error('Error fetching templates:', error);
            // Handle error appropriately
        } finally {
            util.setLoader(false);
        }
    };

    const handleSendMail = async () => {
        const payload = {
            emailIds: filteredEmails,
            templateName: selectedTemplate
        };

        console.log('Sending request with payload:', payload);

        try {
            const response = await API.post('clients', `/user/send-emails-to-leads/${institution}`, {
                body: payload
            });
            console.log('Response:', response);
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending emails:', error);
            alert('Error sending emails. Please try again later.');
        }
    };
    
    
    

    useEffect(() => {
        if (institution) {
            fetchTemplates(institution);
        }
        // eslint-disable-next-line
    }, [institution]);

    useEffect(() => {
        if (dataToMail) {
            const emails = dataToMail
                .filter(item => item.institution === institution)
                .map(item => item.emailId) || [];
            setFilteredEmails(emails);
        }
    }, [dataToMail, institution]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchInput]);

    const filteredTemplates = templateData.filter(templateData =>
        templateData && templateData.toLowerCase().includes(searchInput.toLowerCase())
    );

    const currentTemplates = filteredTemplates.slice(indexOfFirstLead, indexOfLastLead);

    // const handleViewTemplate = (template) => {
    //     setViewTemplate(template);
    // };

    const handleClosePopup = () => {
        setAddNewValue(false);
        setViewTemplate(null);
    };

    const addTemplate = () => {
        setAddNewValue(true);
    };

    const handleTemplateOnChange = (event) => {
        setTemplateContent(event.target.value);
    };

    const handleNameOfTemplate = (event) => {
        setTemplateName(event.target.value);
    };

    const handleSubjectOfTemplate = (event) => {
        setTemplateSubject(event.target.value);
    };

    const handleRadioChange = (data) => {
        setSelectedTemplate(data);
    };

    const handleDoneClick = async () => {
        setSelectedTemplate(newName);
        const dataToCreate = {
            'TemplateName': newName,
            'SubjectPart': templateSubject,
            'HtmlPart': templateContent,
            'TextPart': "null"
        };

        try {
            const response = await API.post('clients', `/user/create-ses-template/${institution}`, {
                body: dataToCreate
            });
            console.log('Response:', response);
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending emails:', error);
            alert('Error creating emails. Please try again later.');
        }
        handleClosePopup();
    };

    console.log(selectedTemplate);
    console.log("emails", filteredEmails);
    console.log("name after set name", newName);
    console.log("name after set subject", templateSubject);

    return (
        <div className="ml-[9rem] mt-[5rem] max1300:ml-[5rem] max800:ml-[3rem] max500:ml-0">
            <h2 className='text-[2.3125rem] K2D font-[600]'>Mail Templates</h2>
            <main
                className="w-[82vw] bg-[#fff5] max600:w-[90vw] max600:relative"
                style={{
                    boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "0.8rem",
                }}
            >
                <section className="w-full h-[7%] bg-[#2c2c2c] rounded-t-[0.8rem] flex items-center justify-end">
                    <div className="flex bg-white mr-[4rem] w-[28.25rem] rounded-[0.1875rem] p-[0.1rem] max600:mr-[1.2rem] max600:my-[0.3rem] max600:w-[80vw]">
                        <img className="w-[1.9rem] h-[1.9rem] opacity-60 ml-2" src={SearchIcon} alt="Search" />
                        <input
                            className="flex-1 outline-none rounded-md K2D text-[#000] text-[0.9rem] tracking-[1px] font-[600] max600:text-[0.8rem]"
                            type="text"
                            placeholder="Search “Template Name”"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <img className="w-[1rem] h-[1.5rem] mt-1 mr-[0.8rem] opacity-50" src={Arrow} alt="Arrow" />
                    </div>
                    <div className="max600:absolute max600:top-[-50%] max600:right-[-1%] max600:p-1 max600:flex">
                        <button
                            className="bg-[#3193b6] text-white py-3 px-4 flex items-center mr-8 max600:rounded-[7px] max600:h-[3rem]"
                            onClick={addTemplate}
                        >
                            <span className="mr-2">+</span> Add New
                        </button>
                    </div>
                </section>
                <section className='table_body K2D w-[95%] border border-[#2e2e2e] rounded-[6px] overflow-auto bg-[#fffb] my-[1rem] mb-[1rem] mx-auto custom-scrollbar'>
                    <table className="w-full">
                        <thead className="border-b text-[1.1rem] font-[600] border-[#2e2e2e]">
                            <tr>
                                <th className="w-1/4">Template Name</th>
                                <th className="w-1/4">Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTemplates.length > 0 ? (
                                currentTemplates.map((templateData, index) => (
                                    <tr key={index} className="font-[500]">
                                        <td className="w-1/4">{templateData}</td>
                                        <td className="w-1/4">
                                            <input
                                                type="radio"
                                                className="h-[20px] w-[20px]"
                                                name="selectedTemplate"
                                                onChange={() => handleRadioChange(templateData)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center">No templates found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
                {addNewValue && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button className="close-button" onClick={handleClosePopup}>×</button>
                            <h2 className='text-[2.3125rem] K2D font-[600]'>Write a Template</h2>
                            <div className='m-[2%] flex flex-col gap-5'>
                                <input
                                    type="text"
                                    placeholder='Name of your template'
                                    className='h-[2rem] w-[15rem] p-[2%] border border-[#2e2e2e]'
                                    value={templateName}
                                    onChange={handleNameOfTemplate}
                                />
                                <input
                                    type="text"
                                    placeholder='Subject of your template'
                                    className='h-[2rem] w-[15rem] p-[2%] border border-[#2e2e2e]'
                                    value={templateSubject}
                                    onChange={handleSubjectOfTemplate}
                                />
                                <textarea
                                    placeholder='Type the body of your mail here in HTML format'
                                    className='h-[20rem] w-[25rem] p-[2%] border border-[#2e2e2e]'
                                    value={templateContent}
                                    onChange={handleTemplateOnChange}
                                />
                            </div>
                            <button className="bg-[#3193b6] text-white py-3 px-4 flex items-center" onClick={() => { handleDoneClick() }}>
                                Done
                            </button>
                        </div>
                    </div>
                )}
                {viewTemplate && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button className="close-button" onClick={handleClosePopup}>×</button>
                            <h2 className='text-[2.3125rem] K2D font-[600]'>{viewTemplate.name}</h2>
                            <div className='m-[2%]'>
                                <p>{viewTemplate.body}</p>
                            </div>
                        </div>
                    </div>
                )}
                <Pagination
                    count={Math.ceil(filteredTemplates.length / itemsPerPage)}
                    page={currentPage}
                    onChange={paginate}
                    className="custom-pagination"
                />
            </main>
            <div
                style={{
                    position: "absolute",
                    right: "10rem",
                    bottom: "1rem",
                }}
            >
                <button
                    className="bg-[#3193b6] text-white py-3 px-4 flex items-center rounded-[10px] max600:h-[3rem]"
                    onClick={handleSendMail}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default TemplateMail;
