import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 300, height: 300 });
  const render_adress =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:8080/dist/renderer/'
      : url.format({
          pathname: path.join(__dirname, '../../dist/renderer/index.html'),
          protocol: 'file:',
          slashes: true,
        });

  // mainWindow.loadURL(render_adress);
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

ipcMain.on('close-main-window', () => {
  app.quit();
});

// const mainMenuTemplate = [
//   {
//     label: "File",
//     submenu: [
//       {
//         label: "quit",
//         click() {
//           app.quit();
//         }
//       },
//       {
//         label: "reload",
//         click() {
//           app.relaunch();
//         }
//       }
//     ]
//   }
// ];
