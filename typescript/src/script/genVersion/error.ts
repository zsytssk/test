export type TypeErr = 1 | 2;

const msg_map = {
    1: 'cant find relative bin file',
    2: 'file not combine to json',
};

export class ErrorInfo extends Error {
    public msg: string;
    public file: string;
    constructor(type: TypeErr, file: string) {
        super(msg_map[type]);
        this.msg = msg_map[type];
        this.file = file;
    }
}
