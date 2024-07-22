/* eslint-disable react/prop-types */

const Avatar = ({ imagen, className }) => {
  return (
    <div
      className={`${
        className ? className : "w-[220px] h-[220px]"
      } relative flex items-center justify-center mt-[29px]`}
    >
      <img src="/avatar-border.png" alt="borde" className="absolute" />
      <img
        className={`${
          className ? className : "w-[198px] h-[198px] rounded-full"
        }`}
        src={`/${imagen}`}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
