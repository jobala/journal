/* eslint-disable import/no-extraneous-dependencies */
import { app, BrowserWindow, ipcMain as ipc } from 'electron';

import { IEntry } from './models/entry';
import { EntryController } from './controllers/entry';

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

const entryController = new EntryController();

ipc.on('create-entry', (event, payload: IEntry) => {
  entryController.addEntry(payload).then((newEntry) => {
    event.sender.send('entry-created', newEntry._id);
  }).catch((error: Error) => { throw error; });
});
