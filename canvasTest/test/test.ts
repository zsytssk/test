import { Behave, Data } from '../dop/data';

class DataTest extends Data {
    public d = true;
    protected behaves: [BehaveTest1, BehaveTest2, BehaveTest3];
}

class BehaveTest1 extends Behave<DataTest> {
    public test1() {
        return 1;
    }
    public testc(x: number) {
        return true;
    }
}
class BehaveTest2 extends Behave<DataTest> {
    public tes1() {
        return 1;
    }
}
class BehaveTest3 extends Behave<DataTest> {
    public tes1() {
        return 1;
    }
}

const a = new DataTest();
a.call('test')();

// type B = ClassPropOrMethod<DataTest, 'addBehaves'>;

// // type T1 = BehaveTest1 & BehaveTest2;
// type T1 = ClassesPropOrMethod<DataTest['behaves']>;
// type T = ClassPropOrMethod<T1, 'test1'>;
// // Pick<T, Exclude<keyof T, "tag">>
// // Extract<keyof Foo, string>

// // function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
// //     return obj[key];
// // }
