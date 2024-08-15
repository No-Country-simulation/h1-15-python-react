/* eslint-disable react/prop-types */

import Avatar from "../Avatar";

const CardCrossTransplant = ({
  onCloseClick,
  selectedPersona,
  onClick,
  HLA_index,
  personas,
  type,
}) => {
  return (
    <div
      className={`relative w-full rounded-lg  text-black h-24 flex flex-col justify-between px-4 my-4 shadow-lg cursor-pointer text-sm xl:text-base active:shadow-inner ${selectedPersona?.Nombre === personas?.Nombre ? "bg-blue-200" : "bg-yellow-100"}`}
      onClick={() => onClick(personas)}
    >
      <div className="grid grid-cols-[1fr_6fr_1fr] justify-start gap-4">
        <Avatar
          className="w-5 xl:w-10"
          imagen={`https://api.multiavatar.com/${personas?.Donante.Nombre}.png`}
        />
        <div className="w-full justify-start">
          <p className="font-josefin font-bold">
            {type === "DONANTE" ? "DONANTE" : "RECEPTOR"}
          </p>
          <div className="grid grid-cols-4 justify-items-stretch w-full justify-center">
            <p className="overflow-hidden whitespace-nowrap text-ellipsis">
              {type === "DONANTE"
                ? personas?.Donante?.Nombre
                : personas?.Nombre}{" "}
              {type === "DONANTE"
                ? personas?.Donante?.Apellido
                : personas?.Apellido}
            </p>
            <p className="pl-3 overflow-hidden whitespace-nowrap text-ellipsis">
              {type === "DONANTE" ? personas?.Donante.Edad : personas.Edad} años
            </p>
            <p className="text-center">
              {type === "DONANTE"
                ? personas?.Donante.Grupo_Sanguíneo
                : personas.Grupo_Sanguíneo}
            </p>
            <p>
              {type === "DONANTE"
                ? personas?.Donante.HLA[HLA_index]
                : personas.HLA[HLA_index]}
            </p>
          </div>
        </div>
        <div className="w-5 xl:w-10"></div>
      </div>

      <div
        className={`border ${selectedPersona?.Nombre === personas?.Nombre ? "border-t-blue-400" : "border-t-yellow-200"}`}
      ></div>
      <div className=" grid grid-cols-[1fr_6fr_1fr] justify-end gap-4">
        <div className="w-5 xl:w-10"></div>
        <div className="w-full justify-end">
          <div className="grid grid-cols-4 justify-items-stretch  w-full justify-center ">
            <p className="overflow-hidden whitespace-nowrap text-ellipsis ">
              {type !== "DONANTE"
                ? personas?.Donante?.Nombre
                : personas?.Nombre}{" "}
              {type !== "DONANTE"
                ? personas?.Donante?.Apellido
                : personas?.Apellido}
            </p>
            <p className="pl-3 overflow-hidden whitespace-nowrap text-ellipsis">
              {type !== "DONANTE" ? personas?.Donante.Edad : personas?.Edad}{" "}
              años
            </p>
            <p className="text-center">
              {type !== "DONANTE"
                ? personas?.Donante.Grupo_Sanguíneo
                : personas?.Grupo_Sanguíneo}
            </p>
            <p>
              {type !== "DONANTE"
                ? personas?.Donante.HLA[HLA_index]
                : personas?.HLA[HLA_index]}
            </p>
          </div>
          <p className="text-end font-josefin font-bold">
            {type !== "DONANTE" ? "DONANTE" : "RECEPTOR"}
          </p>
        </div>
        <Avatar
          className="w-5 xl:w-10"
          imagen={`https://api.multiavatar.com/${personas?.Nombre}.png`}
        />
      </div>
      {selectedPersona?.Nombre === personas?.Nombre && (
        <button
          className="absolute -right-8 top-1/2 -translate-y-1/2 rounded-full border border-black w-6 h-6"
          onClick={onCloseClick}
        >
          X
        </button>
      )}
    </div>
  );
};

export default CardCrossTransplant;
