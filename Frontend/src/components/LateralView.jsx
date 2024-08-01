/* eslint-disable react/prop-types */
import CardPatientAttendance from "./Cards/CardPatientAttendance";

const LateralView = ({ paciente }) => {
  return (
    <section className="flex flex-col w-1/4">
      <aside className="flex flex-col items-center w-full">
        {paciente && <CardPatientAttendance paciente={paciente} />}
      </aside>
    </section>
  );
};

export default LateralView;
