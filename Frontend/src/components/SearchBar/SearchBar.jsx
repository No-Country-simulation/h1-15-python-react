import { useState, useEffect } from "react";
import Icon from "../Icon/Icon";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ onFocus, onBlur }) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = () => {
    if (isInputVisible && searchValue.trim() !== "") {
      handleSearchSubmit();
    } else {
      setInputVisible(!isInputVisible);
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim() !== "") {
      setSearchValue("");
      setInputVisible(false);
    }
  };

  useEffect(() => {
    if (onFocus && isInputVisible) {
      onFocus();
    } else if (onBlur && !isInputVisible) {
      onBlur();
    }
  }, [isInputVisible, onFocus, onBlur]);

  return (
    <div
      className={`flex items-center space-x-2 ${
        isInputVisible ? "w-full" : ""
      }`}
    >
      {isInputVisible && (
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          placeholder="Empezar a buscar..."
        />
      )}
      <button onClick={handleSearchClick} className="p-2">
        <Icon name="search" />
      </button>
    </div>
  );
};

export default SearchBar;
