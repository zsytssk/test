type Props<T> = {
    -readonly [k in keyof T]: T[k]
}
type T = Props<Laya.Node>;