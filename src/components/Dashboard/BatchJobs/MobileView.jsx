import React from "react";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineReload } from "react-icons/ai";
const MobileView = ({ jobMappings, batchJobs, handleFileChange,InfoTooltip,formatDate,getUsernameByCognitoId,getUserImageByCognitoId,getConsistentColor,getInitials }) => {
    return(
        <>
          <div className="mt-5 w-full px-2 max600:mb-[5rem]">
            <h2 className="text-lg font-semibold mb-4">Batch Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobMappings.map((job) => {
                const status = batchJobs[`batch_${job.type}_status`] || "";
                const lastUpdate =
                  batchJobs[`batch_${job.type}_lastupdate`] || "";
                const updatedBy =
                  batchJobs[`batch_${job.type}_updatedby`] || "";

                return (
                  <div
                    key={job.type}
                    className="bg-white p-4 shadow-md rounded-md"
                  >
                    <p className="font-bold">
                      <strong>Function:</strong> {job.name}{" "}
                      <InfoTooltip type={job.type} />
                    </p>

                    {status && (
                      <p>
                        <strong>Status:</strong> {status}
                      </p>
                    )}
                    {lastUpdate && (
                      <p>
                        <strong>Last Update:</strong> {formatDate(lastUpdate)}
                      </p>
                    )}
                    {updatedBy && (
                      <p className="flex flex-row gap-1">
                        <strong>Updated By:</strong>{" "}
                        <div className="font-bold flex space-x-2 pb-3 items-center">
                          {updatedBy && getUserImageByCognitoId(updatedBy) ? (
                            <>
                              <img
                                src={getUserImageByCognitoId(updatedBy)}
                                alt="profile"
                                className="w-6 h-6 rounded-full"
                              />
                              {getUsernameByCognitoId(updatedBy) && (
                                <div className="text-sm font-normal">
                                  {getUsernameByCognitoId(updatedBy)}
                                </div>
                              )}
                            </>
                          ) : updatedBy &&
                            getUsernameByCognitoId(updatedBy) !== "" ? (
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor:
                                    getConsistentColor(updatedBy),
                                }}
                              >
                                <span className="text-sm font-bold text-white">
                                  {getInitials(
                                    getUsernameByCognitoId(updatedBy)
                                  )}
                                </span>
                              </div>
                              {getUsernameByCognitoId(updatedBy) && (
                                <div className="text-sm font-normal">
                                  {getUsernameByCognitoId(updatedBy)}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                          )}
                        </div>
                      </p>
                    )}
                    <div className="mt-2">
                      <input
                        type="file"
                        id={`fileInput-${job.type}`}
                        style={{ display: "none" }}
                        onChange={(event) =>
                          handleFileChange(event, job.type, job.bucket)
                        }
                      />
                      <button
                        onClick={() =>
                          document
                            .getElementById(`fileInput-${job.type}`)
                            .click()
                        }
                        className="text-md text-gray-500 hover:text-gray-700 flex flex-row"
                      >
                        {status === "Successful" ? <div className="mt-1"><AiOutlineReload size={18}/></div> :<div className="mt-1"> <FiUploadCloud size={19}/></div>} {status === "Successful" ? "Reupload" : "Upload"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
    );
};

export default MobileView;