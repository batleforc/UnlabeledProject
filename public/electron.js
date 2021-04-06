const electron = require("electron");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const { startServeur } = require("./elec/server");

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
  startServeur();
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.removeMenu();
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
