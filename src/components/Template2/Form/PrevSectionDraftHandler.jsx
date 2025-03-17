import React from 'react';
import ReactDOM from 'react-dom';
import { FiSave, FiTrash2, FiChevronLeft } from 'react-icons/fi';

const PrevSectionDraftHandler = ({ isOpen, onClose, onClear, onSaveDraft, currentSection, setCurrentSection }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-6">
            <FiSave className="w-8 h-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Save Your Progress</h2>
          <p className="text-gray-600 mt-2">
            Would you like to save your current progress as a draft before going back?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
          >
            <FiTrash2 className="w-5 h-5" />
            <span>Discard</span>
          </button>

          <button
            onClick={() => {
              setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
              onClose();
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <FiChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => {
              onSaveDraft();
              onClose();
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            <FiSave className="w-5 h-5" />
            <span>Save Draft</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PrevSectionDraftHandler;