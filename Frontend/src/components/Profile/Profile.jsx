import { useState } from "react";
import Icon from "../Icon/Icon";
import SearchBar from "../SearchBar/SearchBar";
import UserInitials from "../UserInitials";

// eslint-disable-next-line react/prop-types
const Profile = ({ icon_name, greeting }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchFocus = () => setIsSearchOpen(true);
  const handleSearchBlur = () => setIsSearchOpen(false);

  const firstName = localStorage.getItem("firstName") || "Paciente";

  return (
    <div className="m-2">
      <div className="flex items-center mt-1 justify-between">
        <SearchBar onFocus={handleSearchFocus} onBlur={handleSearchBlur} />
        <div className="flex-grow" />
        {!isSearchOpen && (
          <>
            <Icon name={icon_name} />
            <div className="flex-grow" />
            <UserInitials />
          </>
        )}
      </div>
      <h1 className="font-semibold text-lg md:text-3xl mt-2 text-center text-[#A0A4A8]">
        {greeting}
        <span className="ml-1 md:ml-2 font-medium text-lg md:text-3xl text-[#25282B] ">
          {firstName}
        </span>
      </h1>
    </div>
  );
};

export default Profile;
