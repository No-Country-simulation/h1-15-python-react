import { useState, useRef } from "react";
import relationships from "../../../data/relationships.json";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { showToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import Icon from "../../../components/Icon/Icon";
import ContactCard from "./ContactCard";
import { importFromExcel } from "../../../utils/importFromExcel";
import DownloadExcelButton from "./DownloadExcelButton";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    relationship: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isPersonalListOpen, setIsPersonalListOpen] = useState(true);
  const [isAddContactOpen, setIsAddContactOpen] = useState(true);

  const fileInputRef = useRef(null);

  const handleAddContact = () => {
    const { firstName, lastName, phone, relationship } = newContact;
    if (firstName && lastName && phone && relationship) {
      setContacts((prevContacts) => [
        ...prevContacts,
        { ...newContact, id: Date.now() },
      ]);
      setNewContact({
        firstName: "",
        lastName: "",
        phone: "",
        relationship: "",
      });
      showToast("Contacto agregado exitosamente", "success");
    }
  };

  const handleRemoveContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id),
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.firstName + " " + contact.lastName)
        .toLowerCase()
        .includes(searchTerm) ||
      contact.phone.toLowerCase().includes(searchTerm) ||
      contact.relationship.toLowerCase().includes(searchTerm),
  );

  const handleToggleList = () => {
    setIsPersonalListOpen(!isPersonalListOpen);
  };

  const handleToggleContact = () => {
    setIsAddContactOpen(!isAddContactOpen);
  };

  const handleAddFromExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromExcel(file, (data) => {
        const [, ...rows] = data; 
  
        const formattedData = rows.map((row, index) => ({
          firstName: row[1] || "", 
          lastName: row[2] || "", 
          phone: row[3] || "", 
          relationship: row[4] || "", 
          id: Date.now() + index,
        }));
  
        setContacts((prevContacts) => [...prevContacts, ...formattedData]);
        showToast("Contactos importados exitosamente", "success");
      });
    }
  };
  

  const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="py-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Contactos de Emergencia</h2>

      <div className="relative mb-4 flex items-center">
        <input
          type="text"
          placeholder="Buscar contacto personal"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded mr-2 w-full h-[40px] text-sm px-3 bg-inherit"
        />
        <div className="absolute cursor-pointer text-2xl top-2 right-3">
          <Icon name="filter" />
        </div>
      </div>

      <div className="mb-4">
        <section className="flex w-full justify-between">
          <h3 className="text-lg font-semibold mb-2">Agregar Nuevo Contacto</h3>
          <button
            onClick={handleToggleContact}
          >
            {isAddContactOpen ? (
              <Icon name="FaChevronUpIcon" />
            ) : (
              <Icon name="FaChevronDownIcon" />
            )}
          </button>
        </section>
        <hr className="my-4 border-gray-300" />
        {isAddContactOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <section className="flex flex-col gap-2 md:col-span-2 items-center justify-center">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  Nombre
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Ingrese el nombre"
                  value={newContact.firstName}
                  onChange={(e) =>
                    setNewContact({ ...newContact, firstName: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full h-[40px] text-sm px-3 bg-inherit"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Apellido
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Ingrese el apellido"
                  value={newContact.lastName}
                  onChange={(e) =>
                    setNewContact({ ...newContact, lastName: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full h-[40px] text-sm px-3 bg-inherit"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Teléfono
                </label>
                <PhoneInput
                  country={"ar"}
                  value={newContact.phone}
                  onChange={(phone) => setNewContact({ ...newContact, phone })}
                  inputClass="border border-gray-300 rounded w-full h-[40px] text-sm px-3 bg-inherit"
                  specialLabel=""
                  inputStyle={{
                    width: "100%",
                    padding: "10px 10px 10px 26px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.375rem",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                    textIndent: "24px",
                    height: "40px",
                    background:"inherit"
                  }}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="relationship"
                  className="block text-sm font-medium mb-1"
                >
                  Parentesco
                </label>
                <select
                  id="relationship"
                  value={newContact.relationship}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      relationship: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded w-full h-[40px] text-sm px-3 bg-inherit"
                  required
                >
                  <option value="" className="bg-inherit">Seleccionar Parentesco</option>
                  {relationships.map((relation) => (
                    <option key={relation} value={relation}>
                      {relation}
                    </option>
                  ))}
                </select>
              </div>
            </section>
            <section className="flex flex-col gap-2 items-center md:col-span-1 md:pt-6">
              <button
                onClick={handleAddContact}
                className="bg-blue-500 text-white rounded h-[40px] w-full text-sm mb-2"
              >
                Agregar
              </button>
              <input
                type="file"
                accept=".xlsx, .xls"
                ref={fileInputRef}
                onChange={handleAddFromExcel}
                style={{ display: "none" }}
              />
              <button
                onClick={handleOpenFileDialog}
                className="bg-green-500 text-white rounded h-[40px] w-full text-sm"
              >
                Importar desde Excel
              </button>
              <DownloadExcelButton />
            </section>
          </div>
        )}
      </div>

      <div className="mb-4">
        <section className="flex w-full justify-between">
          <h3 className="text-lg font-semibold mb-2">Lista de Contactos</h3>
          <button
            onClick={handleToggleList}
          >
            {isPersonalListOpen ? (
              <Icon name="FaChevronUpIcon" />
            ) : (
              <Icon name="FaChevronDownIcon" />
            )}
          </button>
        </section>
        <hr className="my-4 border-gray-300" />
        {isPersonalListOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onRemove={() => handleRemoveContact(contact.id)}
                />
              ))
            ) : (
              <p>No hay contactos disponibles.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
