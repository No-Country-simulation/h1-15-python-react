import { Route } from "react-router-dom";
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
import DetailSchedule from "../pages/Patient/Schedule/DetailSchedule";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

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
      path="patient/schedule/appointment/:id"
      element={<ProtectedRoute element={<ScheduleAppointment />} />}
    />
    <Route
      path="/patient/appointment/confirmation"
      element={<ProtectedRoute element={<ConfirmAppointment />} />}
    />
    <Route
      path="/patient/appointment/success"
      element={<ProtectedRoute element={<ConfirmationSuccess />} />}
    />
    <Route
      path="/patient/schedule/details/:id"
      element={<ProtectedRoute element={<DetailSchedule />} />}
    />
  </>
);
