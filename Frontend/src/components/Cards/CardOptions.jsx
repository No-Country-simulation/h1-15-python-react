import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";

/* eslint-disable react/prop-types */
const CardOptions = ({ icon, title, color, link }) => {
  return (
    <Link
      to={link}
      className="flex flex-col items-center gap-2 rounded-lg max-w-full p-6"
      style={{
        backgroundColor: color,
        textDecoration: "none",
      }}
    >
      <div className="w-16 h-16 rounded-lg bg-white flex justify-center items-center">
        <Icon name={icon} className="w-8 h-8" />
      </div>
      <div className="flex items-center">
        <p className="text-center text-white text-sm md:text-xl leading-5 tracking-widest">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default CardOptions;
