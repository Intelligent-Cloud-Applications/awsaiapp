import React, { useState, useEffect, useRef } from "react";
import offlinepayment from "../../../utils/batch_sample/offlinepayment.csv";
import timetable from "../../../utils/batch_sample/timetable.csv"
import membercreation from "../../../utils/batch_sample/member_creation.csv"
import additem from "../../../utils/batch_sample/AddItemsCafeTest.csv"
import attendance from "../../../utils/batch_sample/attendance.csv"
const InfoTooltip = ({ type }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const tooltipRef = useRef(null);
  const descriptions = {
    timetable: {
      text: "Upload the weekly time table every month which will help to automate the class schedule upload. If there is no changes in timetable monthly, then do not need to upload again. If changes occur, delete the old time table data and upload the new one.",
      sample: timetable
    },
    attendance: {
      text: "Upload the attendance data from zoom by cleaning it manually, which will be uploaded in regular_attendance_report, monthly_report, user_profile report tables. It will help to calculate monthly report of members and instructors attendance.",
      sample: attendance
    },
    leads: {
      text: "Upload the leads in leads table",
      sample: null
    },
    offlinepaymentdata: {
      text: "Upload the offline payment data through csv file in S3 bucket",
      sample: offlinepayment
    },
    createuser: {
      text: "Create New users by uploading csv file to the S3 bucket",
      sample: membercreation
    },
    additems: {
      text: "Add cafe items to dynamodb through csv trigger",
      sample: additem
    }
  };
  const handleSampleDownload = (type) => {
    const sample = descriptions[type]?.sample;
    if (sample) {
      const link = document.createElement('a');
      link.href = sample;
      link.download = `sample_${type}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const handleToggle = () => {
    setActiveTooltip((prev) => (prev === type ? null : type));
  };

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setActiveTooltip(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
    <button
      className="p-2 text-gray-500 hover:text-gray-700 bg-gray-200 rounded-full flex items-center justify-center w-6 h-6"
      onClick={handleToggle}
    >
      <span className="font-bold text-xs">i</span>
    </button>
    {activeTooltip === type && (
      <div
        className={`absolute z-10 w-64 p-4 bg-white border rounded-lg shadow-lg 
          md:-left-8 md:top-8 
          left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        <p className="text-sm text-gray-600 mb-2">{descriptions[type]?.text}</p>
        {descriptions[type]?.sample && (
          <button
            onClick={() => handleSampleDownload(type)}
            className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
          >
            <span>⬇️</span> Download Sample
          </button>
        )}
      </div>
    )}
  </div>
);
};

export default InfoTooltip;