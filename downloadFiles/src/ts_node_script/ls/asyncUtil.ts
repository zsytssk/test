import * as fs from 'fs';

export function readdir(dir): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, file_list) => {
            if (err) {
                return reject(err);
            }
            resolve(file_list);
        });
    });
}

export function exists(path) {
    return new Promise((resolve, reject) => {
        fs.exists(path, exist => {
            resolve(exist);
        });
    });
}
export function lstat(path): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.lstat(path, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

export function rmdir(path) {
    return new Promise((resolve, reject) => {
        fs.rmdir(path, err => {
            if (err) {
                return reject(err);
            }
            resolve(err);
        });
    });
}
export function unlink(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, err => {
            if (err) {
                return reject(err);
            }
            resolve(err);
        });
    });
}

export function mkdir(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, e => {
            if (!e || (e && e.code === 'EEXIST')) {
                resolve();
            } else {
                resolve();
            }
        });
    });
}
