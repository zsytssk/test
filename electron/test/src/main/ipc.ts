import { app, BrowserWindow, ipcMain } from 'electron';
// import { log } from 'util';
import { CONFIG } from './config';
import { walkSync } from './ls/walk';

ipcMain.on('close-main-window', () => {
  app.quit();
});

ipcMain.on('test-getFolder', (event, arg) => {
  event.sender.send('test-getFolder', {
    code: arg.code,
    data: walkSync(CONFIG.test_dir),
  });
});

export function sendToRenderer(window: BrowserWindow, cmd: string, data?: any) {
  window.webContents.send(cmd, data);
}
