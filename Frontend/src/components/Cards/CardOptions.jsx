/* eslint-disable react/prop-types */
const CardOptions = ({ imagen, titulo, color }) => {
  return (
    <div
      className={`${color} flex flex-col items-center gap-2 rounded-[18px] w-[155px] h-[137px] pt-6 pb-4 px-4`}
    >
      <div className="w-[50px] h-[50px] rounded-xl bg-white flex justify-center items-center">
        <img className="w-[24px] h-[24px]" src={imagen} alt="" />
      </div>
      <div className="flex items-center h-[38px]">
        <p className="text-center text-white text-base font-semibold leading-5">
          {titulo}
        </p>
      </div>
    </div>
  );
};

export default CardOptions;
