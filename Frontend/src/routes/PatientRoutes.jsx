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
import UpdatePassword from "../pages/UpdatePassword/UpdatePassword";

const routes = [
  { path: "/patient", element: <PatientMain /> },
  { path: "/patient/update-password", element: <UpdatePassword /> },
  { path: "/patient/profile", element: <PatientProfile /> },
  { path: "/patient/treatment", element: <Treatment /> },
  { path: "/patient/schedule", element: <Schedule /> },
  { path: "/patient/postoperative", element: <Postoperative /> },
  { path: "/patient/support", element: <SupportComunity /> },
  { path: "/patient/medical-history", element: <HistoryMedical /> },
  { path: "/patient/emergency-contacts", element: <Emergency /> },
  { path: "/patient/doctor-information", element: <DoctorList /> },
  { path: "/patient/doctor-information/:id", element: <DoctorDetail /> },
  { path: "patient/schedule/appointment/:id", element: <ScheduleAppointment /> },
  { path: "/patient/appointment/confirmation", element: <ConfirmAppointment /> },
  { path: "/patient/appointment/success", element: <ConfirmationSuccess /> },
  { path: "/patient/schedule/details/:id", element: <DetailSchedule /> },
];

export const patientRoutes = (
  <>
    {routes.map(({ path, element }) => (
      <Route
        key={path}
        path={path}
        element={<ProtectedRoute element={element} allowedRoles={["patient"]} />}
      />
    ))}
  </>
);
