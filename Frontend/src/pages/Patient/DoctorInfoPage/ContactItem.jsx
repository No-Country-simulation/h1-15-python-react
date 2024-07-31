import Icon from "../../../components/Icon/Icon";

// eslint-disable-next-line react/prop-types
function ContactItem({ href, icon, title, description }) {
  return (
    <section className="flex gap-3">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        <Icon name={icon} />
      </a>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </section>
  );
}

export default ContactItem;
