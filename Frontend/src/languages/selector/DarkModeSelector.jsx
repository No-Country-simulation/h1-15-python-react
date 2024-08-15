import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/slice/darkModeSlice";

const DarkModeSelector = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  return (
    <div className="relative flex items-center text-sm">
      <div className="flex items-center ml-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={darkMode}
            onChange={handleToggle}
          />
          <div
            className={`relative w-14 h-8 rounded-full transition-colors ${
              darkMode ? "bg-Justina_1" : "bg-Justina_6"
            }`}
          >
            <div
              className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                darkMode ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default DarkModeSelector;
