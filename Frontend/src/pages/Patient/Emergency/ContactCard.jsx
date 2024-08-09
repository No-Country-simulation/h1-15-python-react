/* eslint-disable react/prop-types */
import Icon from "../../../components/Icon/Icon";

const ContactCard = ({ contact, onRemove }) => {
  return (
    <div className="relative bg-white p-4 border rounded shadow-md flex flex-col">
      <button
        onClick={() => onRemove(contact.id)}
        className="absolute text-red-500 p-2 w-fit top-1 right-1"
      >
        <Icon name="FaTrashAltIcon" />
      </button>
      <h4 className="text-lg font-semibold mb-2">
        {contact.firstName} {contact.lastName}
      </h4>
      <p className="text-gray-700 mb-1">Teléfono: {contact.phone}</p>
      <p className="text-gray-700 mb-1">Parentesco: {contact.relationship}</p>
    </div>
  );
};

export default ContactCard;
