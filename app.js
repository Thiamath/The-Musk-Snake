// @ts-nocheck
const rl = require("readline-sync");

function generarTablero(alto, ancho) {
  const tablero = [];
  for (let i = 0; i < alto; i++) {
    tablero[i] = [];
    for (let j = 0; j < ancho; j++) {
      tablero[i][j] = " ";
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

function calcularPosicionInicial(tablero) {
  const { alto, ancho } = calcularAltoAncho(tablero);
  const posicion = [
    Math.ceil(Math.random() * (ancho - 1)), // X
    Math.ceil(Math.random() * (alto - 1)), // Y
  ];
  return posicion;
}

function colocarJugador(tablero, posicion) {
  const { alto, ancho } = calcularAltoAncho(tablero);
  tablero[posicion[1]][posicion[0]] = "@";
  return posicion;
}

function colocarComida(tablero, posicion) {
  const { alto, ancho } = calcularAltoAncho(tablero);
  tablero[posicion[1]][posicion[0]] = "·";
  return posicion;
}

function moverJugador(tablero, posicion, movimiento) {
  tablero[posicion[1]][posicion[0]] = " ";
  switch (movimiento) {
    case "ARRIBA":
      posicion[1] -= 1;
      break;
    case "ABAJO":
      posicion[1] += 1;
      break;
    case "IZQUIERDA":
      posicion[0] -= 1;
      break;
    case "DERECHA":
      posicion[0] += 1;
      break;
    default:
      break;
  }
  const comemos = tablero[posicion[1]][posicion[0]] === "·";
  if (comemos) {
    hayComida = false;
    console.log("ÑAM");
  }
  const { alto, ancho } = calcularAltoAncho(tablero);
  if (posicion[0] < 0 || posicion[0] >= ancho) {
    console.log("GAME OVER");
    process.exit(1);
  }
  if (posicion[1] < 0 || posicion[1] >= alto) {
    console.log("GAME OVER");
    process.exit(1);
  }
  tablero[posicion[1]][posicion[0]] = "@";
}

const miTablero = generarTablero(7, 12);
const posicion = calcularPosicionInicial(miTablero);
colocarJugador(miTablero, posicion);

let hayComida = false;
let posicionComida = [];

do {
  console.clear();
  if (!hayComida) {
    hayComida = true;
    posicionComida = calcularPosicionInicial(miTablero);
    // TODO evitar que posicionComida === posicionJugador
    colocarComida(miTablero, posicionComida);
  }
  pintarTablero(miTablero);
  const movimiento = rl.question("Hacia donde movemos?").toUpperCase();
  moverJugador(miTablero, posicion, movimiento);
} while (true);
