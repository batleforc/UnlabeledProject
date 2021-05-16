const electron = require("electron");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const { startServeur, stopServeur } = require("./elec/server");

let mainWindow;
const BaseFolder = path.join(__dirname);
const icon = path.join(BaseFolder, "toolbox.png");

const createWindow = ({ showOnLoad = true } = {}) => {
  if (mainWindow) {
    mainWindow.focus();
    return;
  }
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    icon: icon,
  });
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : "http://localhost:5000/"
  ); //`file://${path.join(__dirname, '../build/index.html')}`
  //mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.once("ready-to-show", () => {
    if (showOnLoad) mainWindow.show();
  });
  mainWindow.once("closed", () => (mainWindow = null));
  mainWindow.removeMenu();
};

const init = () => {
  app.on("window-all-closed", (e) => e.preventDefault());
};

const onQuit = () => {
  stopServeur();
  app.quit();
};

app.requestSingleInstanceLock() ? init() : app.quit();
app.on("second-instance", () => mainWindow.show());

app.on("ready", () => {
  const tray = require("./elec/tray");
  startServeur();
  createWindow();
  tray(
    icon,
    createWindow,
    () => {
      console.log("test");
    },
    onQuit
  );
});

app.on("window-all-closed", () => {});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

process.on("SIGINT", onQuit);
process.on("SIGTERM", onQuit);
