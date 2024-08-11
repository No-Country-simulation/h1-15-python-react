import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DoctorLayout from "../pages/Doctor/Doctor-layout";
import DoctorAppointments from "../pages/Doctor/Appointments/Doctor-appointments";
import DoctorMain from "../pages/Doctor/Doctor-main/Doctor-main";
import DoctorPatients from "../pages/Doctor/Patients/Doctor-patients";
import DoctorTransplants from "../pages/Doctor/Transplants/Doctor-transplant";
import PageConstruction from "../components/PageConstruction/PageConstruction";
import DoctorTreatments from "../pages/Doctor/Treatments/Doctor-treatments";
import UpdatePassword from "../pages/UpdatePassword/UpdatePassword";
import DoctorConsultant from "../pages/Doctor/Consultant/Doctor-consultant";

export const doctorRoutes = (
  <>
    <Route
      path="/doctor"
      element={
        <ProtectedRoute element={<DoctorLayout />} allowedRoles={["doctor"]} />
      }
    >
      <Route index element={<DoctorMain />} />
      <Route path="appointments" element={<DoctorAppointments />} />
      <Route path="patients" element={<DoctorPatients />} />
      <Route path="transplants" element={<DoctorTransplants />} />
      <Route path="messages" element={<PageConstruction />} />
      <Route path="treatments" element={<DoctorTreatments />} />
      <Route path="consultant/:id" element={<DoctorConsultant />} />
    </Route>
    <Route
      path="doctor/update-password"
      element={
        <ProtectedRoute
          element={<UpdatePassword />}
          allowedRoles={["doctor"]}
        />
      }
    />
  </>
);
