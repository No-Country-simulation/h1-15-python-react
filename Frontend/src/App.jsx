import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PatientMain from "./pages/Patient-main/Patient-main";
import DoctorMain from "./pages/Doctor-main/Doctor-main";
import DoctorAppointments from "./pages/Doctor-main/Doctor-appointments";
import Treatment from "./pages/Treatment/Treatment";
import Schedule from "./pages/Schedule/Schedule";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Doctor Routes */}
      <Route path="/doctor" element={<DoctorMain />} />
      <Route path="/doctor/appointments" element={<DoctorAppointments />} />

      {/* Patient Routes */}
      <Route path="/patient" element={<PatientMain />} />
      <Route path="/patient/treatment" element={<Treatment />} />
      <Route path="/patient/schedule" element={<Schedule />} />
    </Routes>
  );
}

export default App;
