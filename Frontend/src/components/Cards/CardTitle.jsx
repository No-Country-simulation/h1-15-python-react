/* eslint-disable react/prop-types */
const CardTitle = ({ titles, backgroundColor, textColor, onClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-4 px-6 font-inter text-base font-semibold h-full p-4 cursor-pointer"
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {titles.map((title, index) => (
        <h2 key={index} className="text-center mb-2">
          {title}
        </h2>
      ))}
    </div>
  );
};

export default CardTitle;
