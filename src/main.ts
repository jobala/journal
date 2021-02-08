/* eslint-disable import/no-extraneous-dependencies */
import {
  app, BrowserWindow, emitters, ipcMain as ipc,
} from 'electron';

import { IEntry, IUpdatePayload } from './models/entry';

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

  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools();
});
