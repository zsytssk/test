// RxJS v6+
import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { throttle } from 'rxjs/operators';

//emit value every 1 second
const source = fromEvent(document, 'click');
//throttle for 2 seconds, emit latest value
const example = source.pipe(throttle(val => interval(1000)));
//output: 0...3...6...9
const subscribe = example.subscribe(val => console.log(val));
