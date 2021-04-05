const electron = require("electron");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const { fork } = require("child_process");
const path = require("path");
const url = require("url");
const Server = require("../BuildServer/index");
const { startServeur } = require("./elec/server");
console.log(serverPath);
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
  });
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : "http://localhost:5000/"
  ); //`file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
};

const init = () => {
  app.on("window-all-closed", (e) => e.preventDefault());
};

const onQuit = () => {};

app.requestSingleInstanceLock() ? init() : app.quit();
app.on("second-instance", () => mainWindow.show());

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

process.on("SIGINT", onQuit);
process.on("SIGTERM", onQuit);
