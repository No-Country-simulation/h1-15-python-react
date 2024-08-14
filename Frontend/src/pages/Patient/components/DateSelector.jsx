/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const DateSelector = ({ nextDays, selectedDate, onDateClick }) => (
  <div className="mb-4">
    <p className="text-lg font-semibold">Selecciona una fecha:</p>
    <div className="flex flex-wrap justify-center mt-2 w-full gap-2">
      {nextDays.map((date) => (
        <button
          key={date.toISOString()}
          className={`w-18 py-2 px-4 rounded-lg h-16 md:w-20 md:h-20 ${
            date.toDateString() === selectedDate.toDateString()
              ? "bg-gradient-button-2 text-white rounded-custom shadow-inner-custom"
              : "text-gray-800 border border-1 border-slate-100 shadow-md"
          }`}
          onClick={() => onDateClick(date)}
        >
          {format(date, "dd")}
          <br />
          <span className="text-sm">
            {format(date, "EE", { locale: es })}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default DateSelector;
