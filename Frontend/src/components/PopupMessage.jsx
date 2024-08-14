/* eslint-disable react/prop-types */

import useLanguage from "../hooks/useLanguage";
import Icon from "./Icon/Icon";

const PopupMessage = ({ isOpen, onClose }) => {
  const languageData = useLanguage();

  if (!languageData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-300 backdrop-blur-sm backdrop-brightness-75 bg-opacity-50 z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
          Cargando datos...
        </div>
      </div>
    );
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-300 backdrop-blur-sm backdrop-brightness-75 bg-opacity-50 z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={onClose}
          className="text-3xl absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none"
          aria-label="Cerrar"
        >
          <Icon name="IoClose" size={24} />
        </button>
        <div className="flex text-5xl items-center justify-center mb-4">
          <Icon name="IoWarningOutline" />
        </div>
        <p className="m-6">{languageData.PopupMessage.content}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-magentaButton text-white px-4 py-2 rounded hover:bg-magentaButton-dark focus:outline-none focus:ring focus:ring-magentaButton-light"
          >
            {languageData.PopupMessage.textButton}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PopupMessage;
