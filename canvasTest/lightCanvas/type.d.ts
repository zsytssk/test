type Point = {
    x: number;
    y: number;
};
type BoxSize = {
    width: number;
    height: number;
};

type FuncVoid = (...args: any[]) => void;
type Func<T> = (...args: any[]) => T;
type FuncListener = (data: AnyObj) => void;
type AnyObj = { [x: string]: any };
type ValOfObj<T> = T[keyof T];
type ArrayItem<T> = T[keyof T];
type PartialAll<T, U> = {
    [p in keyof (T & U)]: p extends keyof T
        ? T[p]
        : p extends keyof U
        ? U[p]
        : never
};
declare module '*.json' {
    const value: any;
    export default value;
}

/** 抽取class的属性... */
type ClassProps<T> = { [k in keyof T]?: T[k] extends Function ? never : T[k] };
type ClassMethods<T> = {
    [k in keyof T]?: T[k] extends Function ? T[k] : never
};

type ClassPropOrMethod<T, K extends keyof T> = T[K];
type Ctor<T> = new (...args) => T;

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>
};

type RecursivePartial<T> = { [P in keyof T]?: T[P] | RecursivePartial<T[P]> };

type CanvasStyle = string | CanvasGradient | CanvasPattern;
