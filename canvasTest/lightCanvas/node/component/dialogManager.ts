import { Graphics } from '../graphics';
import { Node } from '../node';
import { Stage } from '../stage';
import { Dialog } from './dialog';

type Temp = Array<{
    dialog: Dialog;
    bg: Node;
    wrap: Node;
}>;
const dialog_temp = [] as Temp;
let dialog_manager: DialogManager;
export class DialogManager {
    constructor() {
        const stage = Stage.instance;
        stage.on('resize', () => {
            for (const item of dialog_temp) {
                const { bg } = item;
                const {
                    width,
                    height,
                    canvas_height,
                    canvas_width,
                    x,
                    y,
                } = stage;
                bg.width = width;
                bg.height = height;
                bg.graphics.clear();
                bg.graphics.drawRect(
                    0,
                    0,
                    canvas_width,
                    canvas_height,
                    'black',
                );
                bg.x = -x;
                bg.y = -y;
            }
        });
    }
    static get instance() {
        if (!dialog_manager) {
            dialog_manager = new this();
        }
        return dialog_manager;
    }
    public open(dialog: Dialog) {
        const find_item = this.findDialogInTemp(dialog);
        const stage = Stage.instance;
        let wrap;
        if (!find_item) {
            const { width, height, canvas_height, canvas_width, x, y } = stage;
            const bg = new Node();
            bg.width = width;
            bg.height = height;
            const graphics = new Graphics();
            graphics.drawRect(0, 0, canvas_width, canvas_height, 'black');
            bg.x = -x;
            bg.y = -y;
            graphics.alpha = 0.7;
            bg.graphics = graphics;

            wrap = new Node();
            wrap.width = width;
            wrap.height = height;
            dialog.x = (width - dialog.width) / 2;
            dialog.y = (height - dialog.height) / 2;
            wrap.addChildren(bg, dialog);
            dialog_temp.push({
                dialog,
                bg,
                wrap,
            });
        } else {
            wrap = find_item.wrap;
        }
        stage.addChild(wrap);
    }
    public close(dialog: Dialog) {
        const stage = Stage.instance;
        const find_item = this.findDialogInTemp(dialog);
        if (!find_item) {
            return;
        }
        const { wrap } = find_item;
        stage.removeChild(wrap);
    }
    private findDialogInTemp(dialog: Dialog) {
        for (const item of dialog_temp) {
            const { dialog: item_dialog } = item;
            if (dialog === item_dialog) {
                return item;
            }
        }
    }
}
