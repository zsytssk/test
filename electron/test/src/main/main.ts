import { app, BrowserWindow } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { sendToRenderer } from './ipc';

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1000, height: 500 });
  const render_address =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:8080/dist/renderer/'
      : url.format({
          pathname: path.join(__dirname, '../../dist/renderer/index.html'),
          protocol: 'file:',
          slashes: true,
        });

  // mainWindow.loadURL(render_address);
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../../dist/renderer/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  mainWindow.on('closed', () => {
    app.quit();
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools();

  // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Menu.setApplicationMenu(mainMenu);

  app.on('window-all-closed', () => {
    app.quit();
  });
});

/** 监听renderer页面修改发送刷新命令给renderer */
fs.watch(path.resolve(__dirname, '../../dist/renderer'), () => {
  sendToRenderer(mainWindow, 'reload');
});
