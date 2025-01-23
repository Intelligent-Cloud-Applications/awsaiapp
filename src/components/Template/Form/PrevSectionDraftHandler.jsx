import React from 'react';
import ReactDOM from 'react-dom';

const PrevSectionDraftHandler = ({ isOpen, onClose, onClear, onSaveDraft, currentSection, setCurrentSection }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50 [@media(max-width:1024px)]:w-full">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Do you want to clear your data or save it as a draft?</h2>
        <div className="flex justify-around gap-4 [@media(max-width:1024px)]:flex-col">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-200"
            onClick={() => {
              onClear();
              onClose();
            }}
          >
            Discard
          </button>
          <button
            className="bg-black text-white px-6 py-3 rounded-lg transition duration-200"
            onClick={() => {
              setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
              onClose();
            }}
          >
            Previous Page
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200"
            onClick={() => {
              onSaveDraft();
              onClose();
            }}
          >
            Save as Draft
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PrevSectionDraftHandler;