const { calcularAltoAncho, getRandomCoords } = require("./utils");

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

function pintarTablero(tablero) {
  console.clear();
  if (!tablero) {
    console.error("No me has pasado un tablero válido");
    return;
  }
  const { alto, ancho } = calcularAltoAncho(tablero);

  console.log(`+${"-".repeat(ancho)}+   SCORE: ${puntuacion}`);
  for (const fila of tablero) {
    console.log("|" + fila.join("") + "|");
  }
  console.log("+" + "-".repeat(ancho) + "+");
}

function calcularPosicionInicial(tablero) {
  const { alto, ancho } = calcularAltoAncho(tablero);
  const posicion = getRandomCoords(alto, ancho);
  const estela = [];
  return { posicion, estela };
}

function colocarJugador(tablero, jugador) {
  const { alto, ancho } = calcularAltoAncho(tablero);
  tablero[jugador.posicion[1]][jugador.posicion[0]] = "@";
  return jugador;
}

function colocarComida(tablero, posicion) {
  const { alto, ancho } = calcularAltoAncho(tablero);
  tablero[posicion[1]][posicion[0]] = "·";
  return posicion;
}

function moverJugador(tablero, jugador, movimiento) {
  const { posicion: cabeza, estela } = jugador;
  tablero[cabeza[1]][cabeza[0]] = " ";
  const posicionAnterior = [...cabeza];
  switch (movimiento) {
    case "\u001b[A":
      cabeza[1] -= 1;
      break;
    case "\u001b[B":
      cabeza[1] += 1;
      break;
    case "\u001b[D":
      cabeza[0] -= 1;
      break;
    case "\u001b[C":
      cabeza[0] += 1;
      break;
    default:
      break;
  }
  const comemos = tablero[cabeza[1]][cabeza[0]] === "·";
  if (comemos) {
    hayComida = false;
    puntuacion += 5;
    estela.push(posicionAnterior);
  }
  const { alto, ancho } = calcularAltoAncho(tablero);
  if (cabeza[0] < 0 || cabeza[0] >= ancho) {
    console.log("GAME OVER");
    process.exit(1);
  }
  if (cabeza[1] < 0 || cabeza[1] >= alto) {
    console.log("GAME OVER");
    process.exit(1);
  }
  tablero[cabeza[1]][cabeza[0]] = "@";
  for (const cola of estela) {
    tablero[cola[1]][cola[0]] = "O";
  }
}

function updateGame() {
  if (!hayComida) {
    hayComida = true;
    const { alto, ancho } = calcularAltoAncho(miTablero);
    posicionComida = getRandomCoords(alto, ancho);
    // TODO evitar que posicionComida === posicionJugador
    colocarComida(miTablero, posicionComida);
  }
  moverJugador(miTablero, jugador, movimiento);
  pintarTablero(miTablero, puntuacion);
}

const miTablero = generarTablero(15, 25);
const jugador = calcularPosicionInicial(miTablero);
colocarJugador(miTablero, jugador);

let hayComida = false;
let posicionComida = [];
let puntuacion = 0;
let estela = 0;
let movimiento = "";

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

updateGame();

process.stdin.on("data", (key) => {
  if (key === "\u0003") process.exit(0);
  movimiento = key;

  updateGame();
});
