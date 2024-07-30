/* eslint-disable react/prop-types */
const CardAppKey = ({ title, message }) => {
  return (
    <div className="flex bg-white w-full shadow-[0px_1px_10px_0px_#00000010] rounded-[10px] px-[19px] p-5 gap-4">
      <div className="w-6">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_120_3404)">
            <path
              d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.659 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
              fill="#D22B8B"
            />
          </g>
          <defs>
            <clipPath id="clip0_120_3404">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div>
        <h4 className="font-josefin text-xl font-semibold text-[#232233]">
          {title}
        </h4>
        <p className="font-josefin text-base text-[#6C6C72]">{message}</p>
      </div>
    </div>
  );
};

export default CardAppKey;
