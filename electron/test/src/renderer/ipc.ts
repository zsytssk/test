import { ipcRenderer } from 'electron';
import { log } from 'util';
import { generateRandomString } from './util';

export function quit() {
  ipcRenderer.send('close-main-window');
}

export function emitToMain(cmd, data?) {
  return new Promise(resolve => {
    const code = generateRandomString();
    function receive(event, arg) {
      if (arg.code !== code) {
        return;
      }
      resolve(arg.data);
      ipcRenderer.removeListener(cmd, receive);
    }

    ipcRenderer.send(cmd, { code, data });
    ipcRenderer.on(cmd, receive);
  });
}

export function connect() {
  /** 从main传过来reload命令 */
  ipcRenderer.on('reload', () => {
    log(__dirname);

    location.reload(true);
  });
}
