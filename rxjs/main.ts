import { Observable, Observer, Subscriber } from 'rxjs/Rx';
import { extend, log } from './utils';
fetch('http://www.example.org/submit.php', {
  method: 'POST',
  // tslint:disable-next-line:object-literal-sort-keys
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'firstName=Nikhil&favColor=blue&password=easytoguess',
}).then(
  res => {
    if (res.ok) {
      alert('Perfect! Your settings are saved.');
    } else if (res.status === 401) {
      alert('Oops! You are not authorized.');
    }
  },
  e => {
    alert('Error submitting form!');
  },
);
