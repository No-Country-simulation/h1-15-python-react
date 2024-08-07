/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { fetchUserData } from "../services/avatarName";

const UserInitials = ({ onClick }) => {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { first_name, last_name } = await fetchUserData();
        const firstInitial = first_name.charAt(0).toUpperCase();
        const lastInitial = last_name.charAt(0).toUpperCase();
        setInitials(`${firstInitial}${lastInitial}`);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <div
      className="w-[40px] h-[40px] rounded-full bg-magentaButton text-white flex items-center justify-center cursor-pointer font-semibold"
      onClick={onClick}
    >
      {initials}
    </div>
  );
};

export default UserInitials;
