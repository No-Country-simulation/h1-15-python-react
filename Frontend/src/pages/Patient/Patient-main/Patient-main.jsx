import { useEffect, useState } from 'react';
import CardOptions from "../../../components/Cards/CardOptions";
import Icon from "../../../components/Icon/Icon";
import cardData from '../../../data/patientCardData.json'; 

const PatientMain = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(cardData);
  }, []);

  return (
    <main className="max-w-lg mx-auto flex flex-col items-center w-full p-6 font-josefin gap-7">
      <navbar className="flex justify-between w-full items-center">
        <Icon name="bars" />
        <div>
          <img className="w-[36px] h-[36px] rounded-full" src="/Bung1.png" />
        </div>
      </navbar>
      <h2 className="font-medium text-3xl text-[#25282B] mt-7 self-start">
        Localiza{" "}
        <span className="font-medium text-3xl text-[#A0A4A8]">tu médico</span>
      </h2>
      <div className="w-full relative h-[56px] rounded-[18px] bg-[#F6F6F6] my-auto">
        <input
          placeholder="Busca doctores, indicaciones, etc"
          className="w-full h-full bg-transparent pl-4 outline-none"
        />
        <img
          className="absolute right-3 top-4 cursor-pointer"
          src="/icons/Search.png"
        />
      </div>
      <section className="grid grid-cols-2 gap-4 w-full mt-5">
        {cards.map((card, id) => (
          <CardOptions
            key={id}
            imagen={card.imagen}
            titulo={card.titulo}
            color={card.color}
            link={card.link}
          />
        ))}
      </section>
    </main>
  );
};

export default PatientMain;
