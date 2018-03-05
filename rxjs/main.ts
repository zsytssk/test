import { Observable, Observer, Subscriber } from 'rxjs/Rx';
import { log } from './utils';

// 立即发出值， 然后每5秒发出值
const source = Observable.timer(0, 5000);
// 当 source 发出值时切换到新的内部 observable，发出新的内部 observable 所发出的值
const example = source.switchMap(( z``) => Observable.interval(500));
// 输出: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
// tslint:disable-next-line:no-console
const subscribe = example.subscribe(val => console.log(val));
