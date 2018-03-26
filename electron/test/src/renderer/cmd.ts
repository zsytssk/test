import { ipcRenderer } from 'electron';

export function quit() {
  ipcRenderer.send('close-main-window');
}
