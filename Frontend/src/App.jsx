import { Routes, Route } from "react-router-dom";
import { patientRoutes } from "./routes/PatientRoutes";
import { publicRoutes } from "./routes/PublicRoutes";
import { doctorRoutes } from "./routes/DoctorRoutes";
import NotFound from "./components/PageNotFound/NotFound";

function App() {
  return (
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
  );
}

export default App;
