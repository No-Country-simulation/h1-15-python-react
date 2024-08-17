import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { patientRoutes } from "./routes/PatientRoutes";
import { publicRoutes } from "./routes/PublicRoutes";
import { doctorRoutes } from "./routes/DoctorRoutes";
import NotFound from "./components/PageNotFound/NotFound";

function App() {
  const darkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen dark:bg-[#212121] text-black dark:text-white font-Montserrat">
      <Routes>
        {/* Public Routes */}
        {publicRoutes}

        {/* Doctor Routes */}
        {doctorRoutes}

        {/* Patient Routes */}
        {patientRoutes}

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
