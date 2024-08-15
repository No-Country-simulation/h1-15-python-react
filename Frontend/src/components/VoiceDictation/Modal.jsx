import ReactDOM from "react-dom";
import Icon from "../Icon/Icon";

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, onConfirm, transcript }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-md">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">
            Comienza a hablar ahora..
          </h2>
          <button
            type="button"
            className="flex items-center justify-center transition-all duration-300 rounded-lg animate-blink w-5 h-5 bg-red-400"
          >
            <Icon name="voice" />
          </button>
        </div>
        <p className="mb-4">{transcript}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-magentaButton text-white py-2 px-4 rounded-md"
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
