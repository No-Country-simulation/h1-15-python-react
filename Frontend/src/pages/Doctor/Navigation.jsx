import { Link, useLocation } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import useLanguage from "../../hooks/useLanguage";

const Navigation = () => {
  const actual = useLocation();
  const languageData = useLanguage();

  if (!languageData) {
    return <div>Cargando datos...</div>;
  }

  const lastLink = languageData.sidebar[languageData.sidebar.length - 1];

  return (
    <aside className="bg-red-500 flex flex-col w-[300px] text-white h-full min-h-[90dvh] overflow-hidden font-josefin rounded-lg font-bold">
      <nav className="flex flex-col bg-magentaButton w-full min-h-full gap-6 flex-grow p-4 rounded-lg text-xl">
        {languageData.sidebar.slice(0, -1).map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-4 p-2 hover:#0008 w-full ${
              actual.pathname === link.to
                ? "border-2 border-white rounded-lg"
                : ""
            }`}
          >
            <Icon name={link.icon} />
            {link.name}
          </Link>
        ))}

        <Link
          to={lastLink.to}
          className="flex items-center gap-4 p-2 mt-auto hover:#0008 w-full"
        >
          <Icon name={lastLink.icon} />
          {lastLink.name}
        </Link>
      </nav>
    </aside>
  );
};

export default Navigation;
