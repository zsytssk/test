import http = require('http');
import { Observable, Observer, Subscriber } from 'rxjs/Rx';
import { BaseEvent } from './event';
import { log } from './utils';

const source = Observable.interval(1000);
const example = source
  .flatMap(val => {
    if (val > 5) {
      return Observable.throw('Error!');
    }
    return Observable.of(val);
  })
  .retry(2);

const subscribe = example.subscribe({
  error: val => log(`${val}: two time quit`),
  next: val => log(val),
});
