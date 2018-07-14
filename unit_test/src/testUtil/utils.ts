const sucess_style = 'font-weight: bold; color: green';
const fail_style = 'font-weight: bold; color: red';

function createLog(type?, msg_type?) {
    // tslint:disable-next-line:no-empty
    const empty_fn = () => {};
    const style =
        type === 'error' || msg_type === 'error' ? fail_style : sucess_style;

    let log_fun = console[type];
    if (!log_fun) {
        log_fun = console.log;
    }
    return log_fun.bind(window.console, '%c %s', style);
}

export const log = createLog();
export const group = createLog('groupCollapsed');
export const groupEnd = createLog('groupEnd');
export const groupErr = createLog('groupCollapsed', 'error');
export const logErr = createLog('error');
