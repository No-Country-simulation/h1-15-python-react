/* eslint-disable react/prop-types */
import UserMenu from "./UserMenu";
import CardPatientAttendance from "./Cards/CardPatientAttendance";

const LateralView = ({ paciente }) => {
  return (
    <section className="flex flex-col">
      <aside className="flex flex-col items-center w-full">
        {/**NOTIFICACIONES */}
        <div className="flex gap-10 justify-center w-full">
          <div className="">⭕️</div>
          <div className="">🔔</div>
          <div>
            <UserMenu />
          </div>
        </div>
        {paciente && <CardPatientAttendance paciente={paciente} />}
      </aside>
    </section>
  );
};

export default LateralView;
