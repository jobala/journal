import { app, BrowserWindow } from 'electron';

let win: BrowserWindow;

app.on('ready', () => {
  win = new BrowserWindow({
    height: 700,
    width: 1200,
  });

  win.loadURL(`file://${__dirname}/../src/main.html`);
  win.webContents.openDevTools();
});
