import ExcelJS from "exceljs";

export const importFromExcel = async (file, callback) => {
  const workbook = new ExcelJS.Workbook();
  const reader = new FileReader();

  reader.onload = async (event) => {
    try {
      await workbook.xlsx.load(event.target.result);

      const worksheet = workbook.getWorksheet(1);

      const jsonData = [];
      worksheet.eachRow({ includeEmpty: true }, (row) => {
        const rowValues = row.values;
        jsonData.push(rowValues);
      });

      callback(jsonData);
    } catch (error) {
      console.error("Error al cargar el archivo Excel:", error);
    }
  };

  reader.readAsArrayBuffer(file);
};
