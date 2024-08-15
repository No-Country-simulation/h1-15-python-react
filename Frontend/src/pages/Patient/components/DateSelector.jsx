/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const DateSelector = ({ nextDays, selectedDate, onDateClick }) => (
  <div className="mb-6">
    <p className="text-xl font-bold mb-2">Selecciona una fecha:</p>
    <div className="flex flex-wrap justify-center gap-3">
      {nextDays.length > 0 ? (
        nextDays.map((date) => (
          <button
            key={date.toISOString()}
            className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg text-lg font-medium transition-transform transform ${
              date.toDateString() === selectedDate.toDateString()
                ? "bg-gradient-to-r from-pink-600 via-pink-600 to-pink-600 text-white shadow-lg scale-105"
                : "bg-white border border-gray-300 text-gray-700 shadow-md hover:bg-gray-100 hover:shadow-lg"
            }`}
            onClick={() => onDateClick(date)}
          >
            {format(date, "dd")}
            <span className="text-sm font-medium">
              {format(date, "EE", { locale: es })}
            </span>
          </button>
        ))
      ) : (
        <p className="w-full text-center text-gray-500">No hay fechas disponibles.</p>
      )}
    </div>
  </div>
);

export default DateSelector;
