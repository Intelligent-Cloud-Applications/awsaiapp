import React from 'react';
import { FiSave, FiTrash2, FiX } from 'react-icons/fi';

const PrevSectionDraftHandler = ({ isOpen, onClose, onClear, onSaveDraft, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Go Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Would you like to save your progress before going back?
          </p>
        </div>

        {/* Buttons */}
        <div className="p-6 space-y-3">
          {/* Save Draft Button */}
          <button
            onClick={() => {
              onSaveDraft();
              onClose();
            }}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white bg-[#30afbc] rounded-lg hover:bg-[#2b9ea9] transition-colors"
          >
            <FiSave className="w-4 h-4" />
            Save as Draft & Exit
          </button>

          {/* Go Back Without Saving Button */}
          <button
            onClick={() => {
              onContinue();
              onClose();
            }}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-[#30afbc] bg-white rounded-lg hover:bg-gray-50 border border-[#30afbc] transition-colors"
          >
            <FiX className="w-4 h-4" />
            Go Back Without Saving
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-white bg-gray-50 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <FiX className="w-4 h-4" />
            Cancel
          </button>

          {/* Clear Data Button */}
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-200 hover:border-red-600 transition-all duration-200"
          >
            <FiTrash2 className="w-4 h-4" />
            Clear Data & Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrevSectionDraftHandler;