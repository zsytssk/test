import { test2 } from './test2';

function main() {
    import('./test1').then(({ test1 }) => {
        test1();
    });

    test2;
}

main();
