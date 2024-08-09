/* eslint-disable react/prop-types */
import CardContacto from "./Cards/CardContacto";
import Icon from "./Icon/Icon";

const Footer = ({ footerData }) => {
  return (
    <div className="bg-[#232233] w-full py-8 px-4 flex flex-col items-center gap-6 mt-[140px]">
      <CardContacto />
      <img
        src="logo.svg"
        alt="Logo de la empresa"
        className="w-24 h-auto md:w-32 lg:w-40"
      />
      <p className="text-center text-white text-base md:text-lg lg:text-xl">
        {footerData.slogan}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {/* Redes Sociales */}
        {Object.entries(footerData.socialMedia).map(([key, { url }], index) => (
          <div className="flex items-center" key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ir a ${key}`}
              className="flex items-center"
            >
              <Icon name={key} />
            </a>
            {index < Object.entries(footerData.socialMedia).length - 1 && (
              <span className="mx-2 border-r border-gray-500 h-6"></span>
            )}
          </div>
        ))}
      </div>

      {/* Enlaces */}
      <div className="flex flex-col items-center text-white pt-8 gap-4">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
          {footerData.links[0].title}
        </h3>
        <ul className="flex flex-col gap-3 items-center">
          {footerData.links.slice(1).map((link, index) => (
            <li key={index} className="text-sm md:text-base">
              <a href={link.url} className="hover:underline">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div className="text-white mt-8 w-full max-w-md mx-auto">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
          {footerData.newsletter.title}
        </h3>
        <p className="text-white text-sm md:text-base pb-4">
          {footerData.newsletter.heading}
        </p>
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          <input
            className="w-full h-[50px] pl-4 pr-[70px] py-3 rounded text-black outline-none"
            placeholder={footerData.newsletter.placeholder}
            type="email"
            required
          />
          <button
            type="submit"
            className="absolute right-0 top-0 w-[48px] h-[46px] bg-magentaButton grid items-center justify-center rounded"
            aria-label="Enviar suscripción"
            style={{ margin: "2px" }} 
          >
            <Icon name="send" />
          </button>
        </form>

        <div className="border-t-2 border-white w-full mt-8"></div>

        <div className="flex justify-center items-center w-full mx-auto my-4 text-sm font-light gap-1">
          &copy;
          <p>{footerData.Copyright.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
