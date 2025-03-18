import React, { useContext, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import Context from "../../../context/Context";
import InfoTooltip from "./InfoTooltip";
import MobileView from "./MobileView";
import LaptopView from "./LaptopView"
function BatchJobs({ tempInstitution }) {
  const [batchJobs, setBatchJobs] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const { util, userData } = useContext(Context);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Ctx = useContext(Context);
  const [LoaderInitialized, setLoaderInitialized] = useState(false);
  useEffect(() => {
    const fetchAndCheckBatchJobs = async () => {
      if (LoaderInitialized) {
        return;
      }
      util.setLoader(true);
      setLoaderInitialized(true);

      try {
        const institution = userData.tempinstitutionName || tempInstitution;
        const apiName = "clients";
        const path = `/admin/get-batchjob/${institution}`;
        const response = await API.get(apiName, path);
        setBatchJobs(response);

        const now = new Date();
        const firstDayOfMonth =
          new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000;
        let jobMappings = [];
        if (response.institutionType === "DanceStudio") {
          jobMappings = [
            { type: "timetable" },
            { type: "attendance" },
            { type: "leads" },
            { type: "offlinepaymentdata" },
            { type: "createuser" },
          ];
        }
        if (jobMappings.length === 0) {
          console.log("No jobs to process. Exiting.");
          return;
        }
        for (const job of jobMappings) {
          const lastUpdate = response[`batch_${job.type}_lastupdate`];
          const cognitoId = response[`batch_${job.type}_updatedby`];
          const status = response[`batch_${job.type}_status`];

          if (
            status === "Failed" ||
            typeof status === "undefined" ||
            status === null
          ) {
            console.log(`Skipping ${job.type} because its status is "Failed".`);
            continue;
          }

          if (!lastUpdate || lastUpdate < firstDayOfMonth) {
            try {
              const updatePath = `/admin/update-batchjob/${institution}`;
              const options = {
                queryStringParameters: { type: job.type },
                body: {
                  [`batch_${job.type}_status`]: "Failed",
                  [`batch_${job.type}_updatedby`]: cognitoId,
                  [`batch_${job.type}_lastupdate`]: lastUpdate,
                },
              };

              await API.put(apiName, updatePath, options);

              setBatchJobs((prevJobs) => ({
                ...prevJobs,
                [`batch_${job.type}_lastupdate`]: lastUpdate,
                [`batch_${job.type}_updatedby`]: cognitoId,
              }));
              const response = await API.get(apiName, path);
              setBatchJobs(response);
              console.log(`Updated ${job.type} successfully.`);
            } catch (error) {
              console.error(`Error updating ${job.type}:`, error);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching batch jobs:", error);
      } finally {
        util.setLoader(false);
      }
    };

    fetchAndCheckBatchJobs();
  }, [LoaderInitialized, userData, util, tempInstitution, batchJobs]);

  const useDataForSales = Ctx.saleData || [];
  const getUsernameByCognitoId = (cognitoId) => {
    const trimmedInputId = String(cognitoId).trim();

    const user = useDataForSales.find((user) => {
      return user.cognitoId && String(user.cognitoId).trim() === trimmedInputId;
    });
    console.log("user Name:", user);
    return user ? user.userName : "";
  };
  const getConsistentColor = (cognitoId) => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FFC300",
      "#C70039",
      "#900C3F",
      "#581845",
    ];

    let hash = 0;
    for (let i = 0; i < cognitoId.length; i++) {
      hash = cognitoId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };
  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
    return initials;
  };
  const getUserImageByCognitoId = (cognitoId) => {
    const trimmedInputId = String(cognitoId || "").trim();

    if (!trimmedInputId) {
      return getInitials(userData?.userName || "");
    }
    const user = useDataForSales.find(
      (user) =>
        user?.cognitoId && String(user.cognitoId).trim() === trimmedInputId
    );

    return user?.imgUrl;
  };

  const handleFileChange = async (event, type, bucketName) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Please select a CSV file.");
      return;
    }

    setSelectedFile(file);
    console.log(selectedFile);

    try {
      util.setLoader(true);
      const cognitoId = userData.cognitoId;
      const institution = userData.tempinstitutionName || tempInstitution;

      const fileKey = `${type}/${Date.now()}-${institution}-${file.name}`;
      const unixTimestamp = Math.floor(Date.now() / 1000);
      await Storage.put(fileKey, file, {
        bucket: bucketName,
        contentType: file.type,
      });

      console.log(`File uploaded successfully to S3: ${fileKey}`);

      const apiName = "clients";
      const path = `/admin/update-batchjob/${institution}`;
      const options = {
        queryStringParameters: { type },
        body: {
          [`batch_${type}_status`]: "Successful",
          [`batch_${type}_updatedby`]: cognitoId,
          [`batch_${type}_lastupdate`]: unixTimestamp,
        },
      };

      const response = await API.put(apiName, path, options);

      console.log(`${type} updated successfully:`, response);

      setBatchJobs((prevJobs) => ({
        ...prevJobs,
        [`batch_${type}_status`]: "Successful",
        [`batch_${type}_lastupdate`]: unixTimestamp,
        [`batch_${type}_updatedby`]: cognitoId,
      }));
    } catch (error) {
      console.error(`Error uploading and updating ${type}:`, error);

      const unixTimestamp = Math.floor(Date.now() / 1000);
      setBatchJobs((prevJobs) => ({
        ...prevJobs,
        [`batch_${type}_status`]: "Failed",
        [`batch_${type}_lastupdate`]: unixTimestamp,
        [`batch_${type}_updatedby`]: userData.cognitoIdd,
      }));
    } finally {
      util.setLoader(false);
    }
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp * 1000);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

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

  let jobMappings = [];
  const isProd = process.env.REACT_APP_STAGE === "PROD";

  if (batchJobs.institutionType === "DanceStudio") {
    jobMappings = [
      {
        name: "TimeTable",
        type: "timetable",
        bucket: isProd ? "timetable-s3" : "institution-utils",
      },
      {
        name: "Attendance",
        type: "attendance",
        bucket: isProd ? "attendance--report" : "institution-utils",
      },
      {
        name: "Leads",
        type: "leads",
        bucket: isProd
          ? "leads-data-production-upload-to-dynamodb"
          : "institution-utils",
      },
      {
        name: "Offline Payment Data",
        type: "offlinepaymentdata",
        bucket: isProd ? "payment-confirmation-prod" : "institution-utils",
      },
      {
        name: "Create New Users",
        type: "createuser",
        bucket: isProd
          ? "member-creation-with-cognito-id-and-default-password"
          : "institution-utils",
      },
    ];
  } else if (batchJobs.institutionType === "Cafe") {
    jobMappings = [
      {
        name: "Add items",
        type: "additems",
        bucket: isProd
          ? "institution-cafe-items-data-csv-upload"
          : "institution-utils",
      },
    ];
  } 
  else if (batchJobs.institutionType === "Dentist") {
    jobMappings = [
      {
        name: "Create Dentist",
        type: "createdentist",
        bucket: isProd
          ? "prod-create-dentist-batch-job"
          : "institution-utils",
      },
      {
        name: "Appointment Add",
        type: "appointmentadd",
        bucket: isProd
          ? "prod-add-dentist-appointments-batch-job"
          : "institution-utils",
      }
    ];
  }else {
    jobMappings = [];
  }

  return (
    <>
      {screenWidth > 1025 ? (
        <LaptopView
        jobMappings={jobMappings}
        batchJobs={batchJobs}
        handleFileChange={handleFileChange}
        InfoTooltip={InfoTooltip}
        formatDate={formatDate}
        getUsernameByCognitoId={getUsernameByCognitoId}
        getUserImageByCognitoId={getUserImageByCognitoId}
        getConsistentColor={getConsistentColor}
        getInitials={getInitials}
        customTheme={customTheme}
      />
      ) : (
        <MobileView
        jobMappings={jobMappings}
        batchJobs={batchJobs}
        handleFileChange={handleFileChange}
        InfoTooltip={InfoTooltip}
        formatDate={formatDate}
        getUsernameByCognitoId={getUsernameByCognitoId}
        getUserImageByCognitoId={getUserImageByCognitoId}
        getConsistentColor={getConsistentColor}
        getInitials={getInitials}
      />
  
      )}
    </>
  );
}

export default BatchJobs;
