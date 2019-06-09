import { reverseString } from '../reverseString';

beforeAll(() => {
  console.time(1);
  console.log('-------------');
});
afterAll(() => {
  console.log('-------------');
  console.timeEnd(1);
});

describe('checknames', () => {
  test('under func defined', () => {
    console.log('under func defined');
    expect(typeof reverseString).toEqual('function');
  });

  test('str reverse', () => {
    console.log('str reverse');
    expect(reverseString('hello')).toEqual('olleh');
  });
});
