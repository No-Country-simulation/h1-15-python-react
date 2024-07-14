/* eslint-disable react/prop-types */

const CardFunction = ({ imgSrc, title, message }) => {
  return (
    <div className="flex flex-col items-center w-[299px] h-[171px] mb-10">
      <img src={`/icons/${imgSrc}`} alt="" />
      <h2 className="text-center text-white text-xl font-semibold pt-7 pb-4">
        {title}
      </h2>
      <p className="text-center text-white ">{message}</p>
    </div>
  );
};

export default CardFunction;
