/* eslint-disable react/prop-types */
const TimeSelector = ({ availableTimes, selectedTime, onTimeClick }) => {
  const handleClick = (time) => {
    onTimeClick(time);
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-2">Selecciona una hora:</h3>
      <div className="grid grid-cols-2 gap-3 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {availableTimes.length > 0 ? (
          availableTimes.map((time, index) => (
            <button
              key={index}
              className={`py-3 px-5 rounded-lg text-lg font-medium transition-transform transform ${
                time === selectedTime
                  ? "bg-gradient-to-r from-pink-600 via-pink-600 to-pink-600 text-white shadow-lg scale-105"
                  : "bg-white border border-gray-300 text-gray-700 shadow-md hover:bg-gray-100 hover:shadow-lg"
              }`}
              onClick={() => handleClick(time)}
            >
              {time}
            </button>
          ))
        ) : (
          <p className="col-span-full text-center">No hay horarios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;
