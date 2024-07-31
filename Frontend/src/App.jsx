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
import DoctorList from "./pages/Patient/DoctorInfoPage/DoctorList";
import DoctorDetail from "./pages/Patient/DoctorInfoPage/DoctorDetail";
import PatientProfile from "./pages/Patient/Profile/PatientProfile";
import ScheduleAppointment from "./pages/Patient/ScheduleAppointment/ScheduleAppointment";
import ConfirmAppointment from "./pages/Patient/ScheduleAppointment/ConfirmAppointment";
import ConfirmationSuccess from "./pages/Patient/ScheduleAppointment/ConfirmationSuccess";
import DetailSchedule from "./pages/Patient/Schedule/DetailSchedule";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

const protectedRoutes = [
  // Doctor Routes
  { path: "/doctor", element: <DoctorMain /> },
  { path: "/doctor/appointments", element: <DoctorAppointments /> },

  // Patient Routes
  { path: "/patient", element: <PatientMain /> },
  { path: "/patient/profile", element: <PatientProfile /> },
  { path: "/patient/treatment", element: <Treatment /> },
  { path: "/patient/schedule", element: <Schedule /> },
  { path: "/patient/postoperative", element: <Postoperative /> },
  { path: "/patient/support", element: <SupportComunity /> },
  { path: "/patient/medical-history", element: <HistoryMedical /> },
  { path: "/patient/emergency-contacts", element: <Emergency /> },
  { path: "/patient/doctor-information", element: <DoctorList /> },
  { path: "/patient/doctor-information/:id", element: <DoctorDetail /> },
  { path: "/patient/schedule/appointment/:id", element: <ScheduleAppointment /> },
  { path: "/patient/schedule/details/:id", element: <DetailSchedule /> },
  { path: "/patient/appointment/confirmation", element: <ConfirmAppointment /> },
  { path: "/patient/appointment/success", element: <ConfirmationSuccess /> }
];

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Protected Routes */}
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute element={element} />}
        />
      ))}
    </Routes>
  );
}

export default App;
