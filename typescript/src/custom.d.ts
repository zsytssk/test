/**  U存在用U类型, 不然用T类型  */
type ExtendType<T, U> = {
    [k in keyof (T & U)]: k extends keyof U ? U[k] : k extends keyof T ? T[k] : never;
}