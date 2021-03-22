const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const Server = require('../BuildServer/index')
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar:true
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : "http://localhost:5000/" ); //`file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.once('ready-to-show', () => mainWindow.show());
}

app.on('ready', ()=>{
  Server()
  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
