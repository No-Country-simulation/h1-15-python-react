import { useState, useEffect } from 'react';
import {
  format,
  addDays,
  isBefore,
  setMinutes,
  setHours,
  eachMinuteOfInterval,
} from 'date-fns';
import BackButton from '../../../components/BackButton/BackButton';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import VoiceDictation from '../../../components/VoiceDictation/VoiceDictation';

// eslint-disable-next-line react/prop-types
function ScheduleAppointmentForm({ doctor }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    doctor: doctor.name,
  });

  useEffect(() => {
    const times = generateAvailableTimes(doctor.schedule, selectedDate);
    setAvailableTimes(times);
  }, [doctor.schedule, selectedDate]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      date: format(selectedDate, 'yyyy-MM-dd'),
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
    const dayOfWeek = format(date, 'EEEE');
    const range = schedule[dayOfWeek];
    if (!range) return [];

    const [start, end] = range.map((timeString) => {
      const [hour, minute] = timeString.match(/\d+/g).map(Number);
      const isPM = timeString.includes('PM');
      return setMinutes(setHours(new Date(), isPM ? hour + 12 : hour), minute);
    });

    if (!isBefore(start, end)) return [];

    return eachMinuteOfInterval({ start, end }, { step: 30 }).map((time) =>
      format(time, 'HH:mm'),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <BackButton />
      <h2 className="text-xl font-bold mb-4 text-center">Nueva Cita</h2>
      <div className="mb-4">
        <p className="text-lg font-semibold">Selecciona una fecha:</p>
        <div className="flex space-x-2 mt-2">
          {getNextDays().map((date) => (
            <button
              key={date.toISOString()}
              className={`py-2 px-4 rounded ${
                date.toDateString() === selectedDate.toDateString()
                  ? 'bg-Justina_8 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleDateClick(date)}
            >
              {format(date, 'dd')}
              <br />
              <span className="text-sm">{format(date, 'EEEE')}</span>
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
                time === selectedTime ? 'bg-Justina_8 text-white' : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
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
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Teléfono</label>
            <PhoneInput
              country={'us'}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputClass="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Observaciones</label>
            <div className="relative">
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Escribe el motivo de la consulta"
                rows="4"
                required
              />
              <VoiceDictation onDictate={handleDictate} />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className="bg-Justina_8 text-white py-2 px-4 rounded-md"
            >
              Agendar cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleAppointmentForm;
