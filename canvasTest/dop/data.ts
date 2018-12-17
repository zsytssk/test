type CallTemp = {
    [key: string]: Function;
};

export class Data {
    protected behaves: Behave[] = [];
    /** 执行函数的缓存 */
    protected call_temp: CallTemp = {};
    constructor(...behaves: Behave[]) {
        this.addBehaves(...behaves);
    }
    public addBehaves(...behaves: Behave[]) {
        for (const behave of behaves) {
            this.addBehave(behave);
        }
    }
    public addBehave(behave: Behave) {
        this.behaves.push(behave);
    }
    public getBehaveByName<T extends Behave>(name): T {
        for (const behave of this.behaves) {
            if (behave.name === name) {
                return behave as T;
            }
        }
        return;
    }
    public getBehaveByCtor<T extends Behave>(ctor: Ctor<T>): T {
        for (const behave of this.behaves) {
            if (behave instanceof ctor) {
                return behave;
            }
        }
        return;
    }
}

export class Behave<T = Data> {
    public readonly name?: string;
    protected data: T;
    constructor(data: T, name?: string) {
        this.data = data;
        if (name) {
            this.name = name;
        }
    }
    protected setData(props: Partial<T>) {
        const { data } = this;
        for (const key in props) {
            if (!props.hasOwnProperty(key)) {
                continue;
            }
            data[key] = props[key];
        }
    }
}
