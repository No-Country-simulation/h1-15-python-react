/* eslint-disable react/prop-types */
const CardTitle = ({ titles, backgroundColor, textColor, onClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-4 px-6 font-extralight text-base h-full p-4 cursor-pointer uppercase tracking-widest"
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {titles.map((title, index) => (
        <h2
          key={index}
          className={`text-center mb-2 ${
            typeof title === "number" ? "text-6xl" : "text-base"
          }`}
        >
          {title}
        </h2>
      ))}
    </div>
  );
};

export default CardTitle;
