import { IoNotifications } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Logout from "../Logout/Logout";
import { useState } from "react";
import UserInitials from "../UserInitials";

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
      <div className="flex items-center gap-4 relative">
        <UserInitials onClick={toggleShowLogout} /> {/* Añadir la función onClick si es necesario */}
        <div className="relative">
          <div
            className="cursor-pointer flex items-center"
            onClick={toggleShowLogout}
          >
            {showLogout ? (
              <FaAngleUp className="text-complementary-500 text-xl" />
            ) : (
              <FaAngleDown className="text-complementary-500 text-xl" />
            )}
          </div>
          {showLogout && (
            <div className="absolute top-full right-0 shadow-md mt-6">
              <Logout />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
