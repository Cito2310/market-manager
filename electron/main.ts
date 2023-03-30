import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { ipcConnections } from './ipcConnection';

function createWindow() {
  const win = new BrowserWindow({
    // width: 800,
    // height: 600,
    // fullscreen: true,
    // fullscreenable: true,
    webPreferences: {
      // contextIsolation: false,
      // sandbox: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    win.maximize()
    // win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  ipcConnections();

});
