import ReactModal from 'react-modal';

export default function ConfirmPopup({ isOpen, onConfirm, onCancel, message }) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onCancel}
            className="w-96 p-4 rounded-md bg-white border border-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            overlayClassName="fixed inset-0 bg-black opacity-90"
            ariaHideApp={false}
        >
            <p className="text-lg mb-4">{message}</p>
            <div className="flex justify-end space-x-4">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={onConfirm}
                >
                    Confirm
                </button>
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </ReactModal>
    );
}