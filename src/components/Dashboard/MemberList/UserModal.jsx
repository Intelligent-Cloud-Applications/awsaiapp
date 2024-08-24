"use client";
import { Modal } from "flowbite-react";

// Utility function to censor email
const censorEmail = (email) => {
  const [name, domain] = email.split('@');
  const censoredName = name.slice(0, 3) + 'xxxxxx';
  return `${censoredName}@${domain}`;
};

// Utility function to censor phone number
const censorPhoneNumber = (phone) => {
  const visibleStart = phone.slice(0, 4);
  const visibleEnd = phone.slice(-1);
  return `${visibleStart}xxxxxx${visibleEnd}`;
};

const UserModal = ({ member, isOpen, onClose }) => {
  if (!member) return null;

  return (
    <Modal show={isOpen} onClose={onClose} size="3xl" className="p-6">
      <Modal.Header className="flex justify-between items-center">
        <span className="font-bold text-xl text-gray-900">{member.userName}</span>
      </Modal.Header>
      <Modal.Body className="bg-gray-50 rounded-lg shadow-lg">
        <div className="flex">
          {/* Left Section */}
          <div className="w-1/2 pr-4">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong className="font-semibold">Email:</strong> {censorEmail(member.emailId)}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Phone:</strong> {censorPhoneNumber(member.phoneNumber)}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Country:</strong> {member.country}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Status:</strong> {member.status}
            </p>
          </div>

          {/* Partition Line */}
          <div className="border-r bg-gray-200 mx-4" style={{ height: 'auto' }}></div>

          {/* Right Section */}
          <div className="w-1/2 pl-4">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong className="font-semibold">Attendance:</strong> {member.zpoints || 0}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Due:</strong> {member.balance}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Product:</strong> {member.product}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-2">
              <strong className="font-semibold">Joining Date:</strong> {new Date(member.joiningDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-4" /> {/* Horizontal Partition line */}
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
