/* eslint-disable react/prop-types */

import useLanguage from "../hooks/useLanguage";

const PopupMessage = ({ isOpen, onClose }) => {
  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center">{languageData.PopupMessage.title}</h2>
            <p className="mb-4">
            {languageData.PopupMessage.content}
            </p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-footer-gradient text-white px-4 py-2 rounded"
              >
                {languageData.PopupMessage.textButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupMessage;
