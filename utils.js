const calcularAltoAncho = (tablero) => {
  return {
    alto: tablero.length,
    ancho: tablero[0]?.length ?? "0",
  };
};

const getRandomCoords = (alto, ancho) => [
  Math.ceil(Math.random() * (ancho - 1)), // X
  Math.ceil(Math.random() * (alto - 1)), // Y
];

module.exports = {
  calcularAltoAncho,
  getRandomCoords,
};
