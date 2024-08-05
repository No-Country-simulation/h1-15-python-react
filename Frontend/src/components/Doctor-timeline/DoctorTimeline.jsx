import { useState } from "react";
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

const timeline = [
  {
    id: 0,
    hora_turno: `${new Date().getHours()}:${new Date().getMinutes()}`,
    status: "disponible",
    is_active: true,
    paciente: {
      prepaga: "osde",
      name: "Kyrie Stewart",
      age: 32,
      risk: "alto",
      picture: "https://randomuser.me/api/portraits/men/20.jpg",
    },
    medico: 0,
    entidad: 0,
  },
  {
    id: 1,
    hora_turno: `${new Date().getHours() + 1}:${new Date().getMinutes()}`,
    status: "disponible",
    is_active: true,
    paciente: {
      prepaga: "osde",
      name: "Anna Davidson",
      age: 19,
      risk: "bajo",
      picture: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    medico: 0,
    entidad: 0,
  },
  {
    id: 2,
    hora_turno: `${new Date().getHours() + 2}:${new Date().getMinutes()}`,
    status: "disponible",
    is_active: true,
    paciente: {
      prepaga: "osde",
      name: "Mariana Ross",
      age: 36,
      risk: "bajo",
      picture: "https://randomuser.me/api/portraits/women/36.jpg",
    },
    medico: 0,
    entidad: 0,
  },
];

// eslint-disable-next-line react/prop-types
export default function DoctorTimeline({ setPatient }) {
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (isExpanded, paciente) => {
    if (isExpanded) {
      setPatient(paciente);
    } else {
      setPatient(null);
    }
    setExpanded(isExpanded ? paciente : null);
  };

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
            <Accordion
              className="divide-y"
              style={{ borderRadius: 20 }}
              expanded={expanded === paciente}
              onChange={(event, isExpanded) =>
                handleAccordionChange(isExpanded, paciente)
              }
            >
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
                    <span className="text-text_secondary cursor-pointer hover:underline">
                      Ver historial clínico
                    </span>
                  </Tooltip>
                  <span
                    className="text-text_secondary cursor-pointer hover:underline"
                    onClick={() => handleAccordionChange(true, paciente)}
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
