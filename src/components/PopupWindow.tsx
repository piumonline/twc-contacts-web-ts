import React from "react";

interface PopupWindowProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  tableRow: string;
  deletingContactName: string;
}

const PopupWindow: React.FC<PopupWindowProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  tableRow,
  deletingContactName,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur bg-black bg-opacity-50">
      <div className="flex flex-col justify-center bg-white p-4 rounded md:rounded-3xl md:px-4 py-4 text-primary h-[30vh] w-[60vw]">
        {tableRow === "ReadOnlyRow" ? (
          <p className="text-[#083F46] mb-4 flex justify-center text-lg">
            Are you sure you want to delete {deletingContactName}?
          </p>
        ) : (
          <p className="text-[#083F46] mb-4 flex justify-center text-lg">
            Are you sure you want to Save?
          </p>
        )}

        <div className="flex justify-center">
          <button
            className="px-10 py-2 mr-2 bg-[#083F46] text-white rounded-full"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-10 py-2 rounded-full border-[#083F46] border-2"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;
