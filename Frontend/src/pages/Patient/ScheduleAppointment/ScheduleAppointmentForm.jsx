/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  format,
  addDays,
  isBefore,
  setMinutes,
  setHours,
  eachMinuteOfInterval,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton/BackButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import VoiceDictation from "../../../components/VoiceDictation/VoiceDictation";
import FooterNav from "../../../components/FooterNav/FooterNav";
import patientProfileData from "../../../data/PatientProfile.json";

const getNextDays = () => {
  return Array.from({ length: 4 }, (_, i) => addDays(new Date(), i));
};

const generateAvailableTimes = (schedule, date) => {
  const dayOfWeek = format(date, "EEEE");
  const range = schedule[dayOfWeek];
  if (!range) return [];

  const [start, end] = range.map((timeString) => {
    const [hour, minute] = timeString.match(/\d+/g).map(Number);
    const isPM = timeString.includes("PM");
    return setMinutes(setHours(new Date(), isPM ? hour + 12 : hour), minute);
  });

  if (!isBefore(start, end)) return [];

  return eachMinuteOfInterval({ start, end }, { step: 30 }).map((time) =>
    format(time, "HH:mm"),
  );
};

function ScheduleAppointmentForm({ doctor }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: patientProfileData.name || "",
    email: patientProfileData.contact || "",
    phone: patientProfileData.phone || "",
    reason: "",
    gender: patientProfileData.gender || "",
    age: patientProfileData.age || "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "",
    doctorName: doctor.name,
    doctorPhoto: doctor.photo,
    doctorSpecialty: doctor.specialty,
  });

  useEffect(() => {
    setAvailableTimes(generateAvailableTimes(doctor.schedule, selectedDate));
  }, [doctor.schedule, selectedDate]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      date: format(selectedDate, "yyyy-MM-dd"),
    }));
  }, [selectedDate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/patient/appointment/confirmation", { state: { formData } });
  };

  const nextDays = useMemo(() => getNextDays(), []);
  const times = useMemo(() => availableTimes, [availableTimes]);

  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <BackButton />
      <section>
        <h2 className="text-xl font-bold mb-4 text-center">Nueva Cita</h2>
        <div className="mb-4">
          <p className="text-lg font-semibold">Selecciona una fecha:</p>
          <div className="flex flex-wrap justify-center space-x-2 mt-2">
            {nextDays.map((date) => (
              <button
                key={date.toISOString()}
                className={`py-2 px-4 rounded-lg h-16 md:w-20 md:h-20 ${
                  date.toDateString() === selectedDate.toDateString()
                    ? "bg-gradient-button-2 text-white rounded-custom shadow-inner-custom"
                    : " text-gray-800 border border-1 border-slate-100 shadow-md"
                }`}
                onClick={() => handleDateClick(date)}
              >
                {format(date, "dd")}
                <br />
                <span className="text-sm">{format(date, "EEEE")}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Selecciona una hora:</h3>
          <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {times.map((time) => (
              <button
                key={time}
                className={`py-2 px-4 rounded ${
                  time === selectedTime
                    ? "bg-gradient-button-2 text-white rounded-custom shadow-inner-custom"
                    : "text-gray-800 border border-1 border-slate-100 shadow-md"
                }`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-normal mb-4">Datos del paciente</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Ingrese su nombre completo"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Teléfono</label>
              <PhoneInput
                country={"ar"}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: "100%",
                  padding: "10px 10px 10px 26px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  textIndent: "24px",
                }}
                inputProps={{
                  name: "phone",
                  required: true,
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700">Género</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Ingrese su género"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Edad</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Ingrese su edad"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                {" "}
                Motivo de la Consulta
              </label>
              <div className="relative">
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md outline-none"
                  placeholder="Describa brevemente el motivo de su consulta..."
                  rows="4"
                  required
                />
                <VoiceDictation onDictate={handleDictate} />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-Justina_8 text-white font-semibold rounded-md"
              >
                Confirmar cita
              </button>
            </div>
          </form>
        </div>
      </section>
      <FooterNav />
    </main>
  );
}

export default ScheduleAppointmentForm;
