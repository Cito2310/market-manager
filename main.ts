const path = require("path");
const { app, BrowserWindow } = require('electron');
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");

setupTitlebar()

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        // title: string, // El nombre de la ventana
        // icon: string, // El icono de la ventana
        width: 520, // Ancho de la ventana
        height: 660,  // Altura de la ventana

        backgroundColor: "#282828", // Color de fondo
        titleBarStyle: 'hidden',

        // minWidth: number, // Ancho minimo
        // minHeight: number, // Altura minimo
        // maxWidth: number, // Ancho maximo
        // maxHeight: number, // Altura maxima

        // resizable: boolean, // La ventana se puede redimensionar
        // fullscreenable: true, // La ventana se puede redimensionar
        // maximizable: boolean, // La ventana se puede maximizar
        // minimizable: boolean, // La ventana se puede minimizar
        // movable: boolean, // La ventana se puede mover

        // alwaysOnTop: boolean, // La ventana siempre se encuentra encima
        // kiosk: boolean, // La ventana se pone en modo kiosko
        frame: false, // Indica si la ventana debe poseer cuadro

        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, "preload.ts")
        }
    })
    
    attachTitlebarToWindow(mainWindow);
    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools() // Open devtools
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})