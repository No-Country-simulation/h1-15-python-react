import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguageData } from "../redux/slice/langSlice";
import data_en from "../languages/data_en.json";
import data_es from "../languages/data_es.json";
import data_pt from "../languages/data_pt.json"; 

const useLanguage = () => {
  const dispatch = useDispatch();
  const languageData = useSelector((state) => state.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "es"; 

    if (!languageData) {
      let data;

      switch (savedLanguage) {
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
      }
    }
  }, [languageData, dispatch]);

  return languageData;
};

export default useLanguage;
