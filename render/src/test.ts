import { ComA } from './coma';
import { ComB } from './comb';

const a = new ComA();
const b = new ComB();

a.addChild(b);
// a.addChild('hello');

// tslint:disable-next-line:no-console
console.log(a.draw());
