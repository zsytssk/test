type PT<T> = T extends Function ? never : T;

type NoFunProps<T> = {
    [k in keyof T]-?: T[k] extends Function ? never : k;
}[keyof T]
type ExcludeFun<T> = {
    -readonly [k in NoFunProps<T>]: T[k]
}

type T = ExcludeFun<Laya.Node>;
type pt = PT<keyof Laya.Node>;

type Diff<T, U> = T extends U ? never : T;
type T30 = Diff<"_a" | "b" | "c" | "d", "a" | "c" | "f">;