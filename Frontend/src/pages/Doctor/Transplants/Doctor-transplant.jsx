import { useState } from "react";

import LateralView from "../../../components/LateralView"
import { useEffect } from 'react';
import Avatar from "../../../components/Avatar";


const DoctorTransplants = () => {
  const [donantes, setDonantes] = useState();
  const [pacientes, setPacientes] = useState();
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState();
  async function loadPacientes(){
    const response = await fetch('/src/data/pacientes.json');
    const names = await response.json();
    setPacientes(names.result);
  }
  async function loadDonantes() {
    const response = await fetch('/src/data/donantes.json');
    const names = await response.json();

    setDonantes(names.donantes); 
  }
  useEffect(() => {
    loadPacientes();
    loadDonantes();
  }, []);
    
  return (
    <main className="flex w-full min-h-[1024px]  gap-5">
    <section className="min-w-[689px] grid mx-auto h-fit relative font-josefin">
        <h1 className="font-josefin text-3xl text-center">TRANSPLANTES CRUZADOS</h1>
        <div className="grid grid-cols-[1fr_4px_1fr] gap-x-4 mt-6">
          <div className="text-center"><h2 className="text-xl my-4">Donantes</h2>
          
          
          {donantes && donantes.map((donante, index) =>
            (<article key={index} className="flex items-center justify-around my-2 cursor-pointer hover:bg-blue-100/55 pl-2 py-1 rounded-sm">
              {/* <p className="overflow-hidden text-ellipsis whitespace-nowrap">{donante.nombre}</p>
              <p>{donante.edad}</p>
              <p>{donante.grupo}</p> */}
              <Avatar className="w-10 h-10 m-0"/>
              <div className="flex flex-col flex-grow">
                <p>{donante.nombre}</p>
                <div>
                  <p>{donante.edad} años - <span>{donante.grupo}</span></p>
                </div>
              </div>
              <button className="py-1 px-3 text-xs rounded-lg bg-yellow-100 text-yellow-600 hover:text-black hover:text-bold">Ver Detalle...</button>
          </article>)
          )}
          </div>
          <div className="w-1 border-l border-black "></div>
          <div className="text-center"><h2 className="text-xl my-4">Mis pacientes</h2>
        <article className="grid grid-cols-4 items-center justify-around text-center font-bold text-base gap-4">
            
            <h4>Nombre y Apellido</h4>
            <h4>Edad</h4>
            <h4>Grupo Sanguineo</h4>
            <p className="opacity-0">boton</p>
          </article>
          <div className="h-[70%] overflow-y-scroll">
        {pacientes && pacientes.map((paciente, index) =>{
            
            return (<article key={index} className={`grid grid-cols-4 items-center justify-around my-2 cursor-pointer hover:bg-blue-100/55 pl-2 py-1 rounded-sm ${(pacienteSeleccionado && pacienteSeleccionado._id === paciente._id) ? "bg-yellow-100 rounded-sm":""}`}>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">{paciente.name}</p>
              <p>{paciente.age}</p>
              <p>A +</p>
              <button onClick={() => {setPacienteSeleccionado(paciente)}} className="py-1 px-3 text-xs rounded-lg bg-yellow-100 text-yellow-600 hover:text-black hover:text-bold">Ver afin...</button>
          </article>)
        })}
        </div>
          </div>
        </div>
    </section>
      <LateralView paciente={pacienteSeleccionado}/>
      </main>
  )
}

export default DoctorTransplants