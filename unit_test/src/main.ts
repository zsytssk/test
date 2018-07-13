import { describe } from './testUtil/test';

async function main() {
    describe('test', it => {
        it.test('test1', () => {
            it.assert(1 + 1 === 2);
        });
        it.test('test2', () => {
            it.assert(1 + 1 === 3);
        });
    });
}
main();
