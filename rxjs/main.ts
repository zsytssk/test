import { Observable } from 'rxjs/Rx';
import { log } from './utils';

const source = Observable.timer(1000, 4000);
const subscribe = source.subscribe(val => log(val));
