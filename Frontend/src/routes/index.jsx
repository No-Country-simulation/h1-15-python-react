import { Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DoctorLayout from "../pages/Doctor/Doctor-layout";
import DoctorAppointments from "../pages/Doctor/Appointments/Doctor-appointments";
import DoctorMain from "../pages/Doctor/Doctor-main/Doctor-main";

export const publicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </>
);

export const doctorRoutes = (
  <Route path="/doctor" element={<ProtectedRoute element={<DoctorLayout />} />}>
    <Route index element={<DoctorMain />} />
    <Route path="appointments" element={<DoctorAppointments />} />
  </Route>
);
