import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

let ob = Observable.from([1, 2, 3]);
ob = ob.pipe(
  map(x => {
    console.log(`step1:>`, x);
    return x + 1;
  }),
);

ob.subscribe(e => {
  console.log(`step2:>`, e);
});
