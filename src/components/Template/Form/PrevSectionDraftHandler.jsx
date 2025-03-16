import React from 'react';
import ReactDOM from 'react-dom';
import { FiSave, FiTrash2, FiChevronLeft } from 'react-icons/fi';

const PrevSectionDraftHandler = ({ isOpen, onClose, onClear, onSaveDraft, currentSection, setCurrentSection }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 relative transform transition-all">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Save Your Progress
            </h2>
            <p className="mt-2 text-gray-600">
              Choose how you'd like to proceed with your current changes
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            {/* Previous Page Button */}
            <button
              onClick={() => {
                setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#30afbc] text-white rounded-lg hover:bg-[#2b9ea9] transition-colors"
            >
              <FiChevronLeft className="w-5 h-5" />
              Previous Page
            </button>

            {/* Save as Draft Button */}
            <button
              onClick={() => {
                onSaveDraft();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-[#30afbc] border-2 border-[#30afbc] rounded-lg hover:bg-teal-50 transition-colors"
            >
              <FiSave className="w-5 h-5" />
              Save as Draft
            </button>

            {/* Discard Button */}
            <button
              onClick={() => {
                onClear();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiTrash2 className="w-5 h-5" />
              Discard Changes
            </button>
          </div>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PrevSectionDraftHandler;