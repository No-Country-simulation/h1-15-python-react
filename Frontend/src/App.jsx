import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import DoctorMain from "./pages/Doctor-main/Doctor-main";
import DoctorAppointments from "./pages/Doctor-main/Doctor-appointments";
import PatientMain from "./pages/Patient/Patient-main/Patient-main";
import Treatment from "./pages/Patient/Treatment/Treatment";
import Schedule from "./pages/Patient/Schedule/Schedule";
import Postoperative from "./pages/Patient/Postoperative/Postoperative";
import SupportComunity from "./pages/Patient/SupportComunity/SupportComunity";
import HistoryMedical from "./pages/Patient/HistoryMedical/HistoryMedical";
import Emergency from "./pages/Patient/Emergency/Emergency";

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
      <Route path="/patient/postoperative" element={<Postoperative />} />
      <Route path="/patient/support" element={<SupportComunity />} />
      <Route path="/patient/medical-history" element={<HistoryMedical />} />
      <Route path="/patient/emergency-contacts" element={<Emergency />} />
    </Routes>
  );
}

export default App;
