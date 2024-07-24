/* eslint-disable react/prop-types */
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "dayjs/locale/es-mx";

const Calendar = ({ fecha }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
      <DateCalendar
        onChange={(date) => fecha(date.$d)}
        slotProps={{
          day: {
            sx: {
              "&:hover": {
                border: "1px solid #115",
              },
            },
          },
          // Use `slotProps` to override the default style of a specific slot component
          toolbar: {
            sx: { backgroundColor: "pink" },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
