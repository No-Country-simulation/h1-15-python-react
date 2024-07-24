/* eslint-disable react/prop-types */

import Icon from "../Icon/Icon";

const CardSchedule = ({ profileImage, name, specialty, date, timeRange }) => {
  return (
    <div className="bg-[#CAD6FF] p-4 rounded-lg shadow-lg max-w-md mx-auto px-[26px]">
      <div className="flex items-start space-x-4">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="text-lg font-semibold">{name}</span>
          <span className="text-gray-700">{specialty}</span>
        </div>
      </div>
      <div className="flex justify-between mt-4 gap-3">
        <div className="flex-1 flex items-center bg-white text-[#00ADDE] px-4 rounded-xl gap-2 text-sm">
          <Icon name="calendarSkyblue" />
          <p>{date}</p>
        </div>
        <div className="flex-1 flex items-center bg-white text-[#00ADDE] px-4 rounded-xl gap-2 text-sm">
          <Icon name="clock" />
          <p>{timeRange}</p>
        </div>
      </div>
      <button
        className="mt-4 w-full h-10 bg-[#00ADDE] text-white py-2 rounded-[18px] focus:outline-none hover:bg-[#0097C8]"
        onClick={() => console.log("Details clicked")}
      >
        Detalles
      </button>
    </div>
  );
};

export default CardSchedule;
