/* eslint-disable react/prop-types */
import CardPatientAttendance from "./Cards/CardPatientAttendance";

const LateralView = ({ paciente, enConsulta, HC }) => {
  return (
    <section className="flex flex-col">
      <aside className="flex flex-col items-center w-full">
        {paciente && (
          <CardPatientAttendance
            paciente={paciente}
            enConsulta={enConsulta}
            HC={HC}
          />
        )}
      </aside>
    </section>
  );
};

export default LateralView;
