/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  format,
  addDays,
  isBefore,
  setMinutes,
  setHours,
  eachMinuteOfInterval,
} from "date-fns";
import BackButton from "../../../components/BackButton/BackButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import VoiceDictation from "../../../components/VoiceDictation/VoiceDictation";
import FooterNav from "../../../components/FooterNav/FooterNav";
import { useNavigate } from "react-router-dom";

function ScheduleAppointmentForm({ doctor }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "",
    doctorName: doctor.name,
    doctorPhoto: doctor.photo,
    doctorSpecialty: doctor.specialty,
  });

  useEffect(() => {
    const times = generateAvailableTimes(doctor.schedule, selectedDate);
    setAvailableTimes(times);
  }, [doctor.schedule, selectedDate]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      date: format(selectedDate, "yyyy-MM-dd"),
    }));
  }, [selectedDate]);

  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 4; i++) {
      days.push(addDays(new Date(), i));
    }
    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setFormData((prevState) => ({
      ...prevState,
      time: time,
    }));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleDictate = (text) => {
    setFormData((prevState) => ({
      ...prevState,
      reason: text,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    navigate("/patient/appointment/confirmation", { state: { formData } });
  };

  return (
    <main className="max-w-md mx-auto p-4 font-josefin">
      <BackButton />
      <section>
        <h2 className="text-xl font-bold mb-4 text-center">Nueva Cita</h2>

        {/* Información del médico */}
        {doctor && (
          <div className="mb-4 text-center">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-24 h-24 rounded-full mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
        )}

        <div className="mb-4">
          <p className="text-lg font-semibold">Selecciona una fecha:</p>
          <div className="flex space-x-2 mt-2">
            {getNextDays().map((date) => (
              <button
                key={date.toISOString()}
                className={`py-2 px-4 rounded ${
                  date.toDateString() === selectedDate.toDateString()
                    ? "bg-Justina_8 text-white"
                    : "bg-gray-200 text-gray-800"
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
          <div className="grid grid-cols-2 gap-2 mt-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                className={`py-2 px-4 rounded ${
                  time === selectedTime
                    ? "bg-Justina_8 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-normal mb-4">
            Confirmar datos del paciente
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Nombre completo"
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
                placeholder="Correo electrónico"
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
              <label className="block text-gray-700">Observaciones</label>
              <div className="relative">
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md outline-none"
                  placeholder="Escribe el motivo de la consulta"
                  rows="4"
                  required
                />
                <VoiceDictation onDictate={handleDictate} />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-Justina_8 text-white py-2 px-4 rounded-md outline-none"
              >
                Agendar cita
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
