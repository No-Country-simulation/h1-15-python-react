import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DoctorLayout from "../pages/Doctor/Doctor-layout";
import DoctorAppointments from "../pages/Doctor/Appointments/Doctor-appointments";
import DoctorMain from "../pages/Doctor/Doctor-main/Doctor-main";

export const doctorRoutes = (
  <Route
    path="/doctor"
    element={<ProtectedRoute element={<DoctorLayout />} allowedRoles={["doctor"]} />}
  >
    <Route index element={<DoctorMain />} />
    <Route path="appointments" element={<DoctorAppointments />} />
  </Route>
);
