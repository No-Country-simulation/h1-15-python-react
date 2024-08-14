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
    console.log(timeline);
  }, [day]);
  const handleAccordionChange = (isExpanded, paciente) => {
    if (isExpanded) {
      setPatient(paciente);
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
          ({ patient, appointment_time, reason_for_visit }, index) => (
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
                    handleAccordionChange(isExpanded, patient)
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
                      <p>Diagnóstico: Intentar traer el Diagnóstico</p>
                      <p>Edad: {35}</p>
                      <p>Prepaga: {patient?.financer}</p>
                    </div>
                    <div className="flex justify-evenly">
                      <Tooltip title="Proximamente...">
                        <span className="text-red-600 cursor-pointer hover:underline">
                          Cancelar Turno
                        </span>
                      </Tooltip>
                      <Tooltip title="Proximamente...">
                        <span className="text-text_secondary cursor-pointer hover:underline">
                          Ver historial clínico
                        </span>
                      </Tooltip>
                      <Link to={`/doctor/consultant/${patient?.id}`}>
                        <span className="text-green-600 cursor-pointer hover:underline">
                          Comenzar consulta
                        </span>
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
