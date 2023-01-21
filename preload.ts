const { contextBridge, ipcRenderer } = require('electron');
const { Titlebar } = require("custom-electron-titlebar");

window.addEventListener('DOMContentLoaded', () => {
  new Titlebar();
});


contextBridge.exposeInMainWorld('electron', {
  readApi: async() => ipcRenderer.invoke('read-api'),
});