import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PatientMain from "./pages/Patient-main/Patient-main";
import DoctorMain from "./pages/Doctor-main/Doctor-main";
import DoctorAppointments from "./pages/Doctor-main/Doctor-appointments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/patient" element={<PatientMain />} />
      <Route path="/doctor" element={<DoctorMain />} />
      <Route path="/doctor/appointments" element={<DoctorAppointments />} />
    </Routes>
  );
}

export default App;
