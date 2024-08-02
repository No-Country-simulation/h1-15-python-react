import { useState } from "react";
import Icon from "../Icon/Icon";
import SearchBar from "../SearchBar/SearchBar";

// eslint-disable-next-line react/prop-types
const Profile = ({ icon_name, greeting, photo, patientName }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchFocus = () => setIsSearchOpen(true);
  const handleSearchBlur = () => setIsSearchOpen(false);

  return (
    <div className="m-2">
      <div className="flex items-center mt-1 justify-between">
        <SearchBar onFocus={handleSearchFocus} onBlur={handleSearchBlur} />
        <div className="flex-grow" />
        {!isSearchOpen && (
          <>
            <Icon name={icon_name} />
            <div className="flex-grow" />
            <img className="w-10 h-10 rounded-full" src={photo} alt="Profile" />
          </>
        )}
      </div>
      <h1 className="font-semibold text-lg md:text-3xl mt-2 text-center text-[#A0A4A8]">
        {greeting}
        <span className="ml-1 md:ml-2 font-medium text-lg md:text-3xl text-black ">
          {patientName}
        </span>
      </h1>
    </div>
  );
};

export default Profile;
