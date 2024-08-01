import { Routes } from "react-router-dom";
import { doctorRoutes, publicRoutes } from "./routes";
import { patientRoutes } from "./routes/PatientRoutes";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes}

      {/* Doctor Routes */}
      {doctorRoutes}

      {/* Patient Routes */}
      {patientRoutes}
    </Routes>
  );
}

export default App;
