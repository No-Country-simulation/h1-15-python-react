/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import FooterNav from "../../../components/FooterNav/FooterNav";
import showDialog from "../../../utils/showDialog";
import { getPatientProfile } from "../../../services/patientService";
import { getDoctorSchedule } from "../../../services/doctorService";
import DateSelector from "../components/DateSelector";
import TimeSelector from "../components/TimeSelector";
import PatientForm from "../components/PatientForm";
import BackButton from "../../../components/BackButton/BackButton";
import { updateAppointment } from "../../../services/appointmentService";

function ScheduleAppointmentForm({ doctor }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    gender: "",
    age: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "",
    doctorName: doctor?.name || "",
    doctorPhoto: doctor?.photo || "",
    doctorSpecialty: doctor?.specialty || "",
  });
  const [profile, setProfile] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);

  const id_user = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDoctorSchedule = async () => {
      try {
        if (doctor?.id) {
          const schedule = await getDoctorSchedule(doctor.id, format(selectedDate, "yyyy-MM-dd"));
          const filteredTimes = schedule.map((appointment) => appointment.appointment_time);
          setAvailableTimes(filteredTimes);

          // Asignar appointmentId si es necesario
          if (schedule.length > 0) {
            setAppointmentId(schedule[0].id); // Ejemplo de cómo podrías establecer appointmentId
          }
        }
      } catch (error) {
        console.error("Error fetching doctor schedule:", error);
      }
    };

    fetchDoctorSchedule();
  }, [doctor?.id, selectedDate]);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const profile = await getPatientProfile();
        if (profile) {
          setProfile(profile);
          setFormData((prevState) => ({
            ...prevState,
            name: `${profile.patient.user.first_name} ${profile.patient.user.last_name}` || "",
            email: profile.patient.user.email || "",
            phone: profile.phone_number || "",
            gender: profile.gender || "",
            age: new Date().getFullYear() - new Date(profile.birth_date).getFullYear(),
            reason: "",
          }));
        }
      } catch (error) {
        console.error("Error fetching patient profile:", error);
      }
    };

    fetchPatientProfile();
  }, []);

  const handleDateClick = useCallback((date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  }, []);

  const handleTimeClick = useCallback((time) => {
    setSelectedTime(time);
    setFormData((prevState) => ({
      ...prevState,
      time: time,
    }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handlePhoneChange = useCallback((value) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: value,
    }));
  }, []);

  const handleDictate = useCallback((text) => {
    setFormData((prevState) => ({
      ...prevState,
      reason: text,
    }));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Profile:", profile);
      console.log("Appointment ID:", appointmentId);
      console.log("Form Data:", formData);
  
      const confirmed = await showDialog(
        "Confirmar Acción",
        "¿Estás seguro de que deseas realizar esta acción?",
        "warning",
        "#D03E92",
        true,
      );
  
      if (confirmed && profile && appointmentId) {
        const appointmentData = {
          id_user,
          status: 'reserved',
          reason_for_visit: formData.reason,
        };

        console.log(profile);
        
  
        console.log("Sending data to update appointment:", appointmentData);
  
        // Llama al servicio updateAppointment
        const result = await updateAppointment(appointmentId, appointmentData);
  
        // Navegar a la página de confirmación solo si la actualización fue exitosa
        if (result) {
          navigate("/patient/appointment/confirmation", { state: { formData } });
        }
      } else {
        console.error("Perfil del paciente o ID de la cita no disponible.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  
  

  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + i);
    return nextDay;
  });

  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <BackButton />
      <section>
        <h2 className="text-xl font-bold mb-4 text-center">Nueva Cita</h2>
        <DateSelector
          nextDays={nextDays}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
        />
        <TimeSelector
          availableTimes={availableTimes}
          selectedTime={selectedTime}
          onTimeClick={handleTimeClick}
        />
        <PatientForm
          formData={formData}
          onInputChange={handleInputChange}
          onPhoneChange={handlePhoneChange}
          onDictate={handleDictate}
          onSubmit={handleSubmit}
        />
      </section>
      <FooterNav />
    </main>
  );
}

export default ScheduleAppointmentForm;
