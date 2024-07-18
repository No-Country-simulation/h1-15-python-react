import CardOptions from "../../components/Cards/CardOptions";

const PatientMain = () => {
  return (
    <main className="flex flex-col justify-start items-center w-full px-6 py-3 font-josefin gap-7">
      <navbar className="flex justify-between w-full items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_238_932)">
            <path
              d="M5.26001 6H18.74"
              stroke="#25282B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12H13"
              stroke="#25282B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.26001 18H18.74"
              stroke="#25282B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_238_932">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div>
          <img className="w-[36px] h-[36px] rounded-full" src="Bung1.png" />
        </div>
      </navbar>
      <h2 className="font-medium text-3xl text-[#25282B] mt-7 self-start">
        Localiza{" "}
        <span className="font-medium text-3xl text-[#A0A4A8]">tu medico</span>
      </h2>
      <div className="relative w-[327px] h-[56px] rounded-[18px] bg-[#F6F6F6] my-auto">
        <input
          placeholder="Busca doctores, indicaciones, etc"
          className="w-full h-full bg-transparent pl-4"
        />
        <img className="absolute right-3 top-4" src="/icons/Search.png" />
      </div>
      <section className="grid grid-cols-2 gap-4 justify-between w-full mt-5">
        <CardOptions
          imagen="/icons/stethoscope.png"
          titulo="Seguimiento Pre-Operatorio"
          color="bg-[#5563C4]"
        />
        <CardOptions
          imagen="/icons/citas.png"
          titulo="Citas Médicas"
          color="bg-[#E58426]"
        />
        <CardOptions
          imagen="/icons/hands.png"
          titulo="Soporte y Comunidad"
          color="bg-[#FBC046]"
        />
        <CardOptions
          imagen="/icons/medicina.png"
          titulo="Medicación"
          color="bg-[#6ED1AF]"
        />
        <CardOptions
          imagen="/icons/notas.png"
          titulo="Historial médico"
          color="bg-[#00ADDE]"
        />
        <CardOptions
          imagen="/icons/telefono.png"
          titulo="Contacto De Emergencia"
          color="bg-[#D22B8B]"
        />
      </section>
    </main>
  );
};

export default PatientMain;
