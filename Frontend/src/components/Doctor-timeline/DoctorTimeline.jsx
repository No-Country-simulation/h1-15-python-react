/* eslint-disable react/prop-types */
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
const timeline = [
  {
    id: 0,
    hora_turno: `${new Date().getHours()}:${new Date().getMinutes()}`,
    status: "disponible",
    is_active: true,
    paciente: {
      prepaga: "osde",
      name: "Kyrie Stewart",
      age: 20,
      risk: "alto",
    },
    medico: 0,
    entidad: 0,
  },
  {
    id: 0,
    hora_turno: `${new Date().getHours() + 1}:${new Date().getMinutes()}`,
    status: "disponible",
    is_active: true,
    paciente: {
      prepaga: "osde",
      name: "Anna Davidson",
      age: 50,
      risk: "bajo",
    },
    medico: 0,
    entidad: 0,
  },
  {
    id: 0,
    hora_turno: `${new Date().getHours() + 2}:${new Date().getMinutes()}`,
    status: "disponible",
    is_active: true,
    paciente: {
      prepaga: "osde",
      name: "Mariana Ross",
      age: 36,
      risk: "bajo",
    },
    medico: 0,
    entidad: 0,
  },
];
export default function DoctorTimeline({ setPatient }) {
  return (
    <Timeline>
      {timeline.map(({ paciente, hora_turno }, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="textSecondary" className="max-w-min">
            {hora_turno}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Accordion className="divide-y" style={{ borderRadius: 20 }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>{paciente.name} | Arritmia</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-2 pl-5 pb-5">
                  <p>Paciente: {paciente.name}</p>
                  <p>Edad: {paciente.age}</p>
                  <p>Riesgo: {paciente.risk}</p>
                  <p>Prepaga: {paciente.prepaga}</p>
                </div>
                <div className="flex justify-evenly">
                  <Tooltip title="Proximamente...">
                    <span
                      className="text-text_secondary cursor-pointer hover:underline"
                      onClick={() => setPatient(paciente)}
                    >
                      Ver historial clínico
                    </span>
                  </Tooltip>
                  <span
                    className="text-text_secondary cursor-pointer hover:underline"
                    onClick={() => setPatient(paciente)}
                  >
                    Ver tarjeta
                  </span>
                </div>
              </AccordionDetails>
            </Accordion>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
