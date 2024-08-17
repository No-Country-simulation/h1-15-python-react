import { useEffect, useState } from "react";
import CardCrossTransplant from "../../../components/Cards/CardCrossTransplant";
import donantesReceptores from "../../../data/crossTransplants.json";

const DoctorTransplants = () => {
  const [search, setSearch] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [searchReceptor, setSearchReceptor] = useState("");
  const [filterReceptors, setFilterReceptors] = useState(donantesReceptores);
  const [receptores2, setReceptores2] = useState(donantesReceptores);
  const type = { donante: "DONANTE", receptor: "RECEPTOR" };

  const handleChangeSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (e.target.id == "donante") {
      setSearch(searchValue);
    } else {
      setSearchReceptor(searchValue);
    }
  };
  const handleClick = (persona) => {
    const filtered = donantesReceptores.filter(
      (receptor) => persona.Donante.HLA[0] === receptor.HLA[0],
    );
    setReceptores2(filtered);
    setSelectedPersona(persona);
  };
  const handleCloseClick = (e) => {
    e.stopPropagation();
    setSelectedPersona(null);
  };
  useEffect(() => {
    const filtered = donantesReceptores.filter((receptor) =>
      receptor.Donante.Nombre.toLowerCase().includes(search.toLowerCase()),
    );
    setFilterReceptors(filtered);
  }, [search]);
  useEffect(() => {
    if (!selectedPersona) {
      const filtered2 = donantesReceptores.filter((receptor) =>
        receptor.Nombre.toLowerCase().includes(searchReceptor.toLowerCase()),
      );
      setReceptores2(filtered2);
    }
  }, [searchReceptor, selectedPersona]);

  return (
    <section className="flex flex-col w-full h-screen mt-5 gap-5">
      <h3 className="text-center font-semibold">
        Al seleccionar una pareja, se filtrará en la otra columna las parejas
        posiblemente compatibles
      </h3>
      <section className="grid grid-cols-[1fr_1px_1fr] w-full justify-center gap-2 xl:gap-5 mt-4 ">
        <div className="grow w-full ">
          <div className="relative w-full border border-gray-300 bg-transparent rounded-md h-10 flex items-center">
            <input
              id="donante"
              type="text"
              value={search}
              className="appearance-none outline-none bg-transparent peer px-4 w-full"
              onChange={handleChangeSearch}
            />
            <label
              htmlFor="donante"
              className={`bg-white px-1 peer-focus:px-1 absolute left-2 -z-0 peer-focus:scale-100 ${search.length > 0 ? "-translate-y-5" : "peer-focus:-translate-y-5"} transition-transform duration-500`}
            >
              Busqueda por Donante
            </label>
            {search.length > 0 && (
              <div
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-center text-sm border border-slate-400 text-slate-400 font-light hover:border-black hover:text-black hover:font-bold rounded-full transition-all duration-300"
                onClick={() => setSearch("")}
              >
                X
              </div>
            )}
          </div>
          <div className="h-[350px] overflow-y-scroll pr-10">
            {filterReceptors.map((personas, index) => (
              <CardCrossTransplant
                selectedPersona={selectedPersona}
                onCloseClick={handleCloseClick}
                onClick={handleClick}
                key={index}
                HLA_index="0"
                personas={personas}
                type={type.donante}
              />
            ))}
          </div>
        </div>
        <div className="border border-black w-[1px] items-center justify-items-center h-full"></div>
        <div className="grow w-full">
          <div className="relative w-full border border-gray-300 bg-transparent rounded-md h-10 flex items-center">
            <input
              id="receptor"
              type="text"
              value={searchReceptor}
              className="appearance-none outline-none bg-transparent peer px-4 w-full"
              onChange={handleChangeSearch}
            />
            <label
              htmlFor="receptor"
              className={`bg-white px-1 peer-focus:px-1 absolute left-2 -z-0 peer-focus:scale-100 ${searchReceptor.length > 0 ? "-translate-y-5" : "peer-focus:-translate-y-5"} transition-transform duration-500`}
            >
              Busqueda por Receptor
            </label>
            {searchReceptor.length > 0 && (
              <div
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-center text-sm border border-slate-400 text-slate-400 font-light hover:border-black hover:text-black hover:font-bold rounded-full transition-all duration-300"
                onClick={() => setSearchReceptor("")}
              >
                X
              </div>
            )}
          </div>
          <div className="h-[350px] overflow-y-scroll pr-10">
            {receptores2.map((personas, index) => (
              <CardCrossTransplant
                key={index}
                HLA_index="0"
                personas={personas}
                type={type.receptor}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default DoctorTransplants;
