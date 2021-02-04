/* eslint-disable import/no-extraneous-dependencies */
import { app, BrowserWindow } from 'electron';

try {
  // eslint-disable-next-line global-require
  require('electron-reloader')(module);
  // eslint-disable-next-line no-empty
} catch (_) { }

let win: BrowserWindow;

app.on('ready', () => {
  win = new BrowserWindow({
    height: 700,
    width: 1200,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(`file://${__dirname}/../src/views/main.html`);
});
