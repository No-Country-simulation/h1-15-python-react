import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguageData } from "../../redux/slice/langSlice";
import data_en from "../data_en.json";
import data_es from "../data_es.json";
import data_pt from "../data_pt.json";
import Icon from "../../components/Icon/Icon";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "es",
  );
  const languages = [
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
    { value: "pt", label: "Português" },
  ];

  const handleSelect = (language) => {
    let data;
    switch (language) {
      case "en":
        data = data_en;
        break;
      case "pt":
        data = data_pt;
        break;
      default:
        data = data_es;
    }

    if (data) {
      dispatch(setLanguageData(data));
      localStorage.setItem("selectedLanguage", language);
      setSelectedLanguage(language);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center bg-inherit text-sm md:text-base">
      <Icon name="IoLanguageSharp" />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0006] dark:bg-[#fff3] text-white rounded-md px-4 py-1 focus:outline-none flex items-center space-x-2 h-9 ml-2 md:h-12 md:px-6"
      >
        <span>
          {languages.find((lang) => lang.value === selectedLanguage)?.label}
        </span>
      </button>
      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10 shadow-lg">
          {languages.map((lang) => (
            <li
              key={lang.value}
              onClick={() => handleSelect(lang.value)}
              className="px-4 py-2 cursor-pointer hover:bg-Justina_3 hover:text-inherit dark:text-gray-900"
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
