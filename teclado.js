process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", (key) => {
  if (key === "\u0003") process.exit(0);
  console.log("Tecla:", JSON.stringify(key));
});
