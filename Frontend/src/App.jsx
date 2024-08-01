import { Routes } from "react-router-dom";
import { doctorRoutes, patientRoutes, publicRoutes } from "./routes";

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
