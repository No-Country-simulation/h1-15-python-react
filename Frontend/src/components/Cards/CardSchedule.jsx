/* eslint-disable react/prop-types */

import Icon from "../Icon/Icon";

const CardSchedule = ({ profileImage, name, specialty, date, timeRange }) => {
  return (
    <div className="grid bg-[#CAD6FF] rounded-lg shadow-lg p-3 gap-4 h-max-[150px]">
      <div className="flex items-start space-x-2">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-sm text-gray-700">{specialty}</span>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex-1 flex items-center bg-white text-[#00ADDE] px-4 rounded-xl gap-2 text-xs">
          <Icon name="calendarSkyblue" />
          <p>{date}</p>
        </div>
        <div className="flex-1 flex items-center bg-white text-[#00ADDE] px-4 rounded-xl gap-2 text-xs">
          <Icon name="clock" />
          <p>{timeRange}</p>
        </div>
      </div>
      <button
        className="w-full bg-[#00ADDE] text-white rounded-[18px] max-h-[27px] focus:outline-none hover:bg-[#0097C8]"
        onClick={() => console.log("Details clicked")}
      >
        <p>Detalles</p>
      </button>
    </div>
  );
};

export default CardSchedule;
