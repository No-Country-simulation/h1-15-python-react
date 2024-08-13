import { useState, useEffect } from "react";
import { fetchUserData } from "../services/avatarName";

// eslint-disable-next-line react/prop-types
const UserInitials = ({ onClick }) => {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const { first_name, last_name } = await fetchUserData();
      const firstInitial = first_name.charAt(0).toUpperCase();
      const lastInitial = last_name.charAt(0).toUpperCase();
      setInitials(`${firstInitial}${lastInitial}`);
    };

    getUserData();
  }, []);

  return (
    <div
      className="w-[40px] h-[40px] rounded-full bg-magentaButton text-white flex items-center justify-center font-semibold cursor-pointer"
      onClick={onClick}
    >
      {initials || "NN"}
    </div>
  );
};

export default UserInitials;
