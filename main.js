const { app, BrowserWindow, session } = require('electron');
const path = require('path');

// Standard Chrome User Agent to minimize detection
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            webviewTag: true, // Critical for <webview>
            nodeIntegration: true, // For renderer.js to use require if needed (or use contextBridge)
            contextIsolation: false // Simplifying for MVP; ideally use preload
        }
    });

    mainWindow.loadFile('index.html');

    // Optional: Open DevTools
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    // Set User Agent globally for all sessions
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = USER_AGENT;
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
