import { Observable } from 'rxjs/Rx';
import { log } from './utils';

const myObserverable = Observable.create(observer => {
  observer.next('foo');
  setTimeout(() => {
    observer.next('bar');
  }, 1000);
});

myObserverable
  .filter(value => {
    return value === 'bar';
  })
  .map(() => state => Object.assign({}, state, { count: state.count + 1 }))
  .scan((state, changeFn) => changeFn(state), { count: 0 })
  .subscribe(fn => {
    log(fn);
    // log(value);
  });
