import { Observable, Observer, Subscriber } from 'rxjs/Rx';
import { BaseEvent } from './event';
import { log } from './utils';

const test_event = new BaseEvent();

function createObserver(event_obj: BaseEvent, event_name: string) {
  const obser_instance = new Observable(observer => {
    const fn = data => {
      observer.next(data);
    };
    event_obj.on(event_name, fn);

    return function unsubscribe() {
      log(`unsubscribe`);
      event_obj.off(event_name, fn);
    };
  });
  return obser_instance;
}

const obser = createObserver(test_event, 'click');
obser
  .take(1)
  .throttleTime(1000)
  .subscribe(val => {
    log(1, val);
  });

// obser.take(2).subscribe(val => {
//   log(2, val);
// });

test_event.trigger('click', { data: '124' });
test_event.trigger('click', { data: '124' });
setTimeout(() => {
  test_event.trigger('click', { data: '124' });
}, 2000);
