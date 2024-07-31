import { useNavigate } from "react-router-dom";
import CardAppKey from "../../components/Cards/CardAppKeys";
import CardFunction from "../../components/Cards/CardFunction";
import CardPeople from "../../components/Cards/CardPeople";
import Footer from "../../components/Footer";
import Carousel from "../../components/Slider/Slider";
import content from "../../data/dataHome.json";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <main className="flex flex-col items-center w-full max-w-screen-2xl mx-auto bg-gradient-background_1">
      <nav className="flex pt-8 pb-16 px-6 md:px-[.875rem] items-center justify-between w-full">
        <div className="w-[7.5rem] h-[3.75rem] rounded-md ml-2">
          <img src="/justinaLogo.png" alt="logo" />
        </div>
        <button
          onClick={handleLoginClick}
          className="bg-magentaButton w-[6.5rem] h-[2.125rem] font-josefin font-bold text-sm text-white rounded-[.625rem] hover:bg-magentaButtonDark transition duration-300"
        >
          Iniciar sesión
        </button>
      </nav>

      <section className="w-full flex flex-col md:flex-row flex-grow">
        {/* CTA */}

        <section className="flex flex-col justify-start items-center md:w-1/2 p-4">
          <div className="relative flex flex-col justify-center items-center w-full p-6">
            <div className="absolute inset-0 transform translate-x-[80px] md:translate-x-[8rem] md:translate-y-[-0.125rem] w-[15.625rem] md:w-[28.125rem] h-full border-8 border-Justina_7"></div>
            <div className="relative flex flex-col items-center gap-6 w-[15.625rem] md:w-[28.125rem] bg-white text-center p-6 shadow-lg">
              <h2 className="font-josefin text-magentaButton font-semibold text-xl md:text-3xl pt-4">
                {content.cta.title}
              </h2>
              <p className="font-josefin text-gray-600 text-sm md:text-lg">
                {content.cta.description}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center p-6">
            <button className="bg-magentaButton w-[9.375rem] md:w-[12.1875rem] h-[3.125rem] md:h-[3.9375rem] font-josefin font-bold text-lg md:text-xl text-white rounded-lg hover:bg-magentaButtonDark transition duration-300 focus:outline-none focus:ring-2 focus:ring-magentaButtonDark">
              {content.cta.button}
            </button>
          </div>
        </section>

        {/* Mockup */}
        <section className="w-full flex justify-center items-center my-8 md:my-0 md:w-1/2 p-4">
          <div className="flex justify-center items-center w-full">
            <img
              src="/landing1.webp"
              alt="logo"
              className="w-full md:w-[70%] h-auto"
            />
          </div>
        </section>
      </section>

      {/* About */}
      <section className="flex flex-col items-center h-auto px-4 my-20">
        <h2 className="text-[#232233] font-josefin font-semibold text-2xl mb-4 md:text-4xl">
          {content.about.title}
        </h2>
        <p className="font-josefin font-normal text-base text-center text-[#6C6C72] pb-10 md:text-lg md:max-w-2xl">
          {content.about.description}
        </p>
        <div className="flex flex-col items-center justify-center gap-5 mt-10 w-full h-full md:flex-row md:gap-10">
          {content.about.cards.map((card, index) => (
            <CardAppKey key={index} title={card.title} message={card.message} />
          ))}
        </div>
      </section>

      {/* Functions */}
      <section className="bg-[url('/fondoLanding.png')] w-full h-auto flex flex-col items-center py-16">
        <h2 className="font-josefin text-2xl text-white font-semibold pt-16 md:text-4xl">
          {content.functions.title}
        </h2>
        <p className="text-center font-josefin text-white text-base px-9 pt-4 pb-8 md:text-lg md:max-w-2xl">
          {content.functions.description}
        </p>
        <div className="grid md:grid-cols-3 gap-6 justify-items-center items-center">
          {content.functions.cards.map((card, index) => (
            <CardFunction
              key={index}
              imgSrc={card.imgSrc}
              title={card.title}
              message={card.message}
            />
          ))}
        </div>
      </section>
      <div className="bg-[url('/fondoLanding.png')] flex w-full justify-center items-center">
        <svg
          width="354"
          height="668"
          viewBox="0 0 354 668"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_120_3440)">
            <rect
              x="60"
              y="60"
              width="214"
              height="468"
              rx="40"
              fill="url(#paint0_linear_120_3440)"
            />
            <path
              d="M123.453 299V283.92H123.473L131.313 295.02L130.313 294.8L138.113 283.92H138.153V299H135.833V289.18L135.993 290.38L130.733 297.82H130.693L125.313 290.38L125.713 289.28V299H123.453ZM141.245 291.74C141.245 290.727 141.438 289.773 141.825 288.88C142.211 287.987 142.745 287.193 143.425 286.5C144.105 285.807 144.891 285.267 145.785 284.88C146.691 284.48 147.658 284.28 148.685 284.28C149.698 284.28 150.651 284.48 151.545 284.88C152.451 285.267 153.245 285.807 153.925 286.5C154.618 287.193 155.158 287.987 155.545 288.88C155.945 289.773 156.145 290.727 156.145 291.74C156.145 292.767 155.945 293.727 155.545 294.62C155.158 295.513 154.618 296.307 153.925 297C153.245 297.68 152.451 298.213 151.545 298.6C150.651 298.973 149.698 299.16 148.685 299.16C147.645 299.16 146.678 298.973 145.785 298.6C144.891 298.213 144.105 297.687 143.425 297.02C142.745 296.34 142.211 295.553 141.825 294.66C141.438 293.753 141.245 292.78 141.245 291.74ZM143.645 291.74C143.645 292.46 143.771 293.133 144.025 293.76C144.291 294.387 144.658 294.94 145.125 295.42C145.591 295.887 146.131 296.253 146.745 296.52C147.358 296.787 148.025 296.92 148.745 296.92C149.438 296.92 150.085 296.787 150.685 296.52C151.298 296.253 151.831 295.887 152.285 295.42C152.738 294.94 153.091 294.387 153.345 293.76C153.611 293.133 153.745 292.46 153.745 291.74C153.745 291.007 153.611 290.327 153.345 289.7C153.078 289.073 152.718 288.52 152.265 288.04C151.811 287.56 151.278 287.187 150.665 286.92C150.051 286.653 149.391 286.52 148.685 286.52C147.978 286.52 147.318 286.653 146.705 286.92C146.091 287.187 145.551 287.56 145.085 288.04C144.631 288.52 144.278 289.08 144.025 289.72C143.771 290.347 143.645 291.02 143.645 291.74ZM170.054 297.86C169.854 298.007 169.541 298.187 169.114 298.4C168.687 298.613 168.181 298.8 167.594 298.96C167.021 299.107 166.381 299.173 165.674 299.16C164.541 299.147 163.521 298.947 162.614 298.56C161.707 298.16 160.941 297.627 160.314 296.96C159.687 296.28 159.201 295.507 158.854 294.64C158.521 293.76 158.354 292.827 158.354 291.84C158.354 290.733 158.527 289.72 158.874 288.8C159.221 287.88 159.714 287.087 160.354 286.42C160.994 285.74 161.754 285.213 162.634 284.84C163.514 284.467 164.474 284.28 165.514 284.28C166.434 284.28 167.254 284.407 167.974 284.66C168.707 284.9 169.321 285.173 169.814 285.48L168.894 287.68C168.521 287.413 168.054 287.153 167.494 286.9C166.934 286.647 166.301 286.52 165.594 286.52C164.954 286.52 164.341 286.653 163.754 286.92C163.167 287.173 162.654 287.54 162.214 288.02C161.774 288.487 161.421 289.033 161.154 289.66C160.901 290.287 160.774 290.967 160.774 291.7C160.774 292.46 160.887 293.16 161.114 293.8C161.354 294.427 161.687 294.973 162.114 295.44C162.554 295.907 163.074 296.273 163.674 296.54C164.287 296.793 164.967 296.92 165.714 296.92C166.474 296.92 167.134 296.807 167.694 296.58C168.267 296.34 168.727 296.073 169.074 295.78L170.054 297.86ZM175.52 290.02L175.46 290.76L175.78 290.3L181.24 284.44H184.26L178.24 290.8L184.48 299H181.52L176.54 292.28L175.52 293.28V299H173.16V284.44H175.52V290.02ZM189.049 293.76C189.049 294.333 189.196 294.86 189.489 295.34C189.796 295.807 190.196 296.187 190.689 296.48C191.183 296.76 191.736 296.9 192.349 296.9C192.989 296.9 193.563 296.76 194.069 296.48C194.576 296.187 194.976 295.807 195.269 295.34C195.563 294.86 195.709 294.333 195.709 293.76V284.44H198.009V293.82C198.009 294.873 197.756 295.807 197.249 296.62C196.743 297.42 196.063 298.047 195.209 298.5C194.356 298.94 193.403 299.16 192.349 299.16C191.309 299.16 190.363 298.94 189.509 298.5C188.656 298.047 187.976 297.42 187.469 296.62C186.976 295.807 186.729 294.873 186.729 293.82V284.44H189.049V293.76ZM205.893 284.44C207 284.44 207.947 284.627 208.733 285C209.52 285.373 210.12 285.907 210.533 286.6C210.96 287.293 211.173 288.133 211.173 289.12C211.173 289.693 211.08 290.267 210.893 290.84C210.72 291.413 210.44 291.933 210.053 292.4C209.68 292.867 209.173 293.247 208.533 293.54C207.907 293.82 207.133 293.96 206.213 293.96H204.113V299H201.773V284.44H205.893ZM206.213 291.7C206.72 291.7 207.147 291.613 207.493 291.44C207.84 291.267 208.107 291.047 208.293 290.78C208.493 290.513 208.633 290.24 208.713 289.96C208.807 289.667 208.853 289.407 208.853 289.18C208.853 288.94 208.813 288.68 208.733 288.4C208.653 288.107 208.52 287.833 208.333 287.58C208.147 287.313 207.887 287.1 207.553 286.94C207.22 286.767 206.793 286.68 206.273 286.68H204.113V291.7H206.213Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_120_3440"
              x="0"
              y="0"
              width="414"
              height="668"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="40" dy="40" />
              <feGaussianBlur stdDeviation="50" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0941177 0 0 0 0 0.188235 0 0 0 0 0.247059 0 0 0 0.5 0"
              />
              <feBlend
                mode="multiply"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_120_3440"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_120_3440"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_120_3440"
              x1="167"
              y1="60"
              x2="167"
              y2="528"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D22B8B" />
              <stop offset="1" stopColor="#FBC046" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* How It Works */}
      <section className="w-full h-auto flex flex-col items-center py-16 bg-[#D22B8B]">
        <h2 className="font-josefin font-semibold text-[1.5625rem] text-center text-white pt-[3.75rem] md:text-4xl">
          {content.howItWorks.title}
        </h2>
        <p className="text-white font-josefin text-center mt-10 md:text-lg md:max-w-2xl">
          {content.howItWorks.description}
        </p>
        <div className="w-full mt-10 p-4 md:w-[37.5rem] md:h-[18.75rem]">
          <img
            className="w-full h-full"
            src={content.howItWorks.video}
            alt="video"
          />
        </div>
      </section>

      {/* Who We Are */}
      <section className="w-full h-auto font-josefin mt-[3.75rem] flex flex-col items-center max-w-7xl px-4">
        <h2 className="font-semibold text-[1.5625rem] text-[#232233] text-center md:text-4xl">
          {content.whoWeAre.title}
        </h2>
        <p className="text-center text-[#6C6C72] w-[20.9375rem] mt-[1.125rem] mx-4 md:text-lg md:max-w-2xl">
          {content.whoWeAre.description}
        </p>
        <div className="flex w-full flex-col md:flex-row items-center mt-[1.875rem] mb-[3.75rem] gap-10 text-center">
          {content.whoWeAre.cards.map((person, index) => (
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
        <h2 className="font-josefin font-semibold text-2xl text-[#232233] mt-10 mb-6 md:text-4xl text-center">
          {content.testimonials.title}
        </h2>
        <p className="font-josefin text-base text-[#6C6C72] text-center w-full max-w-2xl mb-8 md:text-lg">
          {content.testimonials.description}
        </p>
        <div>
          <Carousel testimonials={content.testimonials} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Home;
