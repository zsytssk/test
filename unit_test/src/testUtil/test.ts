import { group, groupEnd, log, logErr } from './utils';

export function assert(express) {
    if (!express) {
        throw Error();
    }
}

type FunTest = (it: TestNode) => void;
type TestItem = {
    msg: string;
    func: FuncVoid;
    success?: boolean;
    err?: Error;
};
export function describe(msg, func: FunTest) {
    const test = new TestNode(msg, func);
    test.run();
}
type BoundType = 'before_all' | 'after_all' | 'after_each' | 'before_each';

class TestNode {
    private msg: string;
    private func: FunTest;
    private before_all: FuncVoid[] = [];
    private after_all: FuncVoid[] = [];
    private before_each: FuncVoid[] = [];
    private after_each: FuncVoid[] = [];
    private test_list: TestItem[] = [];
    private fail_num = 0;
    private sucess_num = 0;
    constructor(msg: string, func: FunTest) {
        this.msg = msg;
        this.func = func;
    }
    public beforeAll(func: FuncVoid) {
        this.before_all.push(func);
    }
    public afterAll(func: FuncVoid) {
        this.after_all.push(func);
    }
    public beforeEach(func: FuncVoid) {
        this.before_each.push(func);
    }
    public afterEach(func: FuncVoid) {
        this.after_each.push(func);
    }
    public test(msg: string, func: FuncVoid) {
        this.test_list.push({
            func,
            msg,
        });
    }
    private runTest() {
        const { test_list } = this;

        group(`${this.msg}:>`);
        this.runBind('before_all');
        for (const item of test_list) {
            const { msg, func } = item;
            let a;
            this.runBind('before_each');
            try {
                a = func();
                item.success = true;
                this.sucess_num++;
            } catch (err) {
                item.err = err;
                item.success = false;
                this.fail_num++;
            }
            if (item.success) {
                log(`${msg} [✓]`);
            } else {
                logErr(`${msg} [x]`, item.err);
            }
            this.runBind('after_each');
        }
        this.runBind('after_all');
        let log_fun = log;
        if (this.fail_num) {
            log_fun = logErr;
        }

        log_fun(
            `total:${test_list.length}; sucess:${this.sucess_num}, fail:${
                this.fail_num
            }`
        );

        groupEnd();
    }
    private runBind(type: BoundType) {
        const funs = this[type];
        for (const fun of funs) {
            fun();
        }
    }
    public run() {
        this.func(this);
        this.runTest();
    }
}
