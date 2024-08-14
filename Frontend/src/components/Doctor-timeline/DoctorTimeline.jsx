/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getTodayAppointmentData } from "../../services/appointments";

// eslint-disable-next-line react/prop-types
export default function DoctorTimeline({ day, setPatient, selectedPatient }) {
  const [expanded, setExpanded] = useState(null);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await getTodayAppointmentData(day);
        const doctorAppointments = appointments.filter(
          (appointment) =>
            appointment.doctor === parseInt(localStorage.getItem("doctorId")),
        );
        setTimeline(doctorAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [day]);
  const handleAccordionChange = (
    isExpanded,
    paciente,
    medicalHistory,
    appointment_time,
    user,
  ) => {
    if (isExpanded) {
      setPatient({ patient: paciente, medicalHistory, appointment_time, user });
    } else {
      setPatient(null);
    }
    setExpanded(isExpanded ? paciente : null);
  };

  useEffect(() => {
    if ((selectedPatient === null) | undefined) {
      setExpanded(null);
    }
  }, [selectedPatient]);

  return (
    <Timeline>
      {timeline.length > 0 ? (
        timeline.map(
          (
            {
              patient,
              medicalHistory,
              appointment_time,
              reason_for_visit,
              user,
            },
            index,
          ) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent
                color="textSecondary"
                className="max-w-min"
              >
                {appointment_time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Accordion
                  className="divide-y"
                  style={{ borderRadius: 20 }}
                  expanded={expanded === patient}
                  onChange={(event, isExpanded) =>
                    handleAccordionChange(
                      isExpanded,
                      patient,
                      medicalHistory,
                      appointment_time,
                      user,
                    )
                  }
                >
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography>
                      {patient?.user.first_name + " " + patient?.user.last_name}{" "}
                      | {reason_for_visit ? reason_for_visit : "Sin motivo"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="grid grid-cols-1 xl:grid-cols-2 pl-5 pb-5">
                      <p>
                        Diagnóstico:{" "}
                        {medicalHistory ? medicalHistory : "Sin diagnóstico"}
                      </p>
                      <p>Edad: {35}</p>
                      <p>Prepaga: {patient?.financer}</p>
                    </div>
                    <div className="flex justify-evenly">
                      <Tooltip title="Proximamente...">
                        <button className="bg-[#C03744] font-semibold text-sm px-4 py-2 rounded-[10px] text-white hover:scale-[103%] outline-none transition-all duration-300 hover:shadow-xl active:shadow-inner">
                          Cancelar Turno
                        </button>
                      </Tooltip>
                      <Tooltip title="Proximamente...">
                        <button className="bg-[#958BBF] font-semibold text-sm px-4 py-2 rounded-[10px] text-white hover:scale-[103%] outline-none transition-all duration-300 hover:shadow-xl active:shadow-inner">
                          Ver historial clínico
                        </button>
                      </Tooltip>
                      <Link
                        to={`/doctor/consultant/${patient?.id}`}
                        className="bg-[#36A781] font-semibold text-sm px-4 py-2 rounded-[10px] text-white hover:scale-[103%] outline-none transition-all duration-300 hover:shadow-xl active:shadow-inner"
                      >
                        <span>Comenzar consulta</span>
                      </Link>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </TimelineContent>
            </TimelineItem>
          ),
        )
      ) : (
        <div className="w-full py-20">
          <p className="text-center text-3xl text-green-800 opacity-60">
            No hay turnos para hoy!
          </p>
        </div>
      )}
    </Timeline>
  );
}
