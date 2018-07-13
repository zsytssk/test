import { log, logErr, group, groupErr } from './utils';

function assert(express) {
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
    console.group(msg);
    const test = new TestNode(msg, func);
    test.run();
    console.groupEnd();
}

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
        const test_list = this.test_list;
        for (const item of test_list) {
            const { msg, func } = item;
            let a;
            try {
                a = func();
                item.success = true;
                this.sucess_num++;
            } catch (err) {
                item.err = err;
                item.success = false;

                this.fail_num++;
            }
        }
        let log_group = group;
        if (this.fail_num) {
            log_group = groupErr;
        }
        log_group(
            `${this.msg}, total:${test_list.length}; sucess:${
                this.sucess_num
            }, fail:${this.fail_num}`
        );
        for (const item of test_list) {
            const { msg, success, err } = item;
            if (success) {
                log(`${msg} [✓]`);
            } else {
                logErr(`${msg} [x]`, err);
            }
        }

        console.groupEnd();
    }
    public assert(express) {
        assert(express);
    }
    public run() {
        this.func(this);
        this.runTest();
    }
}
