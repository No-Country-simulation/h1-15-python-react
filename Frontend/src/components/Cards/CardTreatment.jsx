/* eslint-disable react/prop-types */

const CardTreatment = ({ tratamiento, descripcion, color, set }) => {
  const bannerColor = [
    "bg-[#ADD8E6]",
    "bg-[#800080]",
    "bg-[#FFD700]",
    "bg-[#1E3A8A]",
    "bg-[#FFC0CB]",
    "bg-[#4CAF50]",
    "bg-[#FF0000]",
    "bg-[#FF9800]",
    "bg-[#9C27B0]",
    "bg-[#00BCD4]",
    "bg-[#8BC34A]",
    "bg-[#FFEB3B]",
  ];
  return (
    <div
      className="w-full border border-[#1D1B20] rounded-lg hover:shadow-xl cursor-pointer hover:opacity-70 transition-all duration-300 h-[250px]"
      onClick={() => set(color)}
    >
      <div
        id="banner"
        className={`h-[10%] md:h-[30%] rounded-[8px_8px_0_0] ${bannerColor[color ? color : 0]}`}
      ></div>
      <div id="contend" className="font-josefin h-[70%]">
        <h3 className="font-bold text-base md:text-2xl pt-4 pl-5">
          {tratamiento}
        </h3>
        <p className="p-5 text-sm md:text-base">{descripcion}</p>
      </div>
    </div>
  );
};

export default CardTreatment;
