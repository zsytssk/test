import { Observable } from 'rxjs/Rx';
import { BaseEvent } from './event';
import { log } from './utils';

const test_event = new BaseEvent();

function createObserver(event_obj: BaseEvent, event_name: string) {
  return new Observable(observer => {
    event_obj.on(event_name, data => {
      observer.next(data);
    });
  });
}

createObserver(test_event, 'click')
  .throttleTime(1000)
  .subscribe(val => {
    log(val);
  });

test_event.trigger('click', { data: '124' });
// setTimeout(() => {
//   test_event.trigger('click', { data: '123' });
// }, 900);
