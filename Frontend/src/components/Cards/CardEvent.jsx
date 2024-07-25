/* eslint-disable react/prop-types */
const CardEvent = ({
  color,
  eventAction,
  eventName,
  eventTime,
  eventTimeUnit,
}) => {
  return (
    <div className="flex items-center p-4 bg-[#E4E4E4] shadow-inner-custom font-josefin">
      <div
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <div className="ml-3 flex-grow">
        <div>
          <span className="font-light">{eventAction} </span>
          <span className="font-normal">{eventName}</span>
        </div>
      </div>
      <div className="text-gray-600">
        <span className="font-light">{eventTime}</span>{" "}
        <span className="font-normal">{eventTimeUnit}</span>
      </div>
    </div>
  );
};

export default CardEvent;
