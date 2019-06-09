import { destroy, init, Opt } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { setLogo } from './setLogo';
import { NodeData, startScene, xmlToNode } from './startScene';

export type StartPot = Opt & {
    logo?: string;
    xml: NodeData;
};
function start(width: number, height: number, start_opt?: StartPot) {
    const { logo, xml, ...opt } = start_opt;
    const { stage } = init(width, height, opt);
    setLogo(logo, width, height);

    return startScene(stage);
}
export { load, xmlToNode, start, destroy };
