/* eslint-disable react/prop-types */

const PopupMessage = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center">¡Atención!</h2>
            <p className="mb-4">
              Debe elegir un médico para continuar con su cita.
            </p>
            <button
              onClick={onClose}
              className="bg-footer-gradient text-white px-4 py-2 rounded"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupMessage;
