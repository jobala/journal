import { app, BrowserWindow } from 'electron';

let win: BrowserWindow;

app.on('ready', () => {
  win = new BrowserWindow();
  win.webContents.openDevTools();
});
