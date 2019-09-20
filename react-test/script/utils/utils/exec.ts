import * as child_process from 'child_process';
const { exec } = child_process;

function excuse(command, opts) {
    const { path, output } = opts;
    const config: any = { maxBuffer: 1024 * 1024 * 100, encoding: 'utf-8' };
    if (path) {
        config.cwd = path;
    }

    return new Promise((resolve, reject) => {
        let std_out = '';
        let std_err = '';
        const run_process = exec(command, config);

        if (output) {
            run_process.stdout.pipe(process.stdout);
            run_process.stderr.pipe(process.stderr);
        }

        run_process.stdout.on('data', data => {
            std_out += data;
        });
        run_process.stderr.on('data', data => {
            std_err += data;
        });

        run_process.on('exit', code => {
            if (code === 0) {
                resolve(std_out);
            } else {
                resolve(std_err);
            }
        });
    });
}

export async function execArr(cmds, opts) {
    if (!Array.isArray(cmds)) {
        return await excuse(cmds, opts);
    }

    const result = [];
    for (const cmd of cmds) {
        const item = await excuse(cmd, opts);
        result.push(item);
    }
    return result;
}
