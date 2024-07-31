import { useState } from "react";

const Calendar = ({ onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
    );
  };

  const formatDate = (date) => {
    const options = { weekday: "short", day: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);
  };

  const handleDateClick = (date) => {
    if (date !== null) {
      const clickedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        date,
      );
      if (
        clickedDate >= today ||
        clickedDate.toDateString() === today.toDateString()
      ) {
        setSelectedDate(clickedDate);
        console.log(
          "Fecha del calendario seleccionada:",
          formatDate(clickedDate),
        );
        onDateClick(clickedDate); // Llama a la función onDateClick
      }
    }
  };

  const daysOfWeek = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const startDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const adjustedStartDay = (startDay + 6) % 7;

  const getDates = () => {
    const dates = [];
    for (let i = 0; i < adjustedStartDay; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }
    return dates;
  };

  const dates = getDates();

  return (
    <div className="max-w-lg mx-auto fixed bottom-0 left-0 right-0 shadow-lg z-40 font-spartan bg-[#CAD6FF] p-4 mb-14">
      <header className="flex items-center justify-center bg-[#CAD6FF] text-[#00ADDE] py-4 gap-2">
        <button onClick={handlePrevMonth} className="text-lg font-semibold">
          &lt;
        </button>
        <h2 className="text-sm font-semibold uppercase">
          {currentDate
            .toLocaleString("default", { month: "long" })
            .toUpperCase()}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className="text-lg font-semibold">
          &gt;
        </button>
      </header>
      <div className="grid grid-cols-7 text-center bg-[#CAD6FF] text-[#00ADDE] font-light pb-3">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-white bg-[#00ADDE] rounded-[18px] mr-3 text-xs p-2 font-light"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 p-2 rounded-[20px] font-light text-xs bg-white">
        {dates.map((date, index) => {
          const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            date,
          );
          const isPastDate =
            date !== null &&
            clickedDate < today &&
            clickedDate.toDateString() !== today.toDateString();
          const isSelectedDate =
            selectedDate &&
            selectedDate.getDate() === date &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear();
          const isToday =
            today.getDate() === date &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();

          const getClassNames = () => {
            if (isPastDate) {
              return "bg-white text-gray-300 cursor-not-allowed rounded-full";
            }
            if (isSelectedDate || isToday) {
              return "bg-[#00ADDE] text-white rounded-full cursor-pointer";
            }
            return "bg-white text-gray-900 cursor-pointer rounded-full";
          };

          return (
            <div
              key={index}
              onClick={() => !isPastDate && handleDateClick(date)}
              className={`flex items-center justify-center h-10 w-10 ${getClassNames()} text-center`}
            >
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
