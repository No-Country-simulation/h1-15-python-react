/* eslint-disable react/prop-types */
const AboutJustina = ({ title, subtitle, description, image, link }) => {
  return (
    <div className="w-full bg-white max-h-[440px] flex flex-col items-center rounded-lg px-4 py-6">
      <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={image}
            alt={title}
            className="w-full h-full md:h-auto max-h-[170px] object-cover object-center rounded-t-lg"
          />
      </a>
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-lg sm:text-lg lg:text-xl font-semibold text-center uppercase">
          {title}
        </h2>
        <h3 className="text-base sm:text-lg md:text-lg text-gray-600 text-center mb-2">
          {subtitle}
        </h3>
        <p className="text-center text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutJustina;
