import { Node } from '../node/node';

type NodeInfo = {
    type: string;
    children: NodeInfo[];
    props: {
        [key: string]: any;
    };
};

export type UiMap = {
    [key: string]: typeof Node;
};
export function convertXMLToNode(xmlText: string, uiMap: UiMap) {
    const node_info = xml_str2json(xmlText);
    return convertJSONToNode(node_info, uiMap);
}
const skip_key_arr = ['editorInfo', 'sceneColor', 'var'];
function convertJSONToNode(node_info: NodeInfo, uiMap: UiMap, top?: Node) {
    const { props, type, children } = node_info;
    if (!uiMap[type]) {
        return;
    }
    const node = new uiMap[type]();
    if (!top) {
        top = node;
    }
    for (const prop_name in props) {
        if (!props.hasOwnProperty(prop_name)) {
            continue;
        }
        if (prop_name === 'var') {
            top[props[prop_name]] = node;
        }
        if (skip_key_arr.indexOf(prop_name) !== -1) {
            continue;
        }
        const prop_val = convertStr(props[prop_name]);
        node[prop_name] = prop_val;
    }
    for (const child_info of children) {
        const child_node = convertJSONToNode(child_info, uiMap, top);
        if (child_node) {
            node.addChild(child_node);
        }
    }
    return node;
}

function xml_str2json(xmlDocStr) {
    const xmlDoc = parseXmlString(xmlDocStr);
    if (xmlDoc !== null) {
        return xml2json(xmlDoc);
    }
    return null;
}

function xml2json(node) {
    const result = {} as NodeInfo;
    result.type = getNodeLocalName(node);

    result.children = [];
    const { childNodes, attributes } = node;
    for (const child_json of childNodes) {
        const child = xml2json(child_json);
        result.children.push(child);
    }

    // Attributes
    if (attributes) {
        result.props = {};
        const { length } = attributes;
        for (let i = 0; i < length; i++) {
            const attr = attributes.item(i);
            result.props[attr.name] = attr.value;
        }
    }
    return result;
}

function getNodeLocalName(node) {
    let nodeLocalName = node.localName;
    if (nodeLocalName === null) {
        // Yeah, this is IE!!
        nodeLocalName = node.baseName;
    }
    if (nodeLocalName === null || nodeLocalName === '') {
        // =="" is IE too
        nodeLocalName = node.nodeName;
    }
    return nodeLocalName;
}

function parseXmlString(xmlDocStr) {
    if (xmlDocStr === undefined) {
        return null;
    }
    let xmlDoc;
    let parser;
    if ((window as any).DOMParser) {
        parser = new (window as any).DOMParser();
    }
    try {
        xmlDoc = parser.parseFromString(xmlDocStr, 'text/xml').firstChild;
    } catch (err) {
        xmlDoc = null;
    }
    return xmlDoc;
}

function convertStr(val: string) {
    if (val === 'true') {
        return true;
    }
    if (val === 'false') {
        return false;
    }
    if (!isNaN(Number(val))) {
        return Number(val);
    }
    return val;
}
