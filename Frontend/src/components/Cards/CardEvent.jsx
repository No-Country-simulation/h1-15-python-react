/* eslint-disable react/prop-types */
const CardEvent = ({
  color,
  eventAction,
  eventName,
  eventTime,
  eventTimeUnit,
}) => {
  return (
    <div className="flex items-center p-4 bg-[#E4E4E4] shadow-inner-custom  font-sans text-xs md:text-base">
      <div
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <div className="ml-3 flex-grow">
        <div>
          <span className="font-light">{eventAction} </span>
          <span className="font-medium underline">{eventName}</span>
        </div>
      </div>
      <div>
        <span className="font-normal text-normal text-gray-600">{eventTime}</span>{" "}
        <span className="font-semibold super text-xs text-gray-400">{eventTimeUnit}</span>
      </div>
    </div>
  );
};

export default CardEvent;
