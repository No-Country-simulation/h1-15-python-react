import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PatientMain from "./pages/Patient-main/Patient-main";
import DoctorMain from "./pages/Doctor-main/Doctor-main";
import DoctorAppointments from "./pages/Doctor-main/Doctor-appointments";
import Treatment from "./pages/Treatment/Treatment";
import Schedule from "./pages/Schedule/Schedule";
import DoctorTransplants from "./pages/Doctor-main/Doctor-transplant";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/patient" element={<PatientMain />} />

      <Route path="/doctor" element={<DoctorMain />} />
      <Route path="/doctor/appointments" element={<DoctorAppointments />} />
      <Route path="/doctor/cross-transplant" element={<DoctorTransplants />} />

      <Route path="/treatment" element={<Treatment />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
}

export default App;
