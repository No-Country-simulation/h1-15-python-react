import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLanguageData } from '../redux/slice/langSlice';
import languageData from '../languages/data_es.json'; 

export const useDataApi = () => {
  const storedLanguageData = useSelector((state) => state.language);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!storedLanguageData) {
      dispatch(setLanguageData(languageData));
    }
  }, [storedLanguageData, dispatch]);

  return storedLanguageData;
};
