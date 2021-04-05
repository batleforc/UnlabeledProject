const open = require("open");
const { Tray, Menu } = require("electron");
const path = require("path");

let tray = null;

async function openInBrowser() {
  open("http://localhost:5000");
}

function createMenu(quit) {
  return new Menu.buildFromTemplate([
    {
      label: `${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`,
      enabled: false,
    },
    { type: "separator" },
    {
      label: "open in browser",
      click: () => openInBrowser(),
    },
    { type: "separator" },
    { label: "Exit", click: () => quit() },
  ]);
}

async function createTray(icon, MainWindow, quit) {
  tray = new Tray(icon);
  tray.setToolTip(
    `${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`
  );
  tray.setContextMenu(createMenu(quit));
  tray.setIgnoreDoubleClickEvents(true);
  tray.on("click", async () => (await MainWindow()).show());

  return tray;
}

module.exports = () => tray || createTray();
