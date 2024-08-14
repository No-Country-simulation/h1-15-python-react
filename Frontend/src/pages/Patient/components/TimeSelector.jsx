/* eslint-disable react/prop-types */

const TimeSelector = ({ availableTimes, selectedTime, onTimeClick }) => {
  const handleClick = (time) => {
    console.log("Hora seleccionada:", time); // Registra la hora seleccionada
    onTimeClick(time);
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Selecciona una hora:</h3>
      <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {availableTimes.length > 0 ? (
          availableTimes.map((time, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded ${
                time === selectedTime
                  ? "bg-gradient-button-2 text-white rounded-custom shadow-inner-custom"
                  : "text-gray-800 border border-1 border-slate-100 shadow-md"
              }`}
              onClick={() => handleClick(time)}
            >
              {time}
            </button>
          ))
        ) : (
          <p className="text-gray-600">No hay horarios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;
