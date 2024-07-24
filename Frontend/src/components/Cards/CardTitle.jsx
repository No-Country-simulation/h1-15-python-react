/* eslint-disable react/prop-types */
const CardTitle = ({ titles = [], backgroundColor = '#000', textColor = '#FFF' }) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-4 px-6 font-inter text-base font-semibold h-full"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      {titles.map((title, index) => (
        <div key={index} className="text-center mb-2">
          {title}
        </div>
      ))}
    </div>
  );
};

export default CardTitle;
