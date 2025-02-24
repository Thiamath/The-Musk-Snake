// @ts-nocheck
const rl = require("readline-sync");

function generarTablero(alto, ancho) {
  const tablero = [];
  for (let i = 0; i < alto; i++) {
    tablero[i] = [];
    for (let j = 0; j < ancho; j++) {
      tablero[i][j] = "·";
    }
  }
  return tablero;
}

const calcularAltoAncho = (tablero) => {
  return {
    alto: tablero.length,
    ancho: tablero[0]?.length ?? "0",
  };
};

function pintarTablero(tablero) {
  if (!tablero) {
    console.error("No me has pasado un tablero válido");
    return;
  }
  const { alto, ancho } = calcularAltoAncho(tablero);

  console.log("+" + "-".repeat(ancho) + "+");
  for (fila of tablero) {
    console.log("|" + fila.join("") + "|");
  }
  console.log("+" + "-".repeat(ancho) + "+");
}

function colocarJugador(tablero) {
  const { alto, ancho } = calcularAltoAncho(tablero);
  const posicion = [
    Math.ceil(Math.random() * (alto - 1)), // 0 ~ 1 -- 0.01568 ---> 0 ~ alto
    Math.ceil(Math.random() * (ancho - 1)),
  ];
  tablero[posicion[0]][posicion[1]] = "@";
}

const miTablero = generarTablero(7, 12);
colocarJugador(miTablero);

do {
  console.clear();
  pintarTablero(miTablero);
  rl.question("Hacia donde movemos?");
} while (true);
