import { Routes, Route } from "react-router-dom";
import { doctorRoutes, publicRoutes } from "./routes";
import { patientRoutes } from "./routes/PatientRoutes";
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
