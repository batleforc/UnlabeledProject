const { fork } = require("child_process");
const path = require("path");

let server = null;

const serverPath = path.join(__dirname, "..", "..", "BuildServer");
const serverJs = path.join(serverPath, "index.js");

function bufferToString(buffer) {
  return (Buffer.isBuffer(buffer) ? buffer.toString() : buffer).trim();
}

function output(buffer) {
  console.log(bufferToString(buffer));
}

function startServeur() {
  if (server) return server;
  server = fork(serverJs);
  server.stdout.on("data", output);
  server.stderr.on("data", output);

  server.on("close", (code) => {
    output(`Server stoped with code ${code}`);
  });
}

function stopServeur() {
  if (!server) return;
  server.stdin.pause();
  server.kill();
  server = null;
}

function restartServeur() {
  if (!server) stopServeur();
  startServeur();
}

module.exports = {
  startServeur,
  stopServeur,
  restartServeur,
};
