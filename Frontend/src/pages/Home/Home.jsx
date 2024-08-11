import { useNavigate } from "react-router-dom";
import CardAppKey from "../../components/Cards/CardAppKeys";
import CardFunction from "../../components/Cards/CardFunction";
import CardPeople from "../../components/Cards/CardPeople";
import Footer from "../../components/Footer";
import Carousel from "../../components/Slider/Slider";
import LanguageSelector from "../../languages/selector/LanguageSelector";
import useLanguage from "../../hooks/useLanguage";
// import ChatBot from "../../components/ChatBot/ChatBot";

function Home() {
  const navigate = useNavigate();
  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <main className="flex flex-col items-center w-full max-w-screen-2xl mx-auto bg-gradient-background_1 font-josefin">
      <nav className="flex pt-4 pb-16 px-6 md:px-14 items-center justify-between w-full">
        <div className="w-[100px] h-full rounded-md">
          <img src="/justinaLogo.webp" alt="logo" className="w-full h-auto" />
        </div>

        <section className="flex gap-2">
          <LanguageSelector />
          <button
            onClick={handleLoginClick}
            className="bg-magentaButton h-[34px] text-sm text-white rounded-md hover:bg-magentaButtonDark transition duration-300 px-4 flex items-center justify-center"
            aria-label={languageData.home.navbar.title}
          >
            <span className="text-xs md:text-sm">
              {languageData.home.navbar.title}
            </span>
          </button>
        </section>
      </nav>

      <section className="w-full flex flex-col md:flex-row md:justify-around">
        {/* CTA */}
        <section className="flex flex-col justify-center items-center md:w-1/2 p-4 gap-12">
          <div className="relative flex flex-col justify-center items-center w-full p-6">
            {/* Borde amarillo */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[200px] md:w-[260px] h-[280px] md:h-[350px] border-8 border-yellow-500"></div>
            </div>

            {/* Contenedor de contenido */}
            <div className="relative flex flex-col items-center gap-6 w-full max-w-[350px] md:max-w-[450px] bg-white text-center p-6 shadow-lg">
              <h2 className="text-magentaButton font-semibold text-xl md:text-3xl pt-4">
                {languageData.home.cta.title}
              </h2>
              <p className="text-gray-600 text-sm md:text-lg">
                {languageData.home.cta.description}
              </p>
            </div>
          </div>

          {/* Botón */}
          <div className="flex justify-center items-center p-6">
            <button
              onClick={handleLoginClick}
              className="bg-magentaButton w-[150px] md:w-[195px] h-[50px] md:h-[63px] font-bold text-lg md:text-xl text-white rounded-lg hover:bg-magentaButtonDark transition duration-300 focus:outline-none focus:ring-2 focus:ring-magentaButtonDark"
            >
              {languageData.home.cta.button}
            </button>
          </div>
        </section>

        {/* Mockup */}
        <section className="w-full flex justify-center items-center md:my-0 md:w-1/2 p-4">
          <div className="flex justify-center items-center w-full">
            <img
              src={languageData.home.landing.image}
              alt="Mockup"
              className="w-full max-w-sm h-auto"
            />
          </div>
        </section>
      </section>

      {/* About */}
      <section className="flex flex-col items-center h-auto px-4 my-20">
        <h2 className="text-[#232233] font-semibold text-2xl mb-4 md:text-4xl">
          {languageData.home.about.title}
        </h2>
        <p className="font-normal text-base text-center text-[#6C6C72] pb-10 md:text-lg md:max-w-2xl">
          {languageData.home.about.description}
        </p>
        <div className="flex flex-col items-center justify-center gap-5 mt-10 w-full h-full md:flex-row md:gap-10">
          {languageData.home.about.cards.map((card, index) => (
            <CardAppKey key={index} title={card.title} message={card.message} />
          ))}
        </div>
      </section>

      {/* Functions */}
      <section className="bg-[url('/fondoLanding.webp')] bg-no-repeat bg-cover bg-center w-full h-auto flex flex-col items-center py-16">
        <h2 className="text-2xl text-white font-semibold pt-16 md:text-4xl">
          {languageData.home.functions.title}
        </h2>
        <p className="text-center text-white text-base px-9 pt-4 pb-8 md:text-lg md:max-w-2xl">
          {languageData.home.functions.description}
        </p>
        <div className="grid lg:grid-cols-3 gap-4 justify-items-center items-center">
          {languageData.home.functions.cards.map((card, index) => (
            <CardFunction
              key={index}
              imgSrc={card.imgSrc}
              title={card.title}
              message={card.message}
            />
          ))}
        </div>
      </section>
      {/* MockUp */}
      <div className="flex w-full justify-center items-center p-8">
        <img
          src={languageData.home.mockup.image}
          alt="mockup"
          className="w-full max-w-lg h-auto"
        />
      </div>

      {/* How It Works */}
      <section className="w-full h-auto flex flex-col items-center px-4 py-16 bg-magentaButton">
        <h2 className="font-semibold text-[25px] text-center text-white pt-[60px] md:text-4xl">
          {languageData.home.howItWorks.title}
        </h2>
        <p className="text-white text-center mt-10 md:text-lg md:max-w-2xl">
          {languageData.home.howItWorks.description}
        </p>
        <div className="w-full mt-10 p-4 max-w-xl h-auto">
          <img
            className="w-full h-full"
            src={languageData.home.howItWorks.video}
            alt="mockup"
          />
        </div>
      </section>

      {/* Who We Are */}
      <section className="w-full h-auto mt-[60px] flex flex-col items-center max-w-7xl px-4">
        <h2 className="font-semibold text-[25px] text-[#232233] text-center md:text-4xl">
          {languageData.home.whoWeAre.title}
        </h2>
        <p className="text-center text-[#6C6C72] w-[335px] mt-[18px] mx-4 md:text-lg md:max-w-2xl">
          {languageData.home.whoWeAre.description}
        </p>
        <div className="flex w-full flex-col flex-wrap max-w-lg items-center mt-[30px] mb-[60px] gap-10 text-center">
          {languageData.home.whoWeAre.cards.map((person, index) => (
            <CardPeople
              key={index}
              imagen={person.imagen}
              nombre={person.nombre}
              bio={person.bio}
              posicion={person.posicion}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="flex flex-col items-center justify-center w-full max-w-7xl px-4 md:px-8 py-10">
        <h2 className="font-semibold text-2xl text-[#232233] mt-10 mb-6 md:text-4xl text-center">
          {languageData.home.testimonials.title}
        </h2>
        <p className="text-base text-[#6C6C72] text-center w-full max-w-2xl mb-8 md:text-lg">
          {languageData.home.testimonials.description}
        </p>
        <div>
          <Carousel testimonials={languageData.home.testimonials} />
        </div>
      </section>

      {/* Footer */}
      <Footer footerData={languageData.home.footer} />
      {/* <ChatBot /> */}
    </main>
  );
}

export default Home;
