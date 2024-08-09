import Swal from "sweetalert2";

const showDialog = async (
  title,
  text,
  icon,
  confirmButtonColor,
  isConfirmation = false,
  autoCloseTimer = 0,
) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: isConfirmation,
    confirmButtonColor: confirmButtonColor || "#00ADDE",
    cancelButtonColor: "#0009",
    confirmButtonText: isConfirmation ? "Confirmar" : "Aceptar",
    cancelButtonText: isConfirmation ? "Cancelar" : undefined,
    background: "#fff",
    color: "var(--text-color)",
    timer: autoCloseTimer > 0 ? autoCloseTimer : undefined,
    timerProgressBar: autoCloseTimer > 0,
    willClose: () => {
      if (autoCloseTimer > 0) {
        Swal.stopTimer();
      }
    },
  });

  return result.isConfirmed;
};

export default showDialog;
