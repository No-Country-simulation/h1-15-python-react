import { Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DoctorLayout from "../pages/Doctor/Doctor-layout";
import DoctorAppointments from "../pages/Doctor/Appointments/Doctor-appointments";
import DoctorMain from "../pages/Doctor/Doctor-main/Doctor-main";
import PatientMain from "../pages/Patient/Patient-main/Patient-main";
import PatientProfile from "../pages/Patient/Profile/PatientProfile";
import Treatment from "../pages/Patient/Treatment/Treatment";
import Schedule from "../pages/Patient/Schedule/Schedule";
import Postoperative from "../pages/Patient/Postoperative/Postoperative";
import SupportComunity from "../pages/Patient/SupportComunity/SupportComunity";
import HistoryMedical from "../pages/Patient/HistoryMedical/HistoryMedical";
import Emergency from "../pages/Patient/Emergency/Emergency";
import DoctorList from "../pages/Patient/DoctorInfoPage/DoctorList";
import DoctorDetail from "../pages/Patient/DoctorInfoPage/DoctorDetail";
import ScheduleAppointment from "../pages/Patient/ScheduleAppointment/ScheduleAppointment";
import ConfirmAppointment from "../pages/Patient/ScheduleAppointment/ConfirmAppointment";
import ConfirmationSuccess from "../pages/Patient/ScheduleAppointment/ConfirmationSuccess";
import DoctorTransplants from "../pages/Doctor/Transplants/Doctor-transplant";

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
    <Route path="transplants" element={<DoctorTransplants />} />
  </Route>
);
export const patientRoutes = (
  <>
    <Route
      path="/patient"
      element={<ProtectedRoute element={<PatientMain />} />}
    />
    <Route
      path="/patient/profile"
      element={<ProtectedRoute element={<PatientProfile />} />}
    />
    <Route
      path="/patient/treatment"
      element={<ProtectedRoute element={<Treatment />} />}
    />
    <Route
      path="/patient/schedule"
      element={<ProtectedRoute element={<Schedule />} />}
    />
    <Route
      path="/patient/postoperative"
      element={<ProtectedRoute element={<Postoperative />} />}
    />
    <Route
      path="/patient/support"
      element={<ProtectedRoute element={<SupportComunity />} />}
    />
    <Route
      path="/patient/medical-history"
      element={<ProtectedRoute element={<HistoryMedical />} />}
    />
    <Route
      path="/patient/emergency-contacts"
      element={<ProtectedRoute element={<Emergency />} />}
    />
    <Route
      path="/patient/doctor-information"
      element={<ProtectedRoute element={<DoctorList />} />}
    />
    <Route
      path="/patient/doctor-information/:id"
      element={<ProtectedRoute element={<DoctorDetail />} />}
    />
    <Route
      path="/schedule-appointment/:id"
      element={<ProtectedRoute element={<ScheduleAppointment />} />}
    />
    <Route
      path="/patient/confirmation-appointment"
      element={<ProtectedRoute element={<ConfirmAppointment />} />}
    />
    <Route
      path="/patient/success-appointment"
      element={<ProtectedRoute element={<ConfirmationSuccess />} />}
    />
  </>
);
