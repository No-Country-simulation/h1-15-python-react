export function capitalizar(texto) {
  if (texto.length === 0) return "";

  const primeraLetra = texto.charAt(0).toUpperCase();
  const restoDelTexto = texto.slice(1);

  return primeraLetra + restoDelTexto;
}
