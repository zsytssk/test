import * as child_process from 'child_process';
const { spawn } = child_process;

function excuse(cmd, dir, rep = false) {
    return new Promise((resolve, reject) => {
        const config = {
            cwd: dir || __dirname,
            encoding: 'utf-8',
            stdio: 'inherit' as child_process.StdioOptions,
        };
        if (rep) {
            config.stdio = 'pipe';
        }
        const run_process = spawn('cmd.exe', ['/s', '/c', cmd], config);

        let std_out = '';
        let std_err = '';
        if (rep) {
            run_process.stdout.pipe(process.stdout);
            run_process.stderr.pipe(process.stderr);
            run_process.stdout.on('data', data => {
                std_out += data;
            });
            run_process.stderr.on('data', data => {
                std_err += data;
            });
        }

        run_process.on('exit', code => {
            if (code === 0) {
                resolve(std_out);
            } else {
                reject(std_err);
            }
        });
    });
}

export async function execArr(cmds, path) {
    if (!Array.isArray(cmds)) {
        return await excuse(cmds, path);
    }

    const result = [];
    for (const cmd of cmds) {
        const item = await excuse(cmd, path);
        result.push(item);
    }
    return result;
}
