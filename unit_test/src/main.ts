import { assert, describe } from './testUtil/test';

async function main() {
    describe('test', it => {
        it.beforeAll(() => {
            console.log('beforeAll');
        });
        it.beforeEach(() => {
            console.log('beforeEach');
        });
        it.test('test1', () => {
            console.log(
                new Error().stack
                    .replace('Error\n', '')
                    .replace(/[^\n]+at[^\n]/g, '')
            );
            assert(1 + 1 === 2);
        });
        it.test('test2', () => {
            assert(1 + 1 === 3);
        });
        it.afterEach(() => {
            console.log('afterEach');
        });
        it.afterAll(() => {
            console.log('afterAll');
        });
    });
    describe('test2', it => {
        it.test('test1', () => {
            assert(1 + 1 === 2);
        });
    });
}
main();
