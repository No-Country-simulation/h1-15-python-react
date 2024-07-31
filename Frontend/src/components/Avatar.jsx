/* eslint-disable react/prop-types */

const Avatar = ({ imagen, className }) => {
  return (
    <div
      className={`${
        className ? className : "w-[220px] h-[220px] mt-[29px]"
      } relative flex items-center justify-center `}
    >
      <img src="/avatar-border.png" alt="borde" className="absolute" />
      <img
        className={`${
          className ? className : "w-[198px] h-[198px] rounded-full"
        }`}
        src={imagen ? imagen : "/Profile1.png"}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
