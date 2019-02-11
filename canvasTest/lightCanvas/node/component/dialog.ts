import { Node } from '../node';
import { DialogManager } from './dialogManager';

export class Dialog extends Node {
    public isPopup: boolean;
    public close(status: string) {
        this.event('close', status);
        DialogManager.instance.close(this);
        this.isPopup = false;
    }
    public popup() {
        this.isPopup = true;
        DialogManager.instance.open(this);
    }
}
