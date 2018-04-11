export function generateRandomString() {
  return Math.random()
    .toString(36)
    .substr(2);
}

// log
function createLog(log_type?) {
  // tslint:disable-next-line:no-empty only-arrow-functions
  const empty_fn = function() {};

  const type = 'log';

  if (!window.console) {
    return empty_fn;
  }
  // tslint:disable-next-line:no-shadowed-variable
  let log = console[type];
  if (!log) {
    log = console.log;
  }
  return log.bind(window.console);
}

export const log = createLog();
