import { Observable, Observer, Subscriber } from 'rxjs/Rx';
import { log } from './utils';

const obr1 = Observable.interval(1000).take(2);
const obr_interval = Observable.interval(1000).take(2);

Observable.merge(obr1, obr_interval).subscribe(val => {
  log(val);
});
