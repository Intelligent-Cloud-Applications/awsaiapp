"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";

const UserModal = ({ member, isOpen, onClose, onSave, handleDeleteMember }) => {
  const [formData, setFormData] = useState({});
  const [isEditingName, setIsEditingName] = useState(false);
const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  // Initialize formData when member prop changes
  useEffect(() => {
    if (member) {
      setFormData({ ...member });
    }
  }, [member]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose(); // Close modal after saving
  };

  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
  };

  if (!member) return null;
  console.log("member in the modal", member.institution);

  return (
    <>
      {screenWidth > 1025 ? (
    <>
    <Modal show={isOpen} onClose={onClose} size="3xl" className="p-6">
      <Modal.Header className="flex justify-between items-center">
        {isEditingName ? (
          <input
            type="text"
            name="userName"
            value={formData.userName || ""}
            onChange={handleChange}
            onBlur={handleNameBlur}
            autoFocus
            className="text-xl font-bold text-gray-900 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-md"
          />
        ) : (
          <span
            className="font-bold text-xl text-gray-900 cursor-pointer"
            onClick={handleNameClick}
          >
            {formData.userName || "Click to enter name"}
          </span>
        )}
      </Modal.Header>
      <Modal.Body className="bg-gray-50 rounded-lg shadow-lg">
        <div className="flex">
          <div className="w-1/2 pr-4">
            {/* Form inputs */}
            <p className="text-lg leading-relaxed text-gray-700">
              <strong className="font-semibold">Email:</strong>
              <input
                type="text"
                name="emailId"
                value={formData.emailId || "None"}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Phone:</strong>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || "None"}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Country:</strong>
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Status:</strong>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
                <option value="Trial">Trial</option>
              </select>
            </p>
          </div>

          <div className="border-r bg-gray-200 mx-4" style={{ height: 'auto' }}></div>

          <div className="w-1/2 pl-4">
            {/* Form inputs */}
            <p className="text-lg leading-relaxed text-gray-700">
              <strong className="font-semibold">Attendance:</strong>
              <input
                type="text"
                name="zpoints"
                value={formData.zpoints || formData.zPoints || "0"}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Due:</strong>
              <input
                type="text"
                name="balance"
                value={formData.balance || "0"}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Product:</strong>
              <input
                type="text"
                name="product"
                value={formData.product || ""}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Joining Date:</strong>
              <input
                type="text"
                name="joiningDate"
                value={formData.joiningDate ? new Date(formData.joiningDate).toLocaleDateString() : ""}
                readOnly
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button
            onClick={() => handleDeleteMember(member)}
            className="bg-red-600 text-white"
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c53030')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f56565')}
          >
            Delete User
          </Button>
          <Button onClick={handleSave} className="bg-[#30afbc] text-white hover:bg-[#30afbc] ">
            Save Changes
          </Button>
        </div>
      </Modal.Body>
    </Modal>
    </>):(
      <Modal show={isOpen} onClose={onClose} size="md" className="">
    <Modal.Header className="flex justify-between items-center">
      {isEditingName ? (
        <input
          type="text"
          name="userName"
          value={formData.userName || ""}
          onChange={handleChange}
          onBlur={handleNameBlur}
          autoFocus
          className="text-xl font-bold text-gray-900 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-md w-full"
        />
      ) : (
        <span
          className="font-bold text-lg text-gray-900 cursor-pointer"
          onClick={handleNameClick}
        >
          {formData.userName || "Click to enter name"}
        </span>
      )}
    </Modal.Header>
    <Modal.Body className="bg-gray-50 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
      {/* Form inputs in a single column */}
      <div className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            name="emailId"
            value={formData.emailId || "None"}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || "None"}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="Inactive">Inactive</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Attendance</label>
          <input
            type="text"
            name="zpoints"
            value={formData.zpoints || formData.zPoints || "0"}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Due</label>
          <input
            type="text"
            name="balance"
            value={formData.balance || "0"}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <input
            type="text"
            name="product"
            value={formData.product || ""}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Joining Date</label>
          <input
            type="text"
            name="joiningDate"
            value={formData.joiningDate ? new Date(formData.joiningDate).toLocaleDateString() : ""}
            readOnly
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          onClick={() => handleDeleteMember(member)}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Delete User
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
          Save Changes
        </Button>
      </div>
    </Modal.Body>
  </Modal>

    )}
    </>
  );
};

export default UserModal;
