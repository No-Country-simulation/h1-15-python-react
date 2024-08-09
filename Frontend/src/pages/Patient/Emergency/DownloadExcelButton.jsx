import * as XLSX from "xlsx";

const DownloadExcelButton = () => {
  const handleDownload = () => {
    const data = [
      ["FirstName", "LastName", "Phone", "Relationship"],
      ["Juan", "Pérez", "+54112345678", "Amigo"],
      ["María", "Gómez", "+54123456789", "Familiar"],
      ["Luis", "Fernández", "+54134567890", "Colega"],
      ["Ana", "Martínez", "+54145678901", "Vecina"],
      ["Carlos", "González", "+54156789012", "Compañero"],
      ["Laura", "Jiménez", "+54167890123", "Amiga"],
      ["Pedro", "Sánchez", "+54178901234", "Colega"],
      ["Sofia", "López", "+54189012345", "Familiar"],
      ["Ricardo", "Morales", "+54190123456", "Amigo"],
      ["Elena", "Hernández", "+54201234567", "Familiar"],
      ["Miguel", "Ramírez", "+54212345678", "Compañero"],
      ["Paola", "Ortiz", "+54223456789", "Vecina"],
      ["Javier", "Vega", "+54234567890", "Colega"],
      ["Beatriz", "Silva", "+54245678901", "Amiga"],
      ["Ricardo", "Torrado", "+54256789012", "Amigo"],
      ["Lucía", "García", "+54267890123", "Familiar"],
      ["Samuel", "Moreno", "+54278901234", "Compañero"],
      ["Camila", "Paredes", "+54289012345", "Vecina"],
      ["Antonio", "Méndez", "+54290123456", "Colega"],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");

    XLSX.writeFile(wb, "contactos.xlsx");
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-magentaButton text-white rounded h-[40px] w-full text-sm mt-2"
    >
      Descargar Plantilla de carga
    </button>
  );
};

export default DownloadExcelButton;
