import Logout from "../Logout/Logout";
import { useState } from "react";
import UserInitials from "../UserInitials";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";

export default function DoctorHeader() {
  const [showLogout, setShowLogout] = useState(false);

  const toggleShowLogout = () => {
    setShowLogout((prev) => !prev);
  };

  return (
    <div className="flex gap-10 justify-end w-full items-center">
      <div className="bg-complementary-50 rounded-full p-2 cursor-pointer">
        <Icon name="IoNotifications" />
      </div>
      <div className="flex items-center gap-4 relative">
        <UserInitials onClick={toggleShowLogout} />{" "}
        <div className="relative">
          <div
            className="cursor-pointer flex items-center"
            onClick={toggleShowLogout}
          >
            {showLogout ? (
              <Icon name="FaChevronUpIcon" />
            ) : (
              <Icon name="FaChevronDownIcon" />
            )}
          </div>
          {showLogout && (
            <div
              className="flex flex-col gap-3 absolute top-full right-0 shadow-md mt-6 bg-slate-50 border p-5 z-20"
              onMouseLeave={() => setShowLogout(false)}
            >
              <Link
                to={"profile"}
                className="hover:cursor-pointer bg-slate-200 p-2 text-sm rounded-md text-center"
              >
                Mi perfil
              </Link>
              <Logout />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
