import { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
import LateralView from "../../components/LateralView";
import Navegacion from "./Navigation";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/es";
import { capitalizar } from "../../utils/Capitalize";
import CardPatientAppointment from "../../components/Cards/CardPatientAppointment";

const DoctorAppointments = () => {
  const [turnos, setTurnos] = useState([
    {
      _id: "66a120885f85d928588a3a85",
      index: 0,
      isActive: false,
      picture: "http://placehold.it/32x32",
      age: 32,
      name: "Greene Estrada",
      gender: "male",
      company: "GRACKER",
      email: "greeneestrada@gracker.com",
      phone: "+1 (821) 469-3014",
      about:
        "Duis minim nisi incididunt sint laboris. Sint sint velit labore eu laborum aute irure et. Sit culpa exercitation incididunt eu occaecat duis labore nostrud sit do in Lorem.\r\n",
      registered: "2016-09-03T03:53:33 +03:00",
      appointmentDate:
        "Sun Aug 25 2024 07:16:48 GMT-0300 (hora estándar de Argentina)",
      tags: ["ullamco", "ea", "ad", "sint", "consequat", "Lorem", "non"],
      treatment: [
        {
          id: 0,
          name: "Aute dolor tempor sit officia id cillum est pariatur occaecat incididunt proident excepteur dolor eu. Commodo exercitation velit exercitation mollit excepteur laborum. Voluptate nostrud ex consequat velit velit ullamco nisi. Sint eu duis sint consequat sint sint nostrud enim mollit sunt. Sit quis tempor tempor duis. Veniam ex reprehenderit dolor mollit labore ex magna irure ipsum et cupidatat in minim.\r\n",
        },
        {
          id: 1,
          name: "Consectetur nulla proident sint consequat aute minim non. Lorem consequat ad excepteur magna nulla elit exercitation. In culpa cillum esse est voluptate aliquip enim ad ex consectetur nostrud voluptate. Labore fugiat commodo commodo cupidatat non id.\r\n",
        },
        {
          id: 2,
          name: "Reprehenderit labore duis magna labore fugiat aliqua mollit culpa. Amet aliquip do labore veniam nostrud dolor ex sunt sint deserunt. Amet irure tempor esse nisi nisi minim irure. Mollit incididunt elit ullamco incididunt nostrud dolor qui culpa ullamco cupidatat irure. Officia est eu labore aliquip eiusmod nulla mollit ea cillum ipsum. Est aliqua cillum voluptate officia incididunt deserunt laborum. In sit sit et magna consequat aliqua ullamco labore proident ea.\r\n",
        },
      ],
      headDoctor: "Juliana Barnes",
    },
    {
      _id: "66a12088be246346745b2b32",
      index: 1,
      isActive: true,
      picture: "http://placehold.it/32x32",
      age: 31,
      name: "Mclaughlin Jefferson",
      gender: "male",
      company: "ACCEL",
      email: "mclaughlinjefferson@accel.com",
      phone: "+1 (819) 453-2207",
      about:
        "Ullamco sunt ut officia consequat sit nisi consequat dolor reprehenderit id deserunt. Exercitation incididunt esse est eiusmod ipsum cupidatat minim pariatur cupidatat veniam aute ad. Culpa minim mollit aliqua veniam labore. Deserunt deserunt amet Lorem mollit anim voluptate culpa dolore exercitation cillum est. Mollit consectetur excepteur do sit enim ipsum in est amet Lorem. Excepteur dolor commodo culpa ullamco mollit eu ex.\r\n",
      registered: "2017-02-10T05:53:01 +03:00",
      appointmentDate:
        "Sun Jul 28 2024 04:21:32 GMT-0300 (hora estándar de Argentina)",
      tags: ["nulla", "eu", "enim", "veniam", "cupidatat", "nulla", "qui"],
      treatment: [
        {
          id: 0,
          name: "Ex magna minim laborum labore eiusmod incididunt sint dolore nulla minim fugiat do velit minim. Sit cillum pariatur laboris occaecat qui velit occaecat cillum ut anim sit commodo pariatur. Ad cupidatat quis sit non. Sunt tempor exercitation ut sint cupidatat dolore mollit.\r\n",
        },
        {
          id: 1,
          name: "Lorem incididunt ea occaecat eiusmod dolor commodo ut nisi id consectetur consequat eiusmod eiusmod et. Ipsum quis id consectetur deserunt sit ut cupidatat nostrud adipisicing officia anim deserunt nulla. Commodo consectetur sit fugiat labore. Quis pariatur id sint amet cillum in qui anim. Dolor commodo id voluptate ex veniam magna ut ipsum quis deserunt nostrud amet. Laborum reprehenderit est velit voluptate est occaecat aliqua eu Lorem proident duis. Quis incididunt officia nulla ut duis eu consequat Lorem mollit quis enim.\r\n",
        },
        {
          id: 2,
          name: "Et magna et veniam elit velit dolor exercitation enim amet nisi fugiat cillum eu. Enim nisi et occaecat aliqua. Laborum nisi adipisicing tempor tempor officia cupidatat. Velit cupidatat sit do elit. Do nostrud ea veniam culpa est ut qui officia velit ullamco nulla fugiat.\r\n",
        },
      ],
      headDoctor: "Keller Howell",
    },
    {
      _id: "66a12054be246346745b2b32",
      index: 5,
      isActive: true,
      picture: "http://placehold.it/32x32",
      age: 22,
      name: "Sorrentino Petterson",
      gender: "male",
      company: "ACCEL",
      email: "mclaughlinjefferson@accel.com",
      phone: "+1 (819) 453-2207",
      about:
        "Ullamco sunt ut officia consequat sit nisi consequat dolor reprehenderit id deserunt. Exercitation incididunt esse est eiusmod ipsum cupidatat minim pariatur cupidatat veniam aute ad. Culpa minim mollit aliqua veniam labore. Deserunt deserunt amet Lorem mollit anim voluptate culpa dolore exercitation cillum est. Mollit consectetur excepteur do sit enim ipsum in est amet Lorem. Excepteur dolor commodo culpa ullamco mollit eu ex.\r\n",
      registered: "2017-02-10T05:53:01 +03:00",
      appointmentDate:
        "Sun Jul 28 2024 14:21:32 GMT-0300 (hora estándar de Argentina)",
      tags: ["nulla", "eu", "enim", "veniam", "cupidatat", "nulla", "qui"],
      treatment: [
        {
          id: 0,
          name: "Ex magna minim laborum labore eiusmod incididunt sint dolore nulla minim fugiat do velit minim. Sit cillum pariatur laboris occaecat qui velit occaecat cillum ut anim sit commodo pariatur. Ad cupidatat quis sit non. Sunt tempor exercitation ut sint cupidatat dolore mollit.\r\n",
        },
        {
          id: 1,
          name: "Lorem incididunt ea occaecat eiusmod dolor commodo ut nisi id consectetur consequat eiusmod eiusmod et. Ipsum quis id consectetur deserunt sit ut cupidatat nostrud adipisicing officia anim deserunt nulla. Commodo consectetur sit fugiat labore. Quis pariatur id sint amet cillum in qui anim. Dolor commodo id voluptate ex veniam magna ut ipsum quis deserunt nostrud amet. Laborum reprehenderit est velit voluptate est occaecat aliqua eu Lorem proident duis. Quis incididunt officia nulla ut duis eu consequat Lorem mollit quis enim.\r\n",
        },
        {
          id: 2,
          name: "Et magna et veniam elit velit dolor exercitation enim amet nisi fugiat cillum eu. Enim nisi et occaecat aliqua. Laborum nisi adipisicing tempor tempor officia cupidatat. Velit cupidatat sit do elit. Do nostrud ea veniam culpa est ut qui officia velit ullamco nulla fugiat.\r\n",
        },
      ],
      headDoctor: "Martin King",
    },
    {
      _id: "66a12088a5d2f8b260fc0ae1",
      index: 2,
      isActive: true,
      picture: "http://placehold.it/32x32",
      age: 39,
      name: "Cherry Barlow",
      gender: "female",
      company: "SKYPLEX",
      email: "cherrybarlow@skyplex.com",
      phone: "+1 (831) 497-3332",
      about:
        "Lorem elit laborum ad voluptate occaecat duis. Enim adipisicing exercitation veniam culpa commodo et. Pariatur occaecat magna est exercitation elit amet proident anim pariatur quis. Nisi commodo nostrud aliquip ullamco. Commodo adipisicing excepteur tempor dolor officia.\r\n",
      registered: "2022-10-06T10:49:31 +03:00",
      appointmentDate:
        "Sun Aug 11 2024 23:25:35 GMT-0300 (hora estándar de Argentina)",
      tags: [
        "magna",
        "deserunt",
        "proident",
        "proident",
        "ex",
        "consectetur",
        "ipsum",
      ],
      treatment: [
        {
          id: 0,
          name: "Qui adipisicing duis dolore laboris. Enim enim mollit exercitation exercitation ullamco elit consectetur. Reprehenderit reprehenderit laborum nostrud ullamco labore ut adipisicing aliquip. Veniam minim velit dolor velit commodo qui quis mollit aute mollit. Officia fugiat consequat incididunt cillum enim esse duis aute adipisicing fugiat quis deserunt.\r\n",
        },
        {
          id: 1,
          name: "Mollit eiusmod laborum excepteur qui fugiat nostrud ipsum et et veniam anim qui. Et dolor tempor velit eiusmod aliquip dolor incididunt officia ut. Proident ut labore ad esse in exercitation consequat mollit non nulla mollit. Eiusmod minim ad cillum tempor ex sint. Adipisicing reprehenderit elit nulla laborum.\r\n",
        },
        {
          id: 2,
          name: "Ullamco ea deserunt laboris sint. Officia consequat Lorem ullamco eiusmod sunt qui aliquip. Cupidatat ad exercitation sunt Lorem aute laborum consequat minim Lorem nisi.\r\n",
        },
      ],
      headDoctor: "Gilmore Macdonald",
    },
    {
      _id: "66a12088c92b8fb38abda194",
      index: 3,
      isActive: false,
      picture: "http://placehold.it/32x32",
      age: 28,
      name: "Petersen Bauer",
      gender: "male",
      company: "PROFLEX",
      email: "petersenbauer@proflex.com",
      phone: "+1 (904) 554-3494",
      about:
        "Eu dolore velit aliquip culpa mollit commodo aliquip ad. Irure nostrud id veniam laboris magna reprehenderit sint anim ex elit nulla. Et sit laborum deserunt et in irure. Fugiat cupidatat commodo laborum enim duis culpa do proident ea. Fugiat sit minim incididunt cillum dolor ex sunt. Esse fugiat ipsum exercitation sint sit ipsum do.\r\n",
      registered: "2020-09-25T02:02:15 +03:00",
      appointmentDate:
        "Wed Aug 07 2024 09:50:36 GMT-0300 (hora estándar de Argentina)",
      tags: [
        "duis",
        "excepteur",
        "voluptate",
        "labore",
        "laboris",
        "qui",
        "esse",
      ],
      treatment: [
        {
          id: 0,
          name: "Reprehenderit in dolor nostrud sunt sint sit pariatur eu. Sit sunt ullamco excepteur excepteur. Sunt consequat ut aliqua exercitation ipsum tempor. Amet minim ea fugiat consectetur aliqua quis mollit nisi. Sit ex ut sint cillum sit qui aute minim do id in dolor dolore. Esse irure elit commodo nostrud ullamco. Aute tempor pariatur sit cupidatat et exercitation ut anim.\r\n",
        },
        {
          id: 1,
          name: "Adipisicing adipisicing et Lorem ad aute non minim id veniam aute. Aliquip culpa irure minim cillum ut do enim occaecat. Adipisicing laborum irure dolore dolor exercitation exercitation aute Lorem veniam. Et sint labore eu ipsum reprehenderit id dolore et. Ut amet incididunt ullamco amet elit culpa proident ex minim nostrud sit exercitation aliqua. Voluptate tempor deserunt elit quis do dolor eiusmod veniam occaecat qui in labore officia.\r\n",
        },
        {
          id: 2,
          name: "Voluptate cupidatat non nisi ea veniam qui officia. In excepteur commodo et aliqua sit cupidatat proident. Laboris mollit veniam ea id nostrud dolore duis exercitation quis ullamco occaecat exercitation commodo. Eu ipsum esse cupidatat sint deserunt ex aliquip elit magna commodo labore veniam consectetur commodo. Est labore exercitation occaecat cillum ullamco velit commodo tempor in. Sint nulla laboris aliquip ullamco occaecat dolor dolore ex. Lorem qui enim pariatur aliquip nulla.\r\n",
        },
      ],
      headDoctor: "Cervantes Mcbride",
    },
    {
      _id: "66a1208837ea22255c47b415",
      index: 4,
      isActive: true,
      picture: "http://placehold.it/32x32",
      age: 25,
      name: "Fernandez Alvarez",
      gender: "male",
      company: "BEDLAM",
      email: "fernandezalvarez@bedlam.com",
      phone: "+1 (998) 533-2691",
      about:
        "Reprehenderit incididunt magna et in dolor culpa in fugiat. Adipisicing sit exercitation tempor labore ex dolor ipsum minim esse ullamco. Elit reprehenderit incididunt do enim pariatur et ea occaecat deserunt sunt. Ut dolore Lorem minim proident laborum reprehenderit exercitation est. In tempor sit sit pariatur magna. Elit do consequat aute duis dolor laboris irure pariatur. Sint incididunt et do nulla sunt.\r\n",
      registered: "2017-01-30T01:45:30 +03:00",
      appointmentDate:
        "Thu Aug 22 2024 06:12:06 GMT-0300 (hora estándar de Argentina)",
      tags: [
        "cillum",
        "minim",
        "ad",
        "deserunt",
        "incididunt",
        "aliqua",
        "irure",
      ],
      treatment: [
        {
          id: 0,
          name: "Culpa sint occaecat do tempor sit tempor proident commodo duis adipisicing ad ipsum est. Elit excepteur pariatur cillum commodo ad occaecat nisi in sit deserunt. Incididunt ea et esse laboris.\r\n",
        },
        {
          id: 1,
          name: "Fugiat tempor in occaecat duis veniam tempor eiusmod irure fugiat aute est magna et Lorem. Dolor commodo est reprehenderit aliquip ex exercitation ullamco elit commodo qui. Culpa labore esse mollit ex adipisicing enim amet nostrud amet nisi proident qui proident nostrud. Ex do Lorem sunt do consequat anim nisi pariatur nostrud sit cillum tempor anim mollit. Anim cillum in officia ea officia cillum.\r\n",
        },
        {
          id: 2,
          name: "Officia sit culpa ut sunt eu. Voluptate eu irure aliquip excepteur laboris veniam minim veniam. Cupidatat incididunt consequat ipsum amet excepteur laboris esse proident labore. Commodo dolor sit aliqua ea do sint reprehenderit reprehenderit.\r\n",
        },
      ],
      headDoctor: "Alana Coffey",
    },
    {
      _id: "66a12088d27c0fd6b304f478",
      index: 5,
      isActive: false,
      picture: "http://placehold.it/32x32",
      age: 27,
      name: "Rowe Hardin",
      gender: "male",
      company: "PAWNAGRA",
      email: "rowehardin@pawnagra.com",
      phone: "+1 (880) 513-3067",
      about:
        "Ut et reprehenderit nostrud anim ullamco excepteur. Labore aliqua aliqua quis incididunt labore quis id cillum duis do aliquip dolor amet officia. Ex officia velit id veniam ullamco nulla nulla do ex consequat laboris elit consectetur. Est amet officia elit anim laboris esse excepteur reprehenderit ullamco officia labore sit eiusmod minim.\r\n",
      registered: "2021-07-01T09:54:31 +03:00",
      appointmentDate:
        "Sat Aug 10 2024 06:50:07 GMT-0300 (hora estándar de Argentina)",
      tags: [
        "veniam",
        "ad",
        "aliqua",
        "ipsum",
        "labore",
        "adipisicing",
        "nulla",
      ],
      treatment: [
        {
          id: 0,
          name: "Incididunt aliquip et id esse dolor culpa ut veniam consectetur aliqua. Ut ipsum occaecat voluptate non do cillum. Esse commodo ullamco mollit nisi magna. Aliqua eu deserunt consectetur et fugiat ullamco cillum qui cupidatat proident ad enim eiusmod do. Aute ea veniam dolore ipsum excepteur ipsum.\r\n",
        },
        {
          id: 1,
          name: "Laborum et irure quis consectetur pariatur veniam ea duis deserunt. Consequat ea minim mollit ut. Ut cillum eiusmod nisi eiusmod ea eu ut incididunt et. Anim nulla nulla laborum nulla sit exercitation laboris do ea anim. Sunt laborum nostrud id enim quis amet do culpa deserunt. Non esse eiusmod eu ex consectetur ipsum labore quis exercitation. Quis et dolor anim deserunt.\r\n",
        },
        {
          id: 2,
          name: "Dolore culpa minim magna velit esse Lorem elit officia sint pariatur ea tempor excepteur nulla. Aute nisi culpa ea culpa. Proident duis ex aute fugiat deserunt proident irure adipisicing cupidatat in fugiat nisi nulla. Esse magna aute adipisicing nulla mollit aute non in labore. Dolore veniam sit laboris incididunt velit eu do amet et incididunt veniam elit ex officia. Esse ipsum eu reprehenderit nostrud enim consequat magna occaecat excepteur. Et adipisicing eu tempor ex aute aliqua tempor nisi sint adipisicing.\r\n",
        },
      ],
      headDoctor: "Mcbride Ayers",
    },
  ]);
  const [fecha, setFecha] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState();
  const [showCalendar, setShowCalendar] = useState(false);

  dayjs.locale("es");
  dayjs().format();
  dayjs.extend(weekday);

  {
    /**SOLO PARA QUE NO MUESTRE EL ERROR - CAMBIAR */
  }
  if (showCalendar == 3) {
    setTurnos(4);
  }
  {
    /** */
  }
  useEffect(() => {
    setSelectedPatient(undefined);
  }, [fecha]);

  return (
    <main className="flex w-full min-h-[1024px] p-5 gap-5">
      <Navegacion />
      {/**TURNERO */}
      <section className="min-w-[689px] grid mx-auto gap-2 h-fit relative">
        <h1 className="font-josefin text-3xl text-center">TURNOS</h1>
        <h4
          className="w-fit justify-self-center cursor-pointer text-center text-lg font-bold underline my-4"
          onMouseEnter={() => setShowCalendar(true)}
        >
          {capitalizar(dayjs(fecha).weekday(fecha.getDay()).format("dddd")) +
            ", " +
            fecha.toLocaleDateString()}
        </h4>

        <div
          className={`${
            showCalendar ? "opacity-100" : "opacity-0 -z-20"
          } transition-opacity duration-500 easy-in-out absolute top-28 left-5 bg-white border border-blue-600 shadow-md shadow-blue-700 rounded-lg translate-x-1/2`}
          onMouseLeave={() => setShowCalendar(false)}
        >
          <Calendar fecha={setFecha} />
        </div>
        {/**LISTADO DE TURNOS DE LA FECHA SELECCIONADA */}
        <article>
          {turnos
            .filter((turno) =>
              dayjs(new Date(turno.appointmentDate)).isSame(dayjs(fecha), "day")
            )
            .map((paciente) => {
              return (
                <CardPatientAppointment
                  key={paciente._id}
                  paciente={paciente}
                  clickear={setSelectedPatient}
                  pacienteSeleccionado={selectedPatient}
                />
              );
            })}
        </article>
      </section>
      <LateralView paciente={selectedPatient} />
    </main>
  );
};

export default DoctorAppointments;
