import { app, BrowserWindow, Menu, ipcMain } from "electron";
import * as url from "url";
import * as path from "path";

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 300, height: 300, frame: false });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "../../dist/renderer/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on("closed", function() {
    app.quit();
  });

  // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Menu.setApplicationMenu(mainMenu);

  app.on("window-all-closed", function() {
    app.quit();
  });
});

ipcMain.on("close-main-window", () => {
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
