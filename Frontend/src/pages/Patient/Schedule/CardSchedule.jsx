/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon/Icon";

const CardSchedule = ({
  profileImage,
  name,
  specialty,
  date,
  timeRange,
  id,
}) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/patient/schedule/details/${id}`);
  };

  return (
    <div className="grid bg-[#0001] shadow-card-shadow rounded-lg p-4 gap-4 h-auto w-full md:max-w-lg">
      <div className="flex items-start space-x-3 md:space-x-4">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="text-sm md:text-base font-semibold">{name}</span>
          <span className="text-xs md:text-sm text-gray-700">{specialty}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 md:gap-4">
  <div className="flex-1 flex items-center bg-white text-Justina_8 px-2 md:px-4 py-1 rounded-xl gap-2 text-xs md:text-sm min-h-[40px] flex-shrink-0 whitespace-nowrap overflow-hidden uppercase">
    <Icon name="calendarSkyblue" />
    <p className="truncate">{date}</p>
  </div>
  <div className="flex-1 flex items-center bg-white text-Justina_8 px-2 md:px-4 py-1 rounded-xl gap-2 text-xs md:text-sm min-h-[40px] flex-shrink-0 whitespace-nowrap overflow-hidden">
    <Icon name="clock" />
    <p className="truncate">{timeRange}</p>
  </div>
</div>



      <button
        className="w-full h-[40px] bg-Justina_8 text-white rounded-lg py-1 text-sm md:text-base focus:outline-none"
        onClick={handleDetailsClick}
      >
        <p>Detalles</p>
      </button>
    </div>
  );
};

export default CardSchedule;
