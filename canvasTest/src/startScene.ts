import { Dialog } from '../lightCanvas/node/component/dialog';
import { Graphics } from '../lightCanvas/node/graphics';
import { Image } from '../lightCanvas/node/image';
import { Node } from '../lightCanvas/node/node';
import { Stage } from '../lightCanvas/node/stage';
import { Text } from '../lightCanvas/node/text';
import { convertXMLToNode } from '../lightCanvas/utils/convertXmlToNode';
import { tweenProps } from '../lightCanvas/utils/tweenProps';
import { setProps } from '../lightCanvas/utils/utils';
import { pop as pop_xml } from './xml';

export type NodeData = {
    scene: string;
    pop: string;
};
export type NodeInfo = {
    scene?: string;
    alert?: string;
};
export const xml = {
    pop: pop_xml,
} as NodeData;
export function setXml(xml_data: NodeInfo) {
    setProps(xml, {
        ...xml_data,
    });
}
export function xmlToNode(xml_str: string) {
    return convertXMLToNode(xml_str, {
        Dialog,
        Image,
        Button: Image,
        Node,
        Label: Text,
        Box: Node,
        View: Node,
    });
}
export function startScene(stage: Stage) {
    const scene = xmlToNode(xml.scene);
    const pop = xmlToNode(xml.pop) as Dialog & {
        btn_close;
        btn_confirm;
        btn_cancel;
        tipsText;
    };
    stage.addChild(scene);
    const graphics = new Graphics();
    graphics.drawRect(0, 0, scene.width, scene.height, '#41c4df');
    scene.graphics = graphics;

    pop.btn_close.on('click', () => {
        pop.close('btn_close');
    });
    pop.btn_confirm.on('click', () => {
        pop.close('btn_confirm');
    });
    pop.btn_cancel.on('click', () => {
        pop.close('btn_cancel');
    });
    const alert = (text: string, close_fun?: FuncVoid) => {
        pop.tipsText.text = text;
        pop.popup();
        if (close_fun) {
            pop.once('close', close_fun);
        }
    };
    tweenProps({
        start_props: { alpha: 1 },
        end_props: { alpha: 0 },
        callback: () => {
            alert('1');
        },
        step_fun: (props: ClassProps<Node>) => {
            setProps(scene, props);
        },
        time: 5000,
    });

    return {
        stage,
        scene,
        alert,
    };
}
