import { Map, List } from 'immutable';

interface ImmutableMap<T> extends Map<any, any> {
  get<K extends keyof T>(name: K): ImmutableType<T[K]>;
}
interface ImmutableList<T> extends List<any> {
  get(name: number): ImmutableType<T[number]>;
  // getIn(first, ...args): ...args extends any[] ? ImmutableType<T[number]> : ImmutableType<T[first]>;
}

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

export type ImmutableType<T> = T extends any[]
  ? ImmutableList<T>
  : T extends object ? ImmutableMap<T> : T;

export function getImu(immu_oobj, keys) {
  let result = {};
  for (let key in keys) {
  }
}

// const fruitData = [
//   {
//     name: 'dsfsdf',
//     numberOwned: 10,
//     best: true,
//   },
//   {
//     name: 'banana',
//     numberOwned: 0,
//     best: false,
//   },
// ];

// const a: ImmutableType<typeof fruitData>;
// const b = a.get(1).get('name');
// const a: ImmutableType<typeof fruitData>;
// const b = a.get('name');
