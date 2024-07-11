/* eslint-disable react/prop-types */

const CardFunction = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center w-[266px] h-[171px]">
      <img src={`/icons/${imgSrc}`} alt="" />
      <p className="text-center text-white">{message}</p>
    </div>
  );
};

export default CardFunction;
