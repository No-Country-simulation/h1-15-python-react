import Icon from "../Icon/Icon";

/* eslint-disable react/prop-types */
const CardAppKey = ({ title, message }) => {
  return (
    <div className="flex bg-white w-full h-[200px] shadow-[0px_1px_10px_0px_#00000010] rounded-[10px] px-[19px] p-5 gap-4 items-center">
      <div className="w-12 h-12 flex items-center justify-center">
        <Icon name="iconCheck" />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-xl font-semibold text-[#232233]">{title}</h4>
        <p className="text-sm md:text-base text-[#6C6C72] mt-2">{message}</p>
      </div>
    </div>
  );
};

export default CardAppKey;
