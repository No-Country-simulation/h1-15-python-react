import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); 
  const today = new Date(); 

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date) => {
    if (date) {
      const clickedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        date
      );
      if (clickedDate >= today) {
        setSelectedDate(clickedDate);
      }
    }
  };

  const daysOfWeek = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const startDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const adjustedStartDay = (startDay + 6) % 7;

  const getDates = () => {
    let dates = [];
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
    <div className="max-w-md mx-auto bg-white overflow-hidden font-spartan">
      <header className="flex items-center justify-center p-4 bg-[#CAD6FF] text-[#00ADDE] py-5 gap-5">
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
      <div className="grid grid-cols-7 text-center p-2 bg-[#CAD6FF] font-light">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-white bg-[#00ADDE] rounded-[18px] mr-3 text-xs p-2 font-light"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 p-2 rounded-[20px] font-light text-xs">
        {dates.map((date, index) => {
          const isPastDate =
            date &&
            new Date(currentDate.getFullYear(), currentDate.getMonth(), date) <
              today;
          const isSelectedDate =
            selectedDate &&
            selectedDate.getDate() === date &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear();
          const isToday =
            today.getDate() === date &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();

          return (
            <div
              key={index}
              onClick={() => !isPastDate && handleDateClick(date)}
              className={`flex items-center justify-center h-10 w-10 ${
                isPastDate
                  ? "bg-white text-gray-300 cursor-not-allowed rounded-full"
                  : isSelectedDate
                  ? "bg-[#00ADDE] text-white rounded-full cursor-pointer"
                  : isToday
                  ? "bg-[#00ADDE] text-white rounded-full cursor-pointer"
                  : "bg-white text-gray-900 cursor-pointer rounded-full"
              } text-center`}
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
