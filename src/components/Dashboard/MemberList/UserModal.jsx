"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";

const UserModal = ({ member, isOpen, onClose, onSave, handleDeleteMember }) => {
  const [formData, setFormData] = useState({});
  const [isEditingName, setIsEditingName] = useState(false);

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

<<<<<<< HEAD
  // const handleDelete = () => {
  //   if (!member || !member.cognitoId) {
  //     Swal.fire("Error", "No user ID available.", "error");
  //     return;
  //   }
  
  //   Swal.fire({
  //     title: "Delete User",
  //     text: "Are you sure you want to delete the selected user?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Delete",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleDeleteMember(member.cognitoId);
  //       Swal.fire("Deleted!", "User has been deleted.", "success");
  //       onClose();
  //     } else {
  //       Swal.fire("Cancelled", "User is safe.", "info");
  //     }
  //   });
  // };  

=======
>>>>>>> beta
  if (!member) return null;

  return (
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
                value={formData.emailId || ""}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Phone:</strong>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
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
              <input
                type="text"
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
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
                value={formData.zpoints || formData.zPoints ||""}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Due:</strong>
              <input
                type="text"
                name="balance"
                value={formData.balance || ""}
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
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button
<<<<<<< HEAD
            onClick={()=>handleDeleteMember(member.cognitoId)}
=======
            onClick={() => handleDeleteMember(member.cognitoId)}
>>>>>>> beta
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
  );
};

export default UserModal;
