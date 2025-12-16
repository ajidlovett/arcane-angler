// Custom Modal Component - Replaces window.alert and window.confirm
const { useState, useEffect } = React;

export const CustomModal = ({ isOpen, type, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-gray-700">
        <div className="text-white mb-4 whitespace-pre-wrap">{message}</div>
        <div className="flex justify-end gap-2">
          {type === 'confirm' && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => {
              if (type === 'confirm' && onConfirm) {
                onConfirm();
              }
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            {type === 'confirm' ? 'Confirm' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
