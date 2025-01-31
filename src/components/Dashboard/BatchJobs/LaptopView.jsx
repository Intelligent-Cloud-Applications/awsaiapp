import React from "react";
import { Pagination, Table } from "flowbite-react";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineReload } from "react-icons/ai";

const LaptopView = ({ jobMappings, batchJobs, handleFileChange,InfoTooltip,formatDate,getUsernameByCognitoId,getUserImageByCognitoId,getConsistentColor,getInitials,customTheme }) => {
    return(
        <>
          <div className="mt-5 w-[70rem] max1250:w-[50rem]"></div>
          <div className="bg-white w-full max-w-[100%] rounded-b-md">
            <div className="overflow-x-auto">
              <Table className="w-full text-sm text-left text-gray-500 gap-10">
                <Table.Head className="text-xs text-[#6B7280] bg-[#F9FAFB] gap-x-10">
                  <Table.HeadCell>Function</Table.HeadCell>
                  <Table.HeadCell>Upload</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Last Update</Table.HeadCell>
                  <Table.HeadCell>Updated By</Table.HeadCell>
                </Table.Head>
                <Table.Body className="bg-white divide-y">
                  {jobMappings.map((job) => {
                    const status = batchJobs[`batch_${job.type}_status`] || "";
                    const lastUpdate =
                      batchJobs[`batch_${job.type}_lastupdate`] || "";
                    const updatedBy =
                      batchJobs[`batch_${job.type}_updatedby`] || "";

                    return (
                      <Table.Row key={job.type} className="">
                        <Table.Cell className="font-bold flex flex-row gap-1">
                         <div>{job.name}</div> 
                        <InfoTooltip type={job.type} />
                        </Table.Cell>

                        <Table.Cell>
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
                          {status === "Successful" ? <AiOutlineReload size={18}/> : <FiUploadCloud size={19}/>} {status === "Successful" ? "Reupload" : "Upload"}
                          
                          </button>
                        </Table.Cell>
                        <Table.Cell>{status}</Table.Cell>
                        <Table.Cell>{formatDate(lastUpdate)}</Table.Cell>
                        <Table.Cell>
                          <div className="font-bold flex space-x-2  items-center">
                            {updatedBy && getUserImageByCognitoId(updatedBy) ? (
                              <>
                                <img
                                  src={getUserImageByCognitoId(updatedBy)}
                                  alt="profile"
                                  className="w-10 h-10 rounded-full"
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
                                  className="w-10 h-10 rounded-full flex items-center justify-center"
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
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
            <div className="py-2 flex justify-between items-center px-4">
              <Pagination
                currentPage={1}
                totalPages={1}
                onPageChange={1}
                className="flex justify-end"
                theme={customTheme}
              />
            </div>
          </div>
        </>
    );
};

export default LaptopView;