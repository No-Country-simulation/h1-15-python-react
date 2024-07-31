import ReactDOM from "react-dom";

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, onConfirm, transcript }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Texto Dictado</h2>
        <p className="mb-4">{transcript}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-Justina_8 text-white py-2 px-4 rounded-md"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
