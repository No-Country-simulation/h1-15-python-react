import { postDoctorSchema } from "../../services/doctorService";

const daysOfWeek = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];
export default function DoctorSchema() {
  function saveDaySchedule(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    postDoctorSchema({
      entity: "Mater Dei",
      schedules: [
        [formData.get("day"), formData.get("init"), formData.get("finally")],
      ],
    });
  }
  return (
    <section className="pt-4">
      <h2 className="text-xl text-slate-500">Horarios de trabajo</h2>
      <div className="grid grid-cols-3 p-4 gap-4">
        {daysOfWeek.map((day, index) => (
          <form
            id={`formSchedule${day}`}
            onSubmit={saveDaySchedule}
            key={index}
            className="border border-[#79747E] rounded-lg p-3 divide-y"
          >
            <div className="flex justify-evenly items-center pb-2">
              <h4 className="text-lg">{day}</h4>
              <button
                type="submit"
                form={`formSchedule${day}`}
                className="hover:cursor-pointer bg-magentaButton text-white p-1 rounded h-fit text-sm"
              >
                Guardar
              </button>
            </div>
            <div className="flex justify-evenly">
              <input name="day" type="text" hidden value={day} />
              <label>
                <p>Desde</p>
                <input
                  required
                  name="init"
                  className="bg-transparent border border-[#79747E]  rounded-lg p-2 text-sm"
                  type="time"
                />
              </label>
              <label>
                <p>Hasta</p>
                <input
                  required
                  name="finally"
                  className="bg-transparent border border-[#79747E] rounded-lg p-2 text-sm "
                  type="time"
                />
              </label>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
}
