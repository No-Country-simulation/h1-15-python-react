/* eslint-disable react/prop-types */
import { useState } from "react";

const Calendar = ({ onDateClick }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(today);

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
        onDateClick(clickedDate);
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
    <div className="bg-[#0001] p-4">
      <header className="flex items-center justify-center py-4 gap-2 text-Justina_8">
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
      <div className="grid grid-cols-7 text-center font-light pb-3">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-white bg-Justina_8 rounded-lg mr-3 text-xs p-2 font-light"
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

          const getClassNames = () => {
            if (isPastDate) {
              return "bg-white text-gray-300 cursor-not-allowed rounded-full";
            }
            if (isSelectedDate) {
              return "bg-Justina_8 text-white rounded-full cursor-pointer";
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
