import { IoNotifications } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import Logout from "../Logout/Logout";
import { useState } from "react";

export default function DoctorHeader() {
  const [showLogout, setShowLogout] = useState(false);
  const toggleShowLogout = () => {
    setShowLogout((prev) => !prev);
  };
  return (
    <div className="flex gap-10 justify-end w-full items-center">
      <div className="bg-complementary-50 rounded-full p-2 cursor-pointer">
        <IoNotifications className="text-complementary-500 text-2xl" />
      </div>
      <div className="flex items-center gap-3 relative">
        <img src="/ProfileImageSlide.png" className="w-10 aspect-square" />
        <div>
          <p>Ashley Lars</p>
          <p className="text-slate-500 text-sm">Medico clínico</p>
        </div>
        <FaAngleDown className="cursor-pointer" onClick={toggleShowLogout} />
        {showLogout && (
          <div className="absolute top-full right-0">
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
}
