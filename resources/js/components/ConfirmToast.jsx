import React from "react";

function ConfirmToast({ message, onCancel, onConfirm }) {
    return (
        <div className="bg-gray-200 rounded-lg shadow-md p-4 ">
            <p className="font-medium">{message}</p>
            <div className="flex justify-end gap-2 mt-4">
                <button
                    className="px-4 py-2 bg-white rounded hover:bg-gray-300"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={onConfirm}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default ConfirmToast;
